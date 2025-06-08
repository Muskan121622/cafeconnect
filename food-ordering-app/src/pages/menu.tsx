
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FaShoppingCart } from 'react-icons/fa';
import burgerImg from '../assets/burger.png';
import { motion } from 'framer-motion';
import burgerImg1 from '../assets/front-view-tasty-meat-burger-with-cheese-and-salad-free-photo.jpg';
import friesImg from '../assets/941f50-splendid-table-french-fries.jpg';
import grilledImg from '../assets/grilled-club-sandwich-533668.jpg';
import pizzaImg from '../assets/pav-bhaji.jpg';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../pages/cartcontext';
import strawberryImg from '../assets/thick-strawberry-shake5-980x980.jpg';
import coffeeImg from '../assets/RFO-1400x919-IcedCoffee-76221116-2565-4103-9899-89571028018e-0-1400x919.jpg'; // if you have it
import vegHakkaNoodles from '../assets/hakkanoodles2.webp';
import thickChocolate from '../assets/thick_hot_chocolate_5.jpg';
import pavBhaji from '../assets/pav-bhaji.jpg';
import samosa from '../assets/samosa.jpeg';
import vegSandwich from '../assets/vegsandwich.jpeg';
import choleBhature from '../assets/chhole  bhature.jpeg';
import specialThali from '../assets/specialthali.webp';
import masalaDosa from '../assets/masaladosha.jpeg';
import chowmein from '../assets/chicken-chow-mein-recipe.jpg';
import idliSambhar from '../assets/idli sambhar.jpeg';
import shevpaav from "../assets/Shev-Pav.jpg"

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const imageMap: { [key: string]: string } = {
  'Thick Strawberry': strawberryImg,
  'Grilled Sandwich': grilledImg,
  'Burger': burgerImg1,
  'Cold Coffee': coffeeImg,
  'French Fries':friesImg ,
  'Shev Paav':shevpaav,
  'Veg Hakka Noodles':vegHakkaNoodles,
  'Thick Chocolate':thickChocolate,

  'Pav Bhaji':pavBhaji,
  'Samosa':samosa,
  'Veg Sandwich':vegSandwich,

  'Chole Bhature': choleBhature,
  'Special Thali':specialThali,
  'Masala Dosa':masalaDosa,
  'Chowmein':chowmein,
  'Idli Sambhar':idliSambhar,
  // add more exact name-image mappings if needed
};

const fallbackImage = pizzaImg;
const Menu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'MenuItems'));
       
        const fetchedItems: MenuItem[] = snapshot.docs.map(doc => {
  console.log(doc.data()); // ✅ log to see if it fetches correct fields
  return {
    id: doc.id,
    ...doc.data(),
  } as MenuItem;
});

        setItems(fetchedItems);
      } catch (err) {
        console.error('Error fetching menu:', err);
      }
    };
    fetchMenu();
  }, []);
const [itemQuantities, setItemQuantities] = useState<{ [key: string]: number }>({});
const { cartItems, addItem, removeItem } = useCart();

  const handleAdd1 = (id: string) => {
    addItem(id);
    setItemQuantities(prev => ({
     ...prev,
     [id]: (prev[id] || 0) + 1
   }));
  };

  const handleRemove1 = (id: string) => {
    removeItem(id);
     setItemQuantities(prev => {
     const newQty = (prev[id] || 0) - 1;
     const updated = { ...prev };
     if (newQty <= 0) delete updated[id];
     else updated[id] = newQty;
     return updated;
   });
  };

  const getQuantity = (id: string) => {
    const item = cartItems.find(i => i.id === id);
    return item ? item.quantity : 0;
  };
