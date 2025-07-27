import { useState } from 'react';
import { toast } from 'react-toastify';



export const useRazorpay = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const initializePayment = async (amount, description = 'Restaurant Bill Payment') => {
    setIsProcessing(true);
    
    try {
      // Create order on backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/create-order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ amount, description })
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Test mode - simulate payment process
      await simulateTestPayment(data.order_id, amount, description);
      
    } catch (error) {
      setIsProcessing(false);
      toast.error(error.message || 'Payment initialization failed');
    }
  };

  const simulateTestPayment = async (orderId, amount, description) => {
    // Show test payment modal
    const proceed = window.confirm(
      `TEST MODE PAYMENT\n\n` +
      `Amount: ₹${amount}\n` +
      `Description: ${description}\n\n` +
      `Click OK to simulate successful payment\n` +
      `Click Cancel to simulate payment failure`
    );

    if (proceed) {
      // Simulate payment success
      const testPaymentData = {
        razorpay_order_id: orderId,
        razorpay_payment_id: `pay_test_${Math.random().toString(36).substr(2, 9)}`,
        razorpay_signature: `sig_test_${Math.random().toString(36).substr(2, 9)}`
      };

      await verifyPayment(testPaymentData);
    } else {
      // Simulate payment failure
      setIsProcessing(false);
      toast.error('Payment cancelled (Test Mode)');
    }
  };

  const verifyPayment = async (paymentData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/verify-payment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Payment successful! (Test Mode)');
        return true;
      } else {
        console.log('Payment verification failed:', data);
        toast.error('Payment verification failed');
        return false;
      }
    } catch (error) {
        console.error('Payment verification error:', error);
      toast.error('Payment verification error');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return { initializePayment, isProcessing };
};