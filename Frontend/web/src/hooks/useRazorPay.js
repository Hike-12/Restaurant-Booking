import { useState } from 'react';
import { toast } from 'react-toastify';

export const useRazorpay = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const initializePayment = async (amount, description = 'Restaurant Bill Payment', onTestConfirm) => {
  setIsProcessing(true);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/create-order/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ amount, description })
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to create order');
    }

    // Ask parent to show modal and wait for result
    let proceed = true;
    if (typeof onTestConfirm === 'function') {
      proceed = await onTestConfirm({ orderId: data.order_id, amount, description });
    } else {
      proceed = window.confirm('Simulate payment success?');
    }

    if (proceed) {
      const testPaymentData = {
        razorpay_order_id: data.order_id,
        razorpay_payment_id: `pay_test_${Math.random().toString(36).substr(2, 9)}`,
        razorpay_signature: `sig_test_${Math.random().toString(36).substr(2, 9)}`
      };
      // Return the result of verifyPayment
      return await verifyPayment(testPaymentData);
    } else {
      setIsProcessing(false);
      toast.error('Payment cancelled (Test Mode)');
      return false;
    }
  } catch (error) {
    setIsProcessing(false);
    toast.error(error.message || 'Payment initialization failed');
    return false;
  }
};

  const verifyPayment = async (paymentData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/verify-payment/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Payment successful! (Test Mode)');
        return true;
      } else {
        toast.error('Payment verification failed');
        return false;
      }
    } catch (error) {
      toast.error('Payment verification error');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return { initializePayment, isProcessing };
};
