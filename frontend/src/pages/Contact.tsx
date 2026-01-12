import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';

const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Add API call here when backend is ready
      // For now, just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Thank you for contacting us! We will get back to you soon.');
      
      // Reset form
      setName('');
      setPhone('');
      setEmail('');
      setComment('');
    } catch (error: any) {
      toast.error(error?.data?.message || error.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col mt-10 items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Logo placeholder - links back to home */}
      <Link 
        to="/" 
        className="mb-8 cursor-pointer"
      >
        <div className="w-30 h-24 bg-black rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-bold">Logo</span>
        </div>
      </Link>
      
      <div className="bg-component rounded-3xl p-8 w-[45rem] h-[44rem] flex flex-col relative">
        <h1 className="text-4xl font-bold mb-15 text-center mb-4 whitespace-nowrap">Contact Us</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-[28rem]">
            <input
              type="text"
              id="name"
              placeholder="Name*"
              className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
            
            <input
              type="tel"
              id="phone"
              placeholder="Phone*"
              className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={isSubmitting}
            />
            
            <input
              type="email"
              id="email"
              placeholder="E-mail*"
              className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            
            <textarea
              id="comment"
              placeholder="Comment*"
              className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary resize-none"
              rows={6}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              disabled={isSubmitting}
            />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 bg-black text-white p-3 rounded-2xl border-black border hover:bg-white hover:text-black"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {isSubmitting && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default Contact;
