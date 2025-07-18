
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './pages/cartcontext.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
   <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
);
