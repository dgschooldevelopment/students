// // paymentRoutes.js
// const express = require('express');
// const razorpay = require('razorpay');
// const crypto = require('crypto');

// const router = express.Router();

// // Razorpay instance with test keys
// const razorpayInstance = new razorpay({
//     key_id: 'rzp_test_pv00QxXABvrdup',
//     key_secret: 'fTOThLaJb0X5zlM6vi4Mvl85'
// });

// // Create an order route
// exports.pay('/pay', (req, res) => {
//     const options = {
//         amount: 50000,    // Amount in paise (₹500)
//         currency: 'INR',
//         receipt: 'order_rcptid_1',
//         payment_capture: 1 
//     };

//     razorpayInstance.orders.create(options, (err, order) => {
//         if (err) {
//             return res.status(500).json({ error: err });
//         }
//         res.json({
//             id: order.id,
//             amount: order.amount,
//             currency: order.currency,
//         });
//     });
// });

// // Verify payment route
// exports.payverify('/payverify', (req, res) => {
//     const { payment_id,order_id, razorpay_signature } = req.body;

//     const secret = 'fTOThLaJb0X5zlM6vi4Mvl85';  // Your Razorpay Key Secret

//     const hmac = crypto.createHmac('sha256', secret);
//     hmac.update(order_id + "|" + payment_id);
//     const generated_signature = hmac.digest('hex');

//     if (generated_signature === razorpay_signature) {
//         res.send('Payment Verified');
//     } else {
//         res.send('Payment Verification Failed');
//     }
// });

// module.exports = router;


