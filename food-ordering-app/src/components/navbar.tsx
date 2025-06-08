
import logo from "../assets/logo.png";
type NavbarProps = {
  onLoginClick: () => void;
  onContactClick: () => void;
};

const Navbar = ({ onLoginClick, onContactClick }: NavbarProps) => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-2 bg-white/80 backdrop-blur-md shadow-md fixed top-0 z-10">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="App Logo"
          className="w-16 h-14 object-cover rounded-full shadow-md"
        />
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-orange-400 to-red-400 text-transparent bg-clip-text animate-pulse hover:scale-105 transition-transform duration-300">
          CafeConnect
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={onContactClick}
          className="text-gray-700 hover:text-black transition duration-200"
        >
          Contact Us
        </button>
        <button
          onClick={onLoginClick}
          className="border border-black px-4 py-1.5 rounded hover:bg-black hover:text-white transition duration-200"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
