import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Receipt, IndianRupee, AlertCircle } from 'lucide-react';
import PaymentButton from './PaymentButton';

const BillSummary = ({ 
  items = [], 
  showPayment = true, 
  tableBookingId = null, 
  eventRegistrationId = null 
}) => {
  const [billTotal, setBillTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const sub = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = sub * 0.18; // 18% GST
      const total = sub + tax;
      
      setSubtotal(sub);
      setTaxAmount(tax);
      setBillTotal(total);
    };

    calculateTotal();
  }, [items]);

  const handlePaymentSuccess = (billId) => {
    console.log('Test payment successful for bill:', billId);
    // Handle post-payment actions here
  };

  if (items.length === 0) {
    return (
      <motion.div
        className="bg-beige rounded-2xl p-6 border-2 border-olive shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-darkBrown text-center">No items in your bill</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-beige rounded-2xl p-6 border-2 border-olive shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Test Mode Notice */}
      <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center">
        <AlertCircle size={20} className="text-yellow-600 mr-2" />
        <span className="text-yellow-800 text-sm">
          <strong>Test Mode:</strong> No real payment will be processed
        </span>
      </div>

      <div className="flex items-center mb-4">
        <Receipt size={24} className="text-olive mr-2" />
        <h3 className="text-xl font-bold text-darkBrown">Bill Summary</h3>
      </div>

      <div className="space-y-3 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-olive/20">
            <div>
              <span className="font-medium text-darkBrown">{item.name}</span>
              <span className="text-sm text-darkBrown/70 ml-2">x{item.quantity}</span>
            </div>
            <span className="font-semibold text-darkBrown">₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-olive/30 pt-4 space-y-2">
        <div className="flex justify-between text-darkBrown">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-darkBrown">
          <span>GST (18%):</span>
          <span>₹{taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-darkBrown border-t border-olive/30 pt-2">
          <span>Total:</span>
          <span className="flex items-center">
            <IndianRupee size={18} />
            {billTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {showPayment && (
        <div className="mt-6">
          <PaymentButton
            amount={billTotal}
            description="Restaurant Bill Payment"
            billItems={items}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>
      )}
    </motion.div>
  );
};

export default BillSummary;