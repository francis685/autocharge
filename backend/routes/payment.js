import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// UPDATED: New prices for testing
const planPrices = {
  "Basic": 1,
  "Pro": 3,
  "Premium": 10,
};

// --- CREATE A PAYMENT ORDER ---
// Path: POST /api/payment/create-order
router.post('/create-order', async (req, res) => {
  const { planName } = req.body;
  
  // Find the price from our planPrices object
  const amount = planPrices[planName];

  // If the planName is not found, return an error
  if (!amount) {
    return res.status(404).json({ error: "Plan not found." });
  }

  const amountInPaise = amount * 100; // Razorpay needs the amount in paise
  const currency = "INR";

  const options = {
    amount: amountInPaise,
    currency,
    receipt: `receipt_order_${new Date().getTime()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).json({ error: "Error creating Razorpay order." });
    }
    
    // Send the order details back to the frontend
    res.json(order);

  } catch (err) {
    console.error("Razorpay order creation error:", err);
    res.status(500).json({ error: "Server error while creating order." });
  }
});

export default router;