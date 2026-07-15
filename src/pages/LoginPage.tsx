import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import './AuthPage.css'; // Let's use a dedicated CSS file

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    username: z.string().min(2, 'Username is required'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, isLoading, error, clearError } = useAuthStore();

  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode');

  const [isToggled, setIsToggled] = useState(mode === 'signup');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', username: '', email: '', password: '', confirmPassword: '' },
  });

  const onLogin = async (values: LoginFormValues) => {
    clearError();
    await login(values.email, values.password, true);
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  };

  const onSignup = async (values: SignupFormValues) => {
    clearError();
    await signup(values.name, values.email, values.password);
    if (!useAuthStore.getState().error) {
      setSignupSuccess(true);
      setIsToggled(false);
      signupForm.reset();
    }
  };

  const toggleToSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    clearError();
    setSignupSuccess(false);
    setIsToggled(true);
  };

  const toggleToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    clearError();
    setIsToggled(false);
  };

  const loginFormError = Object.values(loginForm.formState.errors)[0]?.message;
  const signupFormError = Object.values(signupForm.formState.errors)[0]?.message;

  return (
    <div className="auth-body">
      <div className={`wrapper ${isToggled ? 'active' : ''}`}>
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>

        {/* ═══ LOGIN FORM ═══ */}
        <div className="form-box login">
          <h2 className="animation" style={{ '--i': 0, '--j': 21 } as React.CSSProperties}>Login</h2>
          {signupSuccess && (
            <div className="auth-success-banner animation" style={{ '--i': 1, '--j': 22 } as React.CSSProperties}>✓ Account created! Sign in to continue.</div>
          )}
          {((error && !isToggled) || loginFormError) && (
            <div className="auth-error-banner animation" style={{ '--i': 1, '--j': 22 } as React.CSSProperties}>{error || loginFormError}</div>
          )}
          
          <form onSubmit={loginForm.handleSubmit(onLogin)} noValidate>
            <div className="input-box animation" style={{ '--i': 1, '--j': 22 } as React.CSSProperties}>
              <input type="email" {...loginForm.register('email')} required />
              <label>Email</label>
              <Mail size={18} className="icon" />
            </div>

            <div className="input-box animation" style={{ '--i': 2, '--j': 23 } as React.CSSProperties}>
              <input type={showLoginPassword ? 'text' : 'password'} {...loginForm.register('password')} required />
              <label>Password</label>
              {showLoginPassword ? (
                <EyeOff size={18} className="icon clickable" onClick={() => setShowLoginPassword(false)} />
              ) : (
                <Eye size={18} className="icon clickable" onClick={() => setShowLoginPassword(true)} />
              )}
            </div>

            <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 } as React.CSSProperties} disabled={isLoading}>
              {isLoading ? 'Signing in…' : 'Login'}
            </button>

            <div className="logreg-link animation" style={{ '--i': 4, '--j': 25 } as React.CSSProperties}>
              <p>Don't have an account? <a href="#" onClick={toggleToSignup} className="register-link">Sign Up</a></p>
            </div>
          </form>
        </div>

        <div className="info-text login">
          <h2 className="animation" style={{ '--i': 0, '--j': 20 } as React.CSSProperties}>Welcome Back!</h2>
          <p className="animation" style={{ '--i': 1, '--j': 21 } as React.CSSProperties}>Sign in to access your Nimbus CRM dashboard and manage your customers.</p>
        </div>

        {/* ═══ SIGNUP FORM ═══ */}
        <div className="form-box register">
          <h2 className="animation" style={{ '--i': 17, '--j': 0 } as React.CSSProperties}>Sign Up</h2>
          {((error && isToggled) || signupFormError) && (
            <div className="auth-error-banner animation" style={{ '--i': 18, '--j': 1 } as React.CSSProperties}>{error || signupFormError}</div>
          )}

          <form onSubmit={signupForm.handleSubmit(onSignup)} noValidate>
            <div className="input-box animation" style={{ '--i': 18, '--j': 1 } as React.CSSProperties}>
              <input type="text" {...signupForm.register('name')} required />
              <label>Name</label>
              <User size={18} className="icon" />
            </div>

            <div className="input-box animation" style={{ '--i': 19, '--j': 2 } as React.CSSProperties}>
              <input type="text" {...signupForm.register('username')} required />
              <label>Username</label>
              <User size={18} className="icon" />
            </div>

            <div className="input-box animation" style={{ '--i': 20, '--j': 3 } as React.CSSProperties}>
              <input type="email" {...signupForm.register('email')} required />
              <label>Email</label>
              <Mail size={18} className="icon" />
            </div>

            <div className="input-box animation" style={{ '--i': 21, '--j': 4 } as React.CSSProperties}>
              <input type={showSignupPassword ? 'text' : 'password'} {...signupForm.register('password')} required />
              <label>Password</label>
              {showSignupPassword ? (
                <EyeOff size={18} className="icon clickable" onClick={() => setShowSignupPassword(false)} />
              ) : (
                <Eye size={18} className="icon clickable" onClick={() => setShowSignupPassword(true)} />
              )}
            </div>
            
            <div className="input-box animation" style={{ '--i': 22, '--j': 5 } as React.CSSProperties}>
              <input type={showConfirmPassword ? 'text' : 'password'} {...signupForm.register('confirmPassword')} required />
              <label>Confirm Password</label>
              {showConfirmPassword ? (
                <EyeOff size={18} className="icon clickable" onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <Eye size={18} className="icon clickable" onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>

            <button type="submit" className="btn animation" style={{ '--i': 23, '--j': 6 } as React.CSSProperties} disabled={isLoading}>
              {isLoading ? 'Creating account…' : 'Sign Up'}
            </button>

            <div className="logreg-link animation" style={{ '--i': 24, '--j': 7 } as React.CSSProperties}>
              <p>Already have an account? <a href="#" onClick={toggleToLogin} className="login-link">Login</a></p>
            </div>
          </form>
        </div>

        <div className="info-text register">
          <h2 className="animation" style={{ '--i': 17, '--j': 0 } as React.CSSProperties}>Hello, Welcome!</h2>
          <p className="animation" style={{ '--i': 18, '--j': 1 } as React.CSSProperties}>Enter your details to start your journey with Nimbus CRM.</p>
        </div>
      </div>
    </div>
  );
}
