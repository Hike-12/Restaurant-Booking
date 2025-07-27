import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Loader2, TestTube } from 'lucide-react';
import { useRazorpay } from '../hooks/useRazorPay';
import { toast } from 'react-toastify';

const PaymentButton = ({ amount, description, billItems = [], onPaymentSuccess }) => {
  const { initializePayment, isProcessing } = useRazorpay();
  const [isCreatingBill, setIsCreatingBill] = useState(false);

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      toast.error('Invalid amount');
      return;
    }

    setIsCreatingBill(true);
    
    try {
      // Create bill first
      const billResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/create-bill/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      
      // Initialize test payment
      await initializePayment(amount, description);
      
      // Call success callback if payment is successful
      if (onPaymentSuccess) {
        onPaymentSuccess(billData.bill_id);
      }
      
    } catch (error) {
      setIsCreatingBill(false);
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
      {/* Test Mode Badge */}
      <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
        <TestTube size={12} className="inline mr-1" />
        TEST
      </div>
      
      {isLoading ? (
        <>
          <Loader2 size={20} className="mr-2 animate-spin" />
          {isCreatingBill ? 'Creating Bill...' : 'Processing...'}
        </>
      ) : (
        <>
          <CreditCard size={20} className="mr-2" />
          Pay ₹{amount} (Test Mode)
        </>
      )}
    </motion.button>
  );
};

export default PaymentButton;