useEffect(() => {
  const totalCount = Object.values(itemQuantities).reduce((sum, qty) => sum + qty, 0);
  setCartCount(totalCount);
}, [itemQuantities]);
const renderSection = (category: string, sectionId: string) => {
  const filteredItems = items.filter(item => item.category === category);
  
  if (filteredItems.length === 0) return null;

  return (
    <section  className="scroll-mt-20 ">
      <div className="bg-yellow-50 rounded-xl p-2 mt-2 shadow-inner mb-1 ">
      <h2 id={sectionId} className={` scroll-mt-20 text-3xl  font-bold text-center mb-4 `}
>
  <span className="text-gray-600">{category}</span>
  <span className="text-blue-600"> Menu</span> 

      </h2></div>
      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500">No items available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              className=" relative group bg-white rounded-xl p-4 flex flex-col justify-between border border-gray-200 shadow-md hover:shadow-xl transition   "
              whileHover={{ scale: 1.03 }}
            >
  {/* ✅ Background Image (Visible Only on Hover) */}
 <img
    src={imageMap[item.name] || fallbackImage}
    alt={item.name}
    className="absolute inset-0 w-full h-full object-cover opacity-0  group-hover:opacity-100  duration-100 z-0"
  />
  <div className="relative z-10 p-4 group-hover:opacity-0 transition-opacity duration-300">
    <h3 className="text-xl font-bold text-gray-900 text-center">{item.name}</h3>
    <p className="text-lg text-gray-700 mt-3 text-justify leading-relaxed">
      {item.description}
    </p>
    <p className="text-md font-semibold mt-4 text-center text-gray-800">
      Just At Rs. <span className="text-yellow-600 font-bold">{item.price}</span>
    </p>
              </div>
<div className="relative z-20 flex justify-center pb-4">

{getQuantity(item.id) > 0? (
  <div className="mt-6 flex justify-center items-center space-x-3 bg-green-100 border border-green-400 px-3 py-1 rounded-lg w-full max-w-[160px]">
    <button
      onClick={() => handleRemove1(item.id)}
      className="text-green-700 font-bold px-2 text-lg"
    >−</button>
    <span className="text-green-900 font-semibold">{getQuantity(item.id)}</span>
    <button
      onClick={() => handleAdd1(item.id)}
      className="text-green-700 font-bold px-2 text-lg"
    >+</button>
  </div>
) : (
  <button
    className="mt-6 px-4 py-2 w-full max-w-[160px] mx-auto border-2 border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition font-semibold rounded-lg text-sm"
    onClick={() => handleAdd1(item.id)}
  >
    Add To Cart
  </button>
)}
</div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

  return (
    <div className="min-h-screen bg-white font-sans text-black scroll-smooth">
      {/* ✅ Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-md sticky top-0 z-50 bg-white">
        <h1 className="text-xl font-semibold italic text-blue-600">
          Welcome To Cafe Connect
        </h1>
        <ul className="flex space-x-6 text-gray-700 font-medium items-center">
          <li><a href="#fnf" className="hover:text-blue-600">FNF</a></li>
          <li><a href="#snack" className="hover:text-blue-600">Snack Corner</a></li>
          <li><a href="#cafeteria" className="hover:text-blue-600">Cafeteria</a></li>
          <li><a href="#canteen" className="hover:text-blue-600">Canteen</a></li>
          <div className="relative">
            <FaShoppingCart className="hover:text-blue-600 cursor-pointer text-2xl text-gray-700" onClick={() => navigate('/cart')} />
            
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </div>
        </ul>
      </nav>

      {/* ✅ Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col md:flex-row items-center justify-between px-8 py-12 bg-gradient-to-r from-white to-yellow-100 shadow-md mt-2 rounded-lg  overflow-hidden"
      >
        <div className="max-w-xl text-left space-y-4 z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Choose From Variety Of Canteens
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Designed for the students, our platform lets you order delicious meals and snacks from your favorite campus canteens while sitting in your classroom. No more waiting in lines or missing out on meals between classes. With Cafe Connect, satisfying your cravings is just a few clicks away.
          </p>
          {/* <button className="mt-4 px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition rounded-md font-medium">
            Let’s Order!
          </button> */}


          <button className="mt-4 px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition rounded-md font-medium"
  onClick={() => {
    const element = document.getElementById('fnf');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }}
  
>
  Let's Order
</button>

        </div>
        <div className="relative mt-10 md:mt-0 z-10">
          <div className="absolute inset-0 bg-white rounded-full blur-[120px] opacity-80 -z-10"></div>
          <img
            src={burgerImg}
            alt="Burger"
            className="relative w-[800px] h-auto object-contain drop-shadow-2xl"
          />
        </div>
      </motion.section>

      {/* ✅ Ordered Menu Sections */}
      {renderSection('FNF Special', 'fnf')}
      {renderSection('Snacks Corner', 'snack')}
      {renderSection('Cafeteria', 'cafeteria')}
      {renderSection('Canteen', 'canteen')}


    {/* ✅ Go to Cart Button (Floating Bottom Right) */}
    {cartCount > 0 && (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => navigate('/cart' )}
          className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition text-sm font-semibold"
        >
          Go to Cart ({cartCount})
        </button>
      </div>
    )}

{/* ✅ Footer */}
<footer className="mt-1 bg-gradient-to-r from-yellow-50 to-white py-8 border-t border-gray-200 shadow-inner">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-700 space-y-4 md:space-y-0">
    <div>
      <h3 className="text-2xl font-bold text-blue-600 italic">Cafe Connect</h3>
      <p className="text-sm mt-1">© {new Date().getFullYear()} All rights reserved.</p>
    </div>

    <div className="flex space-x-6 text-sm font-medium">
      <a href="#fnf" className="hover:text-blue-600 transition">FNF Special</a>
      <a href="#snack" className="hover:text-blue-600 transition">Snack Corner</a>
      <a href="#cafeteria" className="hover:text-blue-600 transition">Cafeteria</a>
      <a href="#canteen" className="hover:text-blue-600 transition">Canteen</a>
    </div>

    <div className="flex space-x-4 text-xl text-gray-600">
      <a href="#" className="hover:text-blue-600 transition"><i className="fab fa-facebook"></i></a>
      <a href="#" className="hover:text-blue-600 transition"><i className="fab fa-instagram"></i></a>
      <a href="#" className="hover:text-blue-600 transition"><i className="fab fa-twitter"></i></a>
    </div>
  </div>

  <div className="mt-4 text-center text-xs text-gray-500">
    Made with ❤️ by  Muskan 
  </div>
</footer>


    </div>
  );
};

export default Menu;
