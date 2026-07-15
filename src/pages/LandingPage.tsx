import { useNavigate } from 'react-router-dom';
import {
  Cloud, BarChart3, Users2, ShieldCheck, TrendingUp,
  ArrowRight, Sparkles, Star, Zap, Globe, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const features = [
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    desc: 'Live revenue, orders, and growth metrics in one beautiful dashboard.',
    gradient: 'from-brand-500/20 to-brand-600/5',
    iconBg: 'bg-brand-500/20',
    iconColor: 'text-brand-400',
  },
  {
    icon: Users2,
    title: 'Customer Intelligence',
    desc: 'Understand your best accounts instantly with smart filters and insights.',
    gradient: 'from-teal-500/20 to-teal-600/5',
    iconBg: 'bg-teal-500/20',
    iconColor: 'text-teal-400',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    desc: 'Role-based access control with a full audit-ready activity history.',
    gradient: 'from-amber-500/20 to-amber-600/5',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Optimised for speed — every screen loads in under 100ms.',
    gradient: 'from-rose-500/20 to-rose-600/5',
    iconBg: 'bg-rose-500/20',
    iconColor: 'text-rose-400',
  },
  {
    icon: Globe,
    title: 'Global Scale',
    desc: 'Trusted by 5,000+ sales teams across 40+ countries worldwide.',
    gradient: 'from-violet-500/20 to-violet-600/5',
    iconBg: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: Lock,
    title: 'Data Privacy',
    desc: 'SOC 2 Type II certified. Your data is encrypted at rest and in transit.',
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
];

const testimonials = [
  {
    quote: "Nimbus transformed how we manage our pipeline. Revenue is up 34% since switching.",
    author: "Sarah Chen",
    role: "VP of Sales, Acme Corp",
    initials: "SC",
    color: "bg-brand-500",
  },
  {
    quote: "The dashboard clarity is unmatched. My entire team onboarded in a single afternoon.",
    author: "Marcus Rivera",
    role: "Sales Director, TechFlow",
    initials: "MR",
    color: "bg-teal-500",
  },
  {
    quote: "Finally a CRM that doesn't require a PhD to operate. Clean, fast, and powerful.",
    author: "Priya Patel",
    role: "Head of Revenue, Nexus AI",
    initials: "PP",
    color: "bg-amber-500",
  },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink-950 text-ink-50 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-600/20 blur-[100px] animate-float" />
        <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[100px] animate-float-delayed" />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-teal-600/10 blur-[100px] animate-float" />
        {/* Grid mesh */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Navbar ─────────────────────────────────── */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-lg glow-brand">
            <Cloud className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-white">Nimbus CRM</span>
        </div>

        {/* Nav actions */}
        <div className="flex items-center gap-3">
          <button
            id="landing-login-btn"
            onClick={() => navigate('/login')}
            className="rounded-xl px-5 py-2 text-sm font-semibold text-ink-300 transition-colors hover:text-white hover:bg-white/10"
          >
            Log in
          </button>
          <button
            id="landing-signup-btn"
            onClick={() => navigate('/signup')}
            className="rounded-xl bg-brand-gradient px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-brand-500/50 hover:-translate-y-0.5"
          >
            Get started free
          </button>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-20 pb-28 text-center sm:px-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-300 backdrop-blur-sm mb-8 fade-in">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          Trusted by 5,000+ sales teams worldwide
          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
        </div>

        <h1 className="font-display text-5xl font-bold leading-tight text-white sm:text-6xl xl:text-7xl fade-in delay-100">
          Run your revenue
          <br />
          <span className="gradient-text">with clarity.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-400 leading-relaxed fade-in delay-200">
          Nimbus CRM brings your customers, orders, and revenue into one beautiful workspace — built for fast-moving sales teams that demand real results, not complexity.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center fade-in delay-300">
          <button
            id="hero-get-started-btn"
            onClick={() => navigate('/signup')}
            className="group flex items-center gap-2 rounded-2xl bg-brand-gradient px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-500/30 transition-all hover:shadow-brand-500/50 hover:-translate-y-1"
          >
            Start for free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            id="hero-login-btn"
            onClick={() => navigate('/login')}
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-ink-200 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
          >
            Sign in to your account
          </button>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center gap-8 fade-in delay-400">
          {[
            { icon: ShieldCheck, label: 'SOC 2 Type II' },
            { icon: TrendingUp, label: '99.9% uptime' },
            { icon: Users2, label: '5K+ teams' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-ink-500" />
              <span className="text-xs text-ink-500">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dashboard Preview ─────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 mb-24">
        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm shadow-2xl shadow-brand-900/50">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="h-3 w-3 rounded-full bg-rose-500/60" />
            <span className="h-3 w-3 rounded-full bg-amber-500/60" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
            <div className="ml-4 flex-1 rounded-full bg-white/5 px-4 py-1 text-xs text-ink-500">
              app.nimbuscrm.io/dashboard
            </div>
          </div>
          {/* Dashboard preview image */}
          <div className="rounded-2xl overflow-hidden bg-ink-900 min-h-[300px] flex items-center justify-center">
            <img
              src="/dashboard_illustration.png"
              alt="Nimbus CRM Dashboard"
              className="w-full object-cover rounded-2xl opacity-90"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Fallback placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-ink-600 gap-4">
              <BarChart3 className="h-16 w-16 opacity-30" />
              <p className="text-sm opacity-50">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 mb-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Everything your sales team needs
          </h2>
          <p className="mt-3 text-ink-400 max-w-xl mx-auto">
            From pipeline management to revenue analytics — Nimbus has it all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc, iconBg, iconColor, gradient }) => (
            <div
              key={title}
              className={`group rounded-2xl border border-white/8 bg-gradient-to-br ${gradient} p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/50`}
            >
              <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </span>
              <h3 className="font-semibold text-white mb-1">{title}</h3>
              <p className="text-sm text-ink-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 mb-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Loved by sales teams
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {testimonials.map(({ quote, author, role, initials, color }) => (
            <div
              key={author}
              className="rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-ink-300 leading-relaxed mb-4">"{quote}"</p>
              <div className="flex items-center gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full ${color} text-xs font-bold text-white`}>
                  {initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{author}</p>
                  <p className="text-xs text-ink-500">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 sm:px-10 pb-24 text-center">
        <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/10 to-violet-500/10 p-12 backdrop-blur-sm">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl mb-4">
            Ready to grow your revenue?
          </h2>
          <p className="text-ink-400 mb-8">
            Join 5,000+ sales teams already using Nimbus CRM. Free forever for small teams.
          </p>
          <button
            id="cta-get-started-btn"
            onClick={() => navigate('/signup')}
            className="group inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-10 py-4 text-base font-semibold text-white shadow-xl shadow-brand-500/30 transition-all hover:shadow-brand-500/50 hover:-translate-y-1"
          >
            Create your free account
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-4 text-xs text-ink-600">No credit card required. Up and running in 2 minutes.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center">
        <p className="text-xs text-ink-600">© 2026 Nimbus CRM. All rights reserved.</p>
      </footer>
    </div>
  );
}
