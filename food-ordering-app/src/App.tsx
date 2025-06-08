import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Menu from './pages/menu';
import Cart from './pages/cart';
import Login from './pages/login';
import Signup from './pages/signup';
import SplashScreen from './components/splashscreen';
//import { useState } from 'react';
import PaymentPage from './pages/payment';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
          {/* <Route path="/cart" element={<Cart itemQuantities={itemQuantities} handleAdd={handleAdd} handleRemove={handleRemove} />} /> */}
                <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/splash" element={<SplashScreen />} />
          <Route path="/payment" element={<PaymentPage />} />
           <Route path="*" element={<Menu />} />
    </Routes>
  );

};
export default App;