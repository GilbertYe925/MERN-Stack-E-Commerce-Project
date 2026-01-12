import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useRegisterMutation, useRequestPasswordResetMutation, useResetPasswordMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { RootState } from '../../redux/store';
import Loader from '../../components/common/Loader';
import FormInput from '../../components/common/FormInput';
import FormButton from '../../components/common/FormButton';

type AuthStep = 'email' | 'login' | 'register' | 'forgot-password' | 'reset-password';

const Auth = () => {
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
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
    
    if (!privacyAccepted) {
      toast.error('Please accept the privacy policy and terms to continue');
      return;
    }
    
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
    setPrivacyAccepted(false);
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // await requestPasswordReset({ email }).unwrap();
      toast.success('If that email exists, a password reset link has been sent.');
      setStep('reset-password');
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
      
      <div className="bg-component rounded-3xl p-12 w-[72rem] h-[42.5rem] flex flex-col relative">
        {(step === 'login' || step === 'register' || step === 'forgot-password' || step === 'reset-password') && (
          <button
            onClick={handleBackToEmail}
            className="absolute top-12 left-12 z-10 text-text-primary hover:underline"
          >
            ← Back
          </button>
        )}
        {step === 'email' && (
          <div className="pt-[1.5rem] flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-[3.5rem] text-center whitespace-nowrap leading-[3.5rem]">Log In Or Create A New Account</h1>
            <p className="text-center mb-8 text-text-primary playfair-display text-base leading-[1.5rem]">We will determine if you already have an account.</p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col items-center w-full">
              <div className="w-[43.5rem]">
                <FormInput
                  type="email"
                  id="email"
                  placeholder="E-mail*"
                  className="mb-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoggingIn}
                />

              <FormButton
                type="submit"
                disabled={isLoggingIn}
                className="mt-4"
              >
                {isLoggingIn ? 'Checking...' : 'Continue'}
              </FormButton>
              </div>
              {isLoggingIn && <Loader />}
            </form>
          </div>
        )}

        {step === 'login' && (
          <div className="pt-[1.5rem] flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-[3.5rem] text-center whitespace-nowrap leading-[3.5rem]">Sign In</h1>
            <form onSubmit={handleLogin} className="flex flex-col items-center w-full">
              <div className="w-[43.5rem] space-y-5">
                <FormInput
                  type="email"
                  id="login-email"
                  placeholder="E-mail*"
                  value={email}
                  disabled
                />
                <FormInput
                  type="password"
                  id="login-password"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoggingIn}
                />

                <div className="text-center space-y-2 w-full">
                  <button
                    type="button"
                    onClick={() => setStep('forgot-password')}
                    className="text-text-primary text-base leading-[1.5rem] playfair-display hover:underline block"
                  >
                    Forgot password?
                  </button>
                </div>

                <FormButton
                  type="submit"
                  disabled={isLoggingIn}
                  className="mt-4"
                >
                  {isLoggingIn ? 'Signing in...' : 'Sign In'}
                </FormButton>


              </div>
              {isLoggingIn && <Loader />}
            </form>
          </div>
        )}

        {step === 'register' && (
          <div className="pt-[1.5rem] flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-[3.5rem] text-center whitespace-nowrap leading-[3.5rem]">Join Us</h1>
            <form onSubmit={handleRegister} className="flex flex-col items-center w-full">
              <div className="w-[43.5rem] space-y-5">
                <FormInput
                  type="text"
                  id="register-username"
                  placeholder="Username*"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isRegistering}
                />
                <FormInput
                  type="password"
                  id="register-password"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isRegistering}
                />
                <FormInput
                  type="password"
                  id="register-confirm-password"
                  placeholder="Confirm Password*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isRegistering}
                />
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy-checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    disabled={isRegistering}
                    className="mt-1 w-5 h-5 border border-gray-300 rounded cursor-pointer"
                    required
                  />
                  <label htmlFor="privacy-checkbox" className="text-text-primary text-base leading-[1.5rem] playfair-display cursor-pointer">
                    I agree to the <a href="#" className="underline hover:no-underline">Privacy Policy</a> and <a href="#" className="underline hover:no-underline">Terms of Service</a>*
                  </label>
                </div>
                <FormButton
                  type="submit"
                  disabled={isRegistering || !privacyAccepted}
                  className="mt-4"
                >
                  {isRegistering ? 'Creating account...' : 'Create Account'}
                </FormButton>
              </div>
              {isRegistering && <Loader />}
            </form>
          </div>
        )}

        {step === 'forgot-password' && (
          <div className="pt-[1.5rem] flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-[3.5rem] text-center whitespace-nowrap leading-[3.5rem]">Reset Password</h1>
            <p className="text-center mb-8 text-text-primary playfair-display text-base leading-[1.5rem]">Enter your email to receive a password reset link.</p>
            <form onSubmit={handleForgotPassword} className="flex flex-col items-center w-full">
              <div className="w-[43.5rem]">
                <FormInput
                  type="email"
                  id="forgot-email"
                  placeholder="E-mail*"
                  className="mb-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isRequestingReset}
                />
                <FormButton
                  type="submit"
                  disabled={isRequestingReset}
                  className="mt-4"
                >
                  {isRequestingReset ? 'Sending...' : 'Send Reset Link'}
                </FormButton>
              </div>
              {isRequestingReset && <Loader />}
            </form>
          </div>
        )}

        {step === 'reset-password' && (
          <div className="pt-[1.25rem] flex flex-col items-center relative">
            <h1 className="text-5xl font-bold mb-[3.5rem] text-center whitespace-nowrap leading-[3.5rem]">Reset your password</h1>
            <p className="text-center mb-8 text-text-primary playfair-display text-base leading-[1.5rem]">Please enter your new password.</p>
            <form onSubmit={handleResetPassword} className="flex flex-col items-center w-full">
              <div className="w-[43.5rem] space-y-[1.5rem]">
                <div className="relative">
                  <FormInput
                    type="password"
                    id="reset-password"
                    placeholder="New Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isResettingPassword}
                  />
                </div>
                <div className="relative">
                  <FormInput
                    type="password"
                    id="reset-confirm-password"
                    placeholder="Confirm Password*"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isResettingPassword}
                  />
                </div>
                <p className="text-base leading-[1.5rem] text-text-secondary playfair-display mb-4">At least 7 characters long. Must include one uppercase letter and one number.</p>
                <FormButton
                  type="submit"
                  disabled={isResettingPassword}
                >
                  {isResettingPassword ? 'Resetting...' : 'Submit'}
                </FormButton>
                <p className="text-center text-base leading-[1.5rem] text-text-secondary playfair-display mt-4">Required fields *</p>
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
