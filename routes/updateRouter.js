var express = require('express');
var router = express.Router();
let priceMaster = require('../model/priceMasterModel');

/* add edit or update product or service */
router.post('/add', async function (req, res, next) {
  let input = req.body;
  let priceCollected, savedDoc;

  if (input._id) {
    try {
      priceCollected = await priceMaster.findOne({ _id: input._id });
    } catch (error) {
      return res.send({ message: "data not found." });
    }
  } else {
    priceCollected = new priceMaster({})
  }

  priceCollected.name = input.name;
  priceCollected.DBPdistance = input.DBPdistance;
  priceCollected.DBPprice = input.DBPprice;
  priceCollected.DAP = input.DAP;
  priceCollected.TMF = input.TMF.map(tmf => {
    return { factor: tmf.factor, maxlimit: tmf.maxlimit }
  });

  try {
    savedDoc = await priceCollected.save();
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Value format is incorrect" })
  }
  res.send({ savedDoc, message: "saved successfully" });

});

router.get('/statuschange', async function (req, res, next) {
  let input = req.query;
  if (!input._id) return res.status(400).send({ message: "please provide a valid key" });
  try {
    priceCollected = await priceMaster.findOne({ _id: input._id });
  } catch (error) {
    return res.status(400).send({ message: "please provide a valid key" });
  }
  if ( input.status == priceCollected.enabled ) return res.send({ message: "updated successfully." });

  priceCollected.enabled = parseInt(input.status);
  try {
    await priceCollected.save();
  } catch (error) {
    return res.status(500).send({ message: "server error."});
  }

  res.send({ message: "status changed successfully.", status: priceCollected.status })
})

module.exports = router;
