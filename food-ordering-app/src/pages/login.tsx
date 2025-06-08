
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <button className="absolute top-4 right-4 text-black text-2xl">&times;</button>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded"
          type="email"
        />

        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded"
        />

        <div className="flex items-center justify-between text-sm">
          <label>
            <input type="checkbox" className="mr-2" />
            Remember Me
          </label>
          <button className="text-blue-500 hover:underline">Forgot Password?</button>
        </div>

        <button
          onClick={handleLogin}
          className="bg-gray-800 text-white py-2 rounded mt-2 hover:bg-gray-900 transition"
        >
          Let’s Go
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign-Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
