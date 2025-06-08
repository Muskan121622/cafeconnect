import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../pages/cartcontext';
import potImg from '../assets/pot.png';
import ContactModal from '../components/contactmodel';
interface MenuItem {
  id: string;
  name: string;
  price: number;
    image: string;
  
}
const CartPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [showContact, setShowContact] = useState(false);

const navigate = useNavigate();
  const { cartItems, addItem, removeItem } = useCart();

  // fetch menu items from firebase
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'MenuItems'));
       const items: MenuItem[] = snapshot.docs.map(doc => ({
  ...(doc.data() as MenuItem),
  id: doc.id,  // this will always be final
}));

        setMenuItems(items);
      } catch (err) {
        console.error('Error fetching menu items', err);
      }
    };
    fetchMenu();
  }, []);

  // combine cart items with their menu info
  const cartWithDetails = cartItems.map(cartItem => {
    const menuItem = menuItems.find(item => item.id === cartItem.id);
    return {
      ...cartItem,
      name: menuItem?.name || 'Unknown',
      price: menuItem?.price || 0,
     image: menuItem?.image || '',
    };
  });

  // total price
  const total = cartWithDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  

  const handleOrder = () => {
    if (!name || !address || !phone) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Details',
        text: 'Please fill in your name, address, and phone number!',
        confirmButtonColor: '#f97316',
      });
      return;
    }

 // Navigate to payment page passing details and total
  navigate('/payment', {
    state: {
      name,
      address,
      phone,
      total,
       cartItems: cartWithDetails,
    },
  });

  };

  return (

<div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-0 ">
<div className="sticky top-0 z-50 bg-orange-100 shadow-md p-4 mb-6 flex items-center justify-between rounded-b-xl">
  
  {/* Back to Menu Button */}
  <button
  onClick={() => window.location.href = '/menu'}
  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold flex items-center gap-2 px-4 py-2 rounded-full transition shadow-sm"
>
  <span className="text-xl">←</span> Menu
</button>


  {/* Title */}
  <h1 className="text-2xl md:text-3xl font-bold text-orange-800 text-center flex-1">🛍️ Your Delicious Cart</h1>

  {/* Placeholder for alignment */}
  <div className="w-[60px]"></div>
</div>



  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
    {/* Pot Image Left Column */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex justify-center items-center"
    >
      <img
        src={potImg}
        alt="Cart Illustration"
        className="w-full h-full object-cover rounded-2xl shadow-lg border-4 border-orange-200"
      />
    </motion.div>

    {/* Cart & Checkout Right Column */}
    <div className="space-y-6">
      {cartWithDetails.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">Your cart is empty.</div>
      ) : (
        cartWithDetails.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <div>
                <h2 className="text-xl font-bold text-orange-700">{item.name}</h2>
                <p className="text-green-600 mt-1 font-semibold">₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-200 text-red-700 rounded-full px-3 py-1 font-bold"
              >
                −
              </button>
              <span className="text-lg font-bold">{item.quantity}</span>
              <button
                onClick={() => addItem(item.id)}
                className="bg-green-200 text-green-700 rounded-full px-3 py-1 font-bold"
              >
                +
              </button>
            </div>

            <div className="font-semibold text-green-700 text-lg">
              ₹{item.price * item.quantity}
            </div>
          </motion.div>
        ))
      )}

      {cartWithDetails.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4 text-orange-800">Checkout</h3>

          <div className="space-y-3">
            {cartWithDetails.map(item => (
              <div key={item.id} className="flex justify-between text-gray-700">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4 flex justify-between text-lg font-bold text-green-700">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-orange-400"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-orange-400"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-orange-400"
            />
          </div>

          <button
            onClick={handleOrder}
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
          >
            🍽️ Place Order
          </button>
        </motion.div>
      )}
    </div>
  </div>

  {/* Footer */}
<motion.footer
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mt-1 bg-gradient-to-r from-orange-100 to-yellow-50 py-8 border-t border-orange-200  shadow-inner"
>
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
    
    {/* Logo and Text */}
    <div className="text-center md:text-left">
      <h3 className="text-2xl font-extrabold text-orange-700 italic">🍽️ Cafe Connect</h3>
      <p className="text-sm text-gray-600 mt-1">© {new Date().getFullYear()} All rights reserved.</p>
    </div>

    {/* Quick Links */}
    <div className="flex space-x-6 text-sm font-medium text-orange-700">
      <a href="/" className="hover:text-orange-500 transition">Home</a>
      <a href="/menu" className="hover:text-orange-500 transition">Menu</a>
  <button
  onClick={() => setShowContact(true)}
  className="hover:text-orange-500 transition focus:outline-none"
>
  Contact
</button>
    </div>

    {/* Social Icons */}
    <div className="flex space-x-4 text-xl text-orange-600">
      <a href="#"><i className="fab fa-facebook hover:text-orange-400 transition"></i></a>
      <a href="#"><i className="fab fa-instagram hover:text-orange-400 transition"></i></a>
      <a href="#"><i className="fab fa-twitter hover:text-orange-400 transition"></i></a>
    </div>
  </div>

  {/* Bottom Note */}
  <div className="mt-6 text-center text-xs text-gray-500">
    Made with ❤️ by Muskan 
  </div>
</motion.footer>
{showContact && <ContactModal onClose={() => setShowContact(false)} />}


</div>

  );
};

export default CartPage;
