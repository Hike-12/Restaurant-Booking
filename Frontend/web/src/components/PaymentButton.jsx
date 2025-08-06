import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const PaymentButton = ({ amount, description, billItems = [], onPaymentSuccess }) => {
  const [isCreatingBill, setIsCreatingBill] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      toast.error('Invalid amount');
      return;
    }

    setIsCreatingBill(true);

    try {
      // 1. Create bill first
      const billResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/create-bill/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          items: billItems,
          subtotal: amount * 0.85, // Assuming 15% tax
          tax_amount: amount * 0.15,
          total_amount: amount
        })
      });

      const billData = await billResponse.json();

      if (!billData.success) {
        throw new Error('Failed to create bill');
      }

      setIsCreatingBill(false);
      setIsProcessing(true);

      // 2. Create Razorpay order
      const orderResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/create-order/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ amount, description })
      });
      const orderData = await orderResponse.json();
      if (!orderData.success) throw new Error('Failed to create Razorpay order');

      // 3. Open Razorpay Checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "The Coffee Cup",
        description,
        order_id: orderData.order_id,
        handler: async function (response) {
          // 4. Verify payment on backend
          const verifyResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/verify-payment/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });
          const verifyData = await verifyResponse.json();
          setIsProcessing(false);
          if (verifyData.success) {
            toast.success('Payment successful!');
            if (onPaymentSuccess) onPaymentSuccess(billData.bill_id);
          } else {
            toast.error('Payment verification failed');
          }
        },
        theme: { color: "#3399cc" }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', function () {
        setIsProcessing(false);
        toast.error('Payment failed or cancelled');
      });

    } catch (error) {
      console.error('Payment error:', error);
      setIsCreatingBill(false);
      setIsProcessing(false);
      toast.error(error.message || 'Failed to process payment');
    }
  };

  const isLoading = isProcessing || isCreatingBill;

  return (
    <motion.button
      onClick={handlePayment}
      disabled={isLoading}
      className={`
        bg-olive hover:bg-black text-sand font-bold py-3 px-6 rounded-lg 
        transition-colors duration-300 flex items-center justify-center
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
        relative
      `}
      whileHover={!isLoading ? { scale: 1.02 } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
    >
      {isLoading ? (
        <>
          <Loader2 size={20} className="mr-2 animate-spin" />
          {isCreatingBill ? 'Creating Bill...' : 'Processing...'}
        </>
      ) : (
        <>
          <CreditCard size={20} className="mr-2" />
          Pay ₹{amount}
        </>
      )}
    </motion.button>
  );
};

export default PaymentButton;