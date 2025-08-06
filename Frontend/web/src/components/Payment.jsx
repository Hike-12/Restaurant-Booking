import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShoppingCart, Plus, Minus, Trash2, Receipt } from 'lucide-react';
import BillSummary from './BillSummary';
import { VITE_API_BASE_URL } from '../config/api';
import { toast } from 'react-toastify';

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMenus();
    // Load cart from localStorage if exists
    const savedCart = localStorage.getItem('restaurantCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('restaurantCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const fetchMenus = async () => {
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/menus/`);
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      toast.error('Failed to load menu items');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (menuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === menuItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        id: menuItem.id,
        name: menuItem.item,
        price: parseFloat(menuItem.cost),
        quantity: 1,
        image: menuItem.img
      }];
    });
    toast.success(`${menuItem.item} added to cart!`);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast.info('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('restaurantCart');
    toast.info('Cart cleared');
  };

  const handlePaymentSuccess = (billId) => {
    toast.success('Payment completed successfully!');
    setCartItems([]);
    localStorage.removeItem('restaurantCart');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sand py-12 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-olive"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand py-12 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-center text-darkBrown mb-10 tracking-tight flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <CreditCard size={32} className="mr-3" />
          Payment & Ordering
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-beige rounded-2xl p-6 border-2 border-olive shadow-lg mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-darkBrown mb-6 flex items-center">
                <ShoppingCart size={24} className="mr-2" />
                Add Items to Cart
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {menus.map((menu,idx) => (
                  <motion.div
                    key={`menu-${menu.id ?? idx}`}
                    className="bg-sand rounded-lg p-4 border border-olive/30 hover:border-olive transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-darkBrown text-sm mb-1">
                          {menu.item}
                        </h3>
                        <p className="text-olive font-bold">₹{menu.cost}</p>
                      </div>
                      <button
                        onClick={() => addToCart({ ...menu, id: menu.id ?? `fallback-${idx}` })}
                        className="bg-olive text-sand p-2 rounded-lg hover:bg-black transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Cart Items Section */}
            {cartItems.length > 0 && (
              <motion.div
                className="bg-beige rounded-2xl p-6 border-2 border-olive shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-darkBrown flex items-center">
                    <ShoppingCart size={24} className="mr-2" />
                    Your Cart ({cartItems.length} items)
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={`cart-${item.id}`} className="flex items-center justify-between bg-sand rounded-lg p-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-darkBrown">{item.name}</h3>
                        <p className="text-olive font-semibold">₹{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-olive text-sand p-1 rounded hover:bg-black transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-medium text-darkBrown min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-olive text-sand p-1 rounded hover:bg-black transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Bill Summary Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {cartItems.length > 0 ? (
                <BillSummary
                  items={cartItems}
                  showPayment={true}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              ) : (
                <div className="bg-beige rounded-2xl p-6 border-2 border-olive shadow-lg">
                  <div className="text-center">
                    <Receipt size={48} className="mx-auto text-olive/50 mb-4" />
                    <h3 className="text-xl font-bold text-darkBrown mb-2">Your Cart is Empty</h3>
                    <p className="text-darkBrown/70">Add some delicious items from our menu to get started!</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Quick Add Buttons */}
        <motion.div
          className="mt-8 bg-beige rounded-2xl p-6 border-2 border-olive shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-darkBrown mb-4">Quick Add Popular Items</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {menus.slice(0, 4).map((menu,idx) => (
              <button
                key={`quick-${menu.id ??idx}`}
                onClick={() => addToCart({ ...menu, id: menu.id ?? `fallback-${idx}` })}
                className="bg-olive text-sand py-3 px-4 rounded-lg hover:bg-black transition-colors font-medium text-sm"
              >
                {menu.item} - ₹{menu.cost}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Payment;