import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Loader2, TestTube } from 'lucide-react';
import { useRazorpay } from '../hooks/useRazorPay';
import { toast } from 'react-toastify';

const PaymentButton = ({ amount, description, billItems = [], onPaymentSuccess }) => {
  const { initializePayment, isProcessing } = useRazorpay();
  const [isCreatingBill, setIsCreatingBill] = useState(false);
  const [modal, setModal] = useState({ open: false, data: null, resolve: null });

  // This function will be passed to the hook
  const handleTestConfirm = ({ orderId, amount, description }) => {
    return new Promise((resolve) => {
      setModal({ open: true, data: { orderId, amount, description }, resolve });
    });
  };

  const handleModalClose = (result) => {
    if (modal.resolve) modal.resolve(result);
    setModal({ open: false, data: null, resolve: null });
  };

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

      // Initialize test payment with modal confirm
      await initializePayment(amount, description, handleTestConfirm);

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
    <>
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

      {/* Test Payment Modal */}
      {modal.open && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div style={{
            background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ marginTop: 0 }}>Test Mode Payment</h2>
            <p><strong>Amount:</strong> ₹{modal.data.amount}</p>
            <p><strong>Description:</strong> {modal.data.description}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button
                style={{ background: '#4caf50', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}
                onClick={() => handleModalClose(true)}
              >
                Simulate Success
              </button>
              <button
                style={{ background: '#f44336', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}
                onClick={() => handleModalClose(false)}
              >
                Simulate Failure
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PaymentButton;