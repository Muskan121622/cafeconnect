import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // if using react-router
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Assume total, name, phone, address come from location.state or URL search params
  const { total, name, phone, address } = location.state || {};

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  if (!total || !name || !phone || !address) {
    // If no data, redirect to cart
    navigate('/cart');
    return null;
  }

  const handleTestCardPayment = async() => {
  
setPaymentProcessing(true);

  try {
    // Prepare order data
    const orderData = {
      name,
      phone,
      address,
      total,
      items: location.state.cartItems || [],  // pass cart items when navigating here
      createdAt: serverTimestamp(),
    };

    // Save order in Firestore
    await addDoc(collection(db, 'orders'), orderData);

    Swal.fire({
      icon: 'success',
      title: 'Order Placed 🎉',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Total Paid:</strong> ₹${total}</p>
      `,
      confirmButtonText: 'Back to Home',
      confirmButtonColor: '#f97316',
    }).then(() => {
      // Redirect home or clear cart (handle as you want)
      navigate('/menu');
    });
  } catch (error) {
    setPaymentProcessing(false);
    Swal.fire({
      icon: 'error',
      title: 'Payment Failed',
      text: 'There was a problem saving your order. Please try again.',
      confirmButtonColor: '#f97316',
    });
  }

  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-orange-700">Payment</h2>
        <p className="text-lg mb-4">
          Please pay <strong>₹{total}</strong> to complete your order.
        </p>

        {/* Placeholder QR code image */}
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=pay%3A1234567890"
          alt="QR Code to scan and pay"
          className="mx-auto mb-6"
        />

        <p className="mb-6 text-gray-600">
          Scan this QR code with your payment app to pay.
        </p>

        <button
          disabled={paymentProcessing}
          onClick={handleTestCardPayment}
          className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition ${
            paymentProcessing ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {paymentProcessing ? 'Processing Payment...' : 'Pay with Test Card'}
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
