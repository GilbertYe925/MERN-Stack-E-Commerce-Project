import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useRegisterMutation, useRequestPasswordResetMutation, useResetPasswordMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { RootState } from '../../redux/store';
import Loader from '../../components/Loader';

type AuthStep = 'email' | 'login' | 'register' | 'forgot-password' | 'reset-password';

const Auth = () => {
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [requestPasswordReset, { isLoading: isRequestingReset }] = useRequestPasswordResetMutation();
  const [resetPassword, { isLoading: isResettingPassword }] = useResetPasswordMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';
  const resetToken = sp.get('resetToken');

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    // Check if reset token is in URL
    if (resetToken) {
      setStep('reset-password');
    }
  }, [userInfo, navigate, redirect, resetToken]);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ email, password: '' }).unwrap();
    } catch (error: any) {
      const message = error?.data?.message || error.message;
      setStep(message === 'Invalid password' ? 'login' : 'register');
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success('Login successful');
    } catch (error: any) {
      toast.error(error?.data?.message || error.message || 'Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success('Registration successful');
    } catch (error: any) {
      toast.error(error?.data?.message || error?.error || 'Registration failed');
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setPassword('');
    setUsername('');
    setConfirmPassword('');
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await requestPasswordReset({ email }).unwrap();
      toast.success('If that email exists, a password reset link has been sent.');
      setStep('email');
    } catch (error: any) {
      toast.error(error?.data?.message || error.message || 'Failed to send reset email');
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!resetToken) {
      toast.error('Invalid reset token');
      return;
    }

    try {
      await resetPassword({ token: resetToken, password }).unwrap();
      toast.success('Password has been reset successfully');
      setStep('login');
      setPassword('');
      setConfirmPassword('');
      // Clear the reset token from URL
      navigate('/auth', { replace: true });
    } catch (error: any) {
      toast.error(error?.data?.message || error.message || 'Failed to reset password');
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
      
      <div className="bg-component rounded-2xl p-12 w-[45rem] h-[44rem] flex flex-col relative">
        {(step === 'login' || step === 'register' || step === 'forgot-password' || step === 'reset-password') && (
          <button
            onClick={handleBackToEmail}
            className="absolute top-12 left-12 text-text-primary hover:underline"
          >
            ← Back
          </button>
        )}
        {step === 'email' && (
          <div className="pt-22">
            <h1 className="text-4xl font-bold mb-15 text-center whitespace-nowrap">Log In Or Create A New Account</h1>
            <p className="text-center mb-8 text-text-primary playfair-display text-md">We will determine if you already have an account.</p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col items-center">
              <div className="w-[28rem]">
                <input
                  type="email"
                  id="email"
                  placeholder="E-mail*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoggingIn}
                />

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full mt-4 bg-black text-white p-3 rounded-2xl border-black border hover:bg-white hover:text-black"
              >
                {isLoggingIn ? 'Checking...' : 'Continue'}
              </button>
              </div>
              {isLoggingIn && <Loader />}
            </form>
          </div>
        )}

        {step === 'login' && (
          <div className="pt-22">
            <h1 className="text-4xl font-bold mb-15 text-center whitespace-nowrap">Sign In</h1>
            <form onSubmit={handleLogin} className="flex flex-col items-center">
              <div className="w-[28rem]">
                <input
                  type="email"
                  id="login-email"
                  placeholder="E-mail*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={email}
                  disabled
                />
                <input
                  type="password"
                  id="login-password"
                  placeholder="Password*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoggingIn}
                />

                <div className="text-center space-y-2 w-full ">
                  <button
                    type="button"
                    onClick={() => setStep('forgot-password')}
                    className="text-text-primary text-sm playfair-display text-md hover:underline block"
                  >
                    Forgot password?
                  </button>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full mt-4 bg-black text-white p-3 rounded-2xl border-black border hover:bg-white hover:text-black"
                >
                  {isLoggingIn ? 'Signing in...' : 'Sign In'}
                </button>


              </div>
              {isLoggingIn && <Loader />}
            </form>
          </div>
        )}

        {step === 'register' && (
          <div className="pt-22">
            <h1 className="text-4xl font-bold mb-15 text-center whitespace-nowrap">Join Us</h1>
            <form onSubmit={handleRegister} className="flex flex-col items-center">
              <div className="w-[28rem]">
                <input
                  type="email"
                  id="register-email"
                  placeholder="E-mail*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={email}
                  disabled
                />
                <input
                  type="text"
                  id="register-username"
                  placeholder="Username*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isRegistering}
                />
                <input
                  type="password"
                  id="register-password"
                  placeholder="Password*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isRegistering}
                />
                <input
                  type="password"
                  id="register-confirm-password"
                  placeholder="Confirm Password*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isRegistering}
                />
                <button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full mt-4 bg-black text-white p-3 rounded-2xl border-black border hover:bg-white hover:text-black"
                >
                  {isRegistering ? 'Creating account...' : 'Create Account'}
                </button>
              </div>
              {isRegistering && <Loader />}
            </form>
          </div>
        )}

        {step === 'forgot-password' && (
          <div className="pt-22">
            <h1 className="text-4xl font-bold mb-15 text-center whitespace-nowrap">Reset Password</h1>
            <p className="text-center mb-8 text-text-primary playfair-display text-md">Enter your email to receive a password reset link.</p>
            <form onSubmit={handleForgotPassword} className="flex flex-col items-center">
              <div className="w-[28rem]">
                <input
                  type="email"
                  id="forgot-email"
                  placeholder="E-mail*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isRequestingReset}
                />
                <button
                  type="submit"
                  disabled={isRequestingReset}
                  className="w-full mt-4 bg-black text-white p-3 rounded-2xl border-black border hover:bg-white hover:text-black"
                >
                  {isRequestingReset ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
              {isRequestingReset && <Loader />}
            </form>
          </div>
        )}

        {step === 'reset-password' && (
          <div className="pt-22">
            <h1 className="text-4xl font-bold mb-15 text-center whitespace-nowrap">Reset Password</h1>
            <p className="text-center mb-8 text-text-primary playfair-display text-md">Enter your new password.</p>
            <form onSubmit={handleResetPassword} className="flex flex-col items-center">
              <div className="w-[28rem]">
                <input
                  type="password"
                  id="reset-password"
                  placeholder="New Password*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isResettingPassword}
                />
                <input
                  type="password"
                  id="reset-confirm-password"
                  placeholder="Confirm New Password*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isResettingPassword}
                />
                <button
                  type="submit"
                  disabled={isResettingPassword}
                  className="w-full mt-4 bg-black text-white p-3 rounded-2xl border-black border hover:bg-white hover:text-black"
                >
                  {isResettingPassword ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
              {isResettingPassword && <Loader />}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
