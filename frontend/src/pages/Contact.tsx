import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';
import FormInput from '../components/common/FormInput';
import FormButton from '../components/common/FormButton';

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
      
      <div className="bg-component rounded-3xl p-12 w-[72rem] h-[42.5rem] flex flex-col relative">
        <div className="pt-[1.5rem] flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-[3.5rem] text-center whitespace-nowrap leading-[3.5rem]">Contact Us</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <div className="w-[43.5rem] space-y-5">
              <FormInput
                type="text"
                id="name"
                placeholder="Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
              />
              
              <FormInput
                type="tel"
                id="phone"
                placeholder="Phone*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={isSubmitting}
              />
              
              <FormInput
                type="email"
                id="email"
                placeholder="E-mail*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              
              <FormInput
                as="textarea"
                id="comment"
                placeholder="Comment*"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                disabled={isSubmitting}
              />
              
              <FormButton
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </FormButton>
            </div>
            {isSubmitting && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
