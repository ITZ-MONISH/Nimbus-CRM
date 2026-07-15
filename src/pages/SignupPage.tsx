import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import {
  Cloud, Mail, Lock, Eye, EyeOff, ArrowRight, User,
  BarChart3, Users2, ShieldCheck, TrendingUp, Sparkles, Star, CheckCircle2
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const perks = [
  { icon: BarChart3, label: 'Real-time revenue analytics' },
  { icon: Users2, label: 'Customer intelligence & insights' },
  { icon: ShieldCheck, label: 'Enterprise-grade security' },
  { icon: TrendingUp, label: 'Pipeline & growth tracking' },
];

export function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: SignupFormValues) => {
    clearError();
    await signup(values.name, values.email, values.password);
    // After signup, redirect to login page instead of automatic dashboard entrance
    navigate('/login?registered=true', { replace: true });
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* ── Left Brand Panel ─────────────────────────────── */}
      <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between">
        {/* Hero background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/crm_hero_panel.png)' }}
        />

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950/92 via-brand-900/80 to-ink-950/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />

        {/* Animated grid mesh */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Animated glow orbs */}
        <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl animate-float" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 rounded-full bg-teal-500/15 blur-3xl animate-float-delayed" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl animate-float" />

        {/* Top logo */}
        <div className="relative z-10 flex items-center gap-3 p-10">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-lg glow-brand animate-pulse-ring">
            <Cloud className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-xl font-bold text-white tracking-tight">Nimbus CRM</span>
        </div>

        {/* Center content */}
        <div className="relative z-10 px-10 pb-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm mb-6 fade-in">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Join 5,000+ sales teams worldwide
            <Star className="h-3 w-3 text-amber-300 fill-amber-300" />
          </div>

          <h2 className="font-display text-4xl font-bold leading-tight text-white xl:text-5xl fade-in delay-100">
            Start closing deals
            <br />
            <span className="gradient-text">smarter, faster.</span>
          </h2>
          <p className="mt-4 max-w-md text-base text-white/70 leading-relaxed fade-in delay-200">
            Everything you need to manage your pipeline, understand your customers, and grow your revenue — in one place.
          </p>

          {/* Perks list */}
          <div className="mt-10 space-y-3">
            {perks.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className="flex items-center gap-3 fade-in"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/20">
                  <Icon className="h-4 w-4 text-brand-300" />
                </span>
                <span className="text-sm text-white/80">{label}</span>
                <CheckCircle2 className="ml-auto h-4 w-4 text-teal-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 px-10 pb-10">
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">SC</span>
              <div>
                <p className="text-sm font-semibold text-white">Sarah Chen</p>
                <p className="text-xs text-white/60">VP of Sales, Acme Corp</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/75 italic leading-relaxed">
              "Nimbus transformed how we manage our pipeline. Revenue is up 34% since switching."
            </p>
          </div>
          <p className="mt-6 text-xs text-white/35">© 2026 Nimbus CRM. All rights reserved.</p>
        </div>
      </div>

      {/* ── Right Form Panel ─────────────────────────────── */}
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-brand-50/30 to-slate-100 px-4 py-12 dark:from-ink-950 dark:via-brand-900/10 dark:to-ink-950 sm:px-8">
        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-400/10 blur-3xl dark:bg-brand-500/10" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/10" />
        </div>

        <div className="relative w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 flex flex-col items-center text-center lg:hidden slide-in-from-bottom-2">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-xl glow-brand animate-pulse-ring">
              <Cloud className="h-7 w-7" />
            </span>
            <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-ink-50">Create your account</h1>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Join Nimbus CRM for free</p>
          </div>

          {/* Desktop heading */}
          <div className="hidden lg:block slide-in-from-bottom-2">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
              Free forever · No credit card needed
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold text-ink-900 dark:text-ink-50">Create account</h1>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
              Get started with Nimbus CRM in under 2 minutes.
            </p>
          </div>

          {/* Form card */}
          <div className="mt-8 rounded-3xl border border-ink-100/80 bg-white/90 p-7 shadow-[0_8px_40px_-8px_rgba(79,70,229,0.15)] backdrop-blur-sm dark:border-ink-700/60 dark:bg-ink-900/90 dark:shadow-[0_8px_40px_-8px_rgba(79,70,229,0.25)] slide-in-from-bottom-2 delay-100">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300 scale-in"
                >
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-rose-200 dark:bg-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-300 text-xs font-bold">!</span>
                  {error}
                </div>
              )}

              {/* Profile Name */}
              <div className="fade-in delay-100">
                <Input
                  id="signup-name"
                  label="Full name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jordan Ellis"
                  leftIcon={<User className="h-4 w-4" />}
                  error={errors.name?.message}
                  {...register('name')}
                />
              </div>

              {/* Email */}
              <div className="fade-in delay-200">
                <Input
                  id="signup-email"
                  label="Work email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  leftIcon={<Mail className="h-4 w-4" />}
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>

              {/* Password */}
              <div className="fade-in delay-300">
                <Input
                  id="signup-password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Min. 6 characters"
                  leftIcon={<Lock className="h-4 w-4" />}
                  error={errors.password?.message}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-600 dark:hover:bg-ink-700 dark:hover:text-ink-200"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                  {...register('password')}
                />
              </div>

              {/* Confirm Password */}
              <div className="fade-in delay-400">
                <Input
                  id="signup-confirm-password"
                  label="Confirm password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  leftIcon={<Lock className="h-4 w-4" />}
                  error={errors.confirmPassword?.message}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-600 dark:hover:bg-ink-700 dark:hover:text-ink-200"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                  {...register('confirmPassword')}
                />
              </div>

              {/* Terms */}
              <p className="text-xs text-ink-400 dark:text-ink-500 fade-in delay-500">
                By creating an account, you agree to our{' '}
                <a href="#" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">Privacy Policy</a>.
              </p>

              <div className="fade-in delay-500">
                <Button
                  id="signup-submit-btn"
                  type="submit"
                  className="w-full !py-3 text-base font-semibold shadow-lg shadow-brand-500/30 transition-all hover:shadow-brand-500/50 hover:-translate-y-0.5"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Create account
                </Button>
              </div>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400 fade-in delay-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              Sign in →
            </Link>
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex items-center justify-center gap-6 fade-in delay-700">
            {[
              { icon: ShieldCheck, label: 'SOC 2 Type II' },
              { icon: BarChart3, label: '99.9% uptime' },
              { icon: Users2, label: '5K+ teams' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="h-4 w-4 text-ink-300 dark:text-ink-600" />
                <span className="text-[10px] text-ink-400 dark:text-ink-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
