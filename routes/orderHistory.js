const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { requireAuth } = require('../middlewares/auth');

router.get('/', requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ utilisateur_id: req.session.userId });
    res.render('orderHistory', { orders });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;

