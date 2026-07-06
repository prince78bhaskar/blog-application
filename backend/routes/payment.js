import express from 'express';
import { createOrder, verifyPayment, fetchOrder, handleWebhook } from '../controller/paymentController.js';
import { validateEnrollment } from '../middleware/validate.js';

const router = express.Router();

// Payment order routes
router.post('/create-order', createOrder);
router.get('/order/:orderId', fetchOrder);
router.post('/verify', verifyPayment);

// Webhook endpoint (no auth required for Cashfree webhooks)
router.post('/webhook', handleWebhook);

export default router;
