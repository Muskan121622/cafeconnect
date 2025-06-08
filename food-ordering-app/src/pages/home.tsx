
import Navbar from "../components/navbar";
import bg from "../assets/bg.png";
import Login from "../components/loginmodel";
import ContactModal from "../components/contactmodel"; // Create this new component
import { useState } from "react";
const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div
      className="pt-24 min-h-screen bg-cover bg-center flex flex-col items-center justify-between relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onContactClick={() => setShowContact(true)}
      />

      <div className="text-center px-4 mt-24 bg-white/80 p-6 rounded-xl shadow-lg backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-yellow-500">CafeConnect</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Connecting you with your favorite café treats.
        </p>
        <button  onClick={() => setShowLogin(true)} className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition duration-300">
          Get Started
        </button>
      </div>

      {/* Conditional Modals */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </div>
  );
};

export default Home;
