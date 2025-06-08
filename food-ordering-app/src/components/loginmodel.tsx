
import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // make sure db is exported from firebase.ts
import { useNavigate } from 'react-router-dom';
const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      if (!validateEmail(email)) return setError('Invalid email format.');
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      onClose();
        navigate('/splash'); 
    } catch (error: any) {
      setError(formatFirebaseError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setError('');
      setLoading(true);
      if (!validateEmail(email)) return setError('Invalid email.');
      if (password.length < 6) return setError('Password must be 6+ characters.');
      if (!fullName.trim()) return setError('Enter your full name.');

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // 🔥 Save user data to Firestore
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        fullName: fullName,
        email: email,
        createdAt: new Date(),
      });

      alert('Sign-Up successful!');
      setShowSignup(false);
      setEmail('');
      setPassword('');
      setFullName('');
      setError('');
    } catch (error: any) {
      setError(formatFirebaseError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const formatFirebaseError = (msg: string) => {
    if (msg.includes('email-already')) return 'This email is already registered.';
    if (msg.includes('invalid-email')) return 'Invalid email format.';
    if (msg.includes('wrong-password')) return 'Incorrect password.';
    if (msg.includes('user-not-found')) return 'No account found.';
    return msg;
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#f4f1ec] p-8 rounded-2xl shadow-2xl w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">
          {showSignup ? 'Sign Up' : 'Login'}
        </h2>

        {showSignup && (
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="border-b w-full py-2 mb-4 bg-transparent outline-none"
            type="text"
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border-b w-full py-2 mb-4 bg-transparent outline-none"
          type="email"
        />

        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border-b w-full py-2 mb-4 bg-transparent outline-none"
        />

        {!showSignup && (
          <div className="flex items-center justify-between text-sm mb-4">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <button className="text-gray-700 hover:underline">Forgot Password?</button>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm mb-3 text-center">{error}</div>
        )}

        <button
          onClick={showSignup ? handleSignup : handleLogin}
          disabled={loading}
          className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-900 transition disabled:opacity-50"
        >
          {loading ? 'Please wait...' : showSignup ? 'Sign Up' : 'Let’s Go'}
        </button>

        <p className="text-sm text-center mt-4">
          {showSignup ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => {
                  setShowSignup(false);
                  setError('');
                }}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <span
                onClick={() => {
                  setShowSignup(true);
                  setError('');
                }}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign-Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
