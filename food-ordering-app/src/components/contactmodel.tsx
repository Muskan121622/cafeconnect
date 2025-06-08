import { useState } from 'react';

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal = ({ onClose }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    setLoading(true);
    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      // Optionally clear form fields:
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#f4f1ec] p-8 rounded-2xl shadow-2xl w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl font-bold"
          aria-label="Close contact form"
        >
          &times;
        </button>

        {!sent ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="border-b w-full py-2 bg-transparent outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="border-b w-full py-2 bg-transparent outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Message"
                className="border-b w-full py-2 h-24 resize-none bg-transparent outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {error && (
                <div className="text-red-600 text-sm mb-3 text-center">{error}</div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-900 transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              Your message successfully sent!
            </h2>
            <button
              onClick={onClose}
              className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-900 transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
