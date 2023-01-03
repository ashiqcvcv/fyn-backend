var express = require('express');
var router = express.Router();
let priceMaster = require('../model/priceMasterModel');

/* GET price chart listing. */
router.get('/list', async function (req, res, next) {
  let priceList;
  try {
    priceList = await priceMaster.find({});
  } catch (error) {
    return res.status(500).send({ message: "server error" });
  }
  res.send({ priceList });
});

router.post('/calculate', async function (req, res, next) {
  let input = req.body;
  let priceCollected;
  if (input.priceId) priceCollected = await priceMaster.findOne({ _id: input.priceId });
  if (!priceCollected) return res.send({ message: "price chart not found." });
  if (!input.distance || !input.time) return res.send({ message: "parameters not complete." });
  // let TBP = 
  priceCollected.TMF.sort(function (a, b) { return b.maxlimit - a.maxlimit });
  let maxLimit = priceCollected.TMF[0];
  priceCollected.TMF.some(limit => {
    if (limit.maxlimit > input.time) maxLimit = limit;
    if (limit.maxlimit < input.time) return true;
  })
  let TBP = maxLimit.factor;
  let Price = (priceCollected.DBPprice + ((input.distance - priceCollected.DBPdistance) * priceCollected.DAP)) * TBP;

  return res.send({ Price, message: "successfull" });
})

module.exports = router;
