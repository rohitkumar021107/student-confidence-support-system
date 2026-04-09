import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ChevronRight,
  Globe,
  GraduationCap,
  LogIn,
  Menu,
  MessageCircle,
  Send,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import AskSparkLogo from "../components/AskSparkLogo";
import { loadLocalProfile, saveLocalProfile } from "../hooks/useLocalProfile";
import { useUserProfile } from "../hooks/useQueries";
import { saveUserToFirestore } from "../lib/useFirestoreUsers";
import { AppRole } from "../types/appTypes";

// ─── Navbar ──────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Features", href: "#features", isAnchor: true },
  { label: "How it Works", href: "#how-it-works", isAnchor: true },
  { label: "Learning", href: "/learning", isAnchor: false },
  { label: "Blog", href: "/blog", isAnchor: false },
  { label: "Help Center", href: "/help", isAnchor: false },
];

function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState<"teacher" | "student" | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleTeacher = () => {
    if (loading) return;
    setLoading("teacher");
    const localProfile = loadLocalProfile();
    if (localProfile) {
      const updated = { ...localProfile, role: AppRole.teacher };
      saveLocalProfile(updated);
      localStorage.setItem("askspark_role", "teacher");
      localStorage.setItem(
        "askspark_role_skip_sync_until",
        String(Date.now() + 15000),
      );
      void saveUserToFirestore(
        localProfile.userId,
        localProfile.displayName,
        "teacher",
      );
      navigate({ to: "/dashboard/teacher" });
    } else {
      navigate({ to: "/onboarding", search: { role: "teacher" } });
    }
  };

  const handleStudent = () => {
    if (loading) return;
    setLoading("student");
    const localProfile = loadLocalProfile();
    if (localProfile) {
      const updated = { ...localProfile, role: AppRole.student };
      saveLocalProfile(updated);
      localStorage.setItem("askspark_role", "student");
      navigate({ to: "/dashboard/student" });
    } else {
      navigate({ to: "/onboarding", search: { role: "student" } });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 glass-nav transition-all duration-300 ${scrolled ? "warm-shadow" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center flex-shrink-0"
          data-ocid="nav.logo"
        >
          <AskSparkLogo
            variant="horizontal"
            height={38}
            className="hidden md:block"
          />
          <AskSparkLogo variant="icon" height={36} className="md:hidden" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((link) =>
            link.isAnchor ? (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-indigo-600 transition-colors duration-150"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate({ to: link.href as "/" });
                }}
                className="hover:text-indigo-600 transition-colors duration-150 cursor-pointer"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-primary/30 text-primary hover:bg-primary/5 font-medium min-w-[120px] px-5 py-2.5 transition-all duration-150 hover:scale-[1.02]"
            onClick={handleTeacher}
            disabled={loading === "teacher"}
            data-ocid="nav.teacher_button"
          >
            {loading === "teacher" ? "..." : "Join as Teacher"}
          </Button>
          <Button
            size="sm"
            className="rounded-full gradient-primary text-white hover:opacity-90 font-medium px-5 py-2.5 shadow-primary border-0 min-w-[120px] transition-all duration-150 hover:scale-[1.02]"
            onClick={handleStudent}
            disabled={loading === "student"}
            data-ocid="nav.student_button"
          >
            {loading === "student" ? "..." : "I am a Student"}
          </Button>
          <div
            className="flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 shadow-md shadow-blue-500/30 transition-transform duration-150 hover:scale-105"
            data-ocid="nav.brand_icon"
          >
            <AskSparkLogo variant="icon" height={28} />
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <div
            className="flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-md shadow-blue-500/30"
            data-ocid="nav.brand_icon_mobile"
          >
            <AskSparkLogo variant="icon" height={26} />
          </div>
          <button
            type="button"
            className="p-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-t border-white/30 px-4 py-4 flex flex-col gap-2 animate-fade-in">
          {NAV_LINKS.map((link) =>
            link.isAnchor ? (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium py-2 text-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  navigate({ to: link.href as "/" });
                }}
              >
                {link.label}
              </a>
            ),
          )}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/30 text-primary w-full py-2.5"
              onClick={() => {
                setMobileOpen(false);
                handleTeacher();
              }}
              data-ocid="nav.teacher_button"
            >
              Join as Teacher
            </Button>
            <Button
              size="sm"
              className="rounded-full gradient-primary text-white border-0 w-full py-2.5"
              onClick={() => {
                setMobileOpen(false);
                handleStudent();
              }}
              data-ocid="nav.student_button"
            >
              I am a Student
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero floating badges ─────────────────────────────────────────────────────

const BADGES = [
  {
    label: "Ask",
    color: "bg-blue-500/90 text-white",
    delay: "0s",
    position: "-top-3 left-4",
  },
  {
    label: "Get Answers",
    color: "bg-purple-500/90 text-white",
    delay: "0.4s",
    position: "-top-3 right-4",
  },
  {
    label: "Build Confidence",
    color: "bg-indigo-500/90 text-white",
    delay: "0.8s",
    position: "-bottom-3 left-1/2 -translate-x-1/2",
  },
];

function StudentIllustration() {
  return (
    <div className="relative w-52 h-52 mx-auto">
      {/* Glow backdrop */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />

      {/* Center student figure SVG */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          width="160"
          height="180"
          viewBox="0 0 160 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Student asking questions illustration"
          role="img"
        >
          <defs>
            <linearGradient id="stu-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          {/* Body */}
          <rect
            x="50"
            y="95"
            width="60"
            height="70"
            rx="12"
            fill="url(#stu-grad)"
            opacity="0.9"
          />
          {/* Head */}
          <circle cx="80" cy="68" r="26" fill="url(#stu-grad)" />
          {/* Face - eyes */}
          <circle cx="72" cy="67" r="3.5" fill="white" opacity="0.9" />
          <circle cx="88" cy="67" r="3.5" fill="white" opacity="0.9" />
          {/* Smile */}
          <path
            d="M72 76 Q80 82 88 76"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {/* Arms */}
          <rect
            x="26"
            y="100"
            width="28"
            height="10"
            rx="5"
            fill="url(#stu-grad)"
            opacity="0.7"
          />
          <rect
            x="106"
            y="100"
            width="28"
            height="10"
            rx="5"
            fill="url(#stu-grad)"
            opacity="0.7"
          />
          {/* Book in hands */}
          <rect
            x="26"
            y="108"
            width="28"
            height="20"
            rx="4"
            fill="#6366F1"
            opacity="0.85"
          />
          <line
            x1="33"
            y1="114"
            x2="47"
            y2="114"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <line
            x1="33"
            y1="119"
            x2="47"
            y2="119"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Speech bubble */}
          <rect
            x="92"
            y="20"
            width="56"
            height="34"
            rx="10"
            fill="white"
            opacity="0.95"
          />
          <polygon points="100,54 110,54 104,62" fill="white" opacity="0.95" />
          <text
            x="120"
            y="34"
            textAnchor="middle"
            fontSize="9"
            fill="#6366F1"
            fontWeight="700"
          >
            How?
          </text>
          <text
            x="120"
            y="46"
            textAnchor="middle"
            fontSize="9"
            fill="#8B5CF6"
            fontWeight="600"
          >
            Why?
          </text>
        </svg>
      </div>

      {/* Floating badges */}
      {BADGES.map((badge) => (
        <div
          key={badge.label}
          className={`absolute ${badge.position} badge-float`}
          style={{ animationDelay: badge.delay }}
        >
          <div
            className={`${badge.color} text-xs font-semibold px-3 py-1.5 rounded-full warm-shadow-lg backdrop-blur-sm whitespace-nowrap`}
          >
            {badge.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── About cards ──────────────────────────────────────────────────────────────

const ABOUT_CARDS = [
  {
    icon: AlertTriangle,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    title: "The Problem",
    bullets: [
      "Students fear asking doubts in class",
      "Questions go unanswered, confidence drops",
    ],
    border: "border-orange-100/60",
  },
  {
    icon: Shield,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Our Solution",
    bullets: [
      "Ask anonymously — no fear, no judgment",
      "Safe, supportive learning environment",
    ],
    border: "border-green-100/60",
  },
  {
    icon: Sparkles,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "AskSpark Platform",
    bullets: [
      "AI + real teachers always available",
      "Fast, reliable answers 24/7",
    ],
    border: "border-purple-100/60",
  },
];

// ─── Feature cards ────────────────────────────────────────────────────────────

const FEATURE_CARDS = [
  {
    icon: MessageCircle,
    iconBg: "bg-blue-500",
    title: "Ask Any Question",
    desc: "No question is too small. Ask anonymously or with your name — get answers fast.",
  },
  {
    icon: Users,
    iconBg: "bg-purple-500",
    title: "Learn Together",
    desc: "Join a community of students. Share knowledge, solve problems together.",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-indigo-500",
    title: "Track Your Progress",
    desc: "Watch your confidence score and XP grow with every question answered.",
  },
  {
    icon: Star,
    iconBg: "gradient-primary",
    title: "Build Confidence",
    desc: "From nervous to confident — AskSpark turns doubts into your biggest strengths.",
  },
];

// ─── How it works steps ───────────────────────────────────────────────────────

const HOW_STEPS = [
  {
    icon: LogIn,
    title: "Sign In or Stay Anonymous",
    subtitle: "Your choice — no pressure",
  },
  {
    icon: Send,
    title: "Submit Your Doubt",
    subtitle: "Text or image — any format",
  },
  {
    icon: Zap,
    title: "AI Processes & Organizes",
    subtitle: "Smart categorization instantly",
  },
  {
    icon: GraduationCap,
    title: "Teacher Answers",
    subtitle: "Text or video explanation",
  },
  {
    icon: Trophy,
    title: "Gain Confidence",
    subtitle: "XP points + confidence score",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const { data: profile } = useUserProfile();
  const [ctaLoading, setCtaLoading] = useState<"doubt" | "teacher" | null>(
    null,
  );

  const handleJoinAsTeacher = () => {
    if (ctaLoading) return;
    setCtaLoading("teacher");
    const localProfile = loadLocalProfile();
    if (localProfile) {
      const updated = { ...localProfile, role: AppRole.teacher };
      saveLocalProfile(updated);
      localStorage.setItem("askspark_role", "teacher");
      localStorage.setItem(
        "askspark_role_skip_sync_until",
        String(Date.now() + 15000),
      );
      void saveUserToFirestore(
        localProfile.userId,
        localProfile.displayName,
        "teacher",
      );
      navigate({ to: "/dashboard/teacher" });
    } else {
      navigate({ to: "/onboarding", search: { role: "teacher" } });
    }
  };

  const handleStudent = () => {
    const localProfile = loadLocalProfile();
    if (localProfile) {
      const updated = { ...localProfile, role: AppRole.student };
      saveLocalProfile(updated);
      localStorage.setItem("askspark_role", "student");
      navigate({ to: "/dashboard/student" });
    } else {
      navigate({ to: "/onboarding", search: { role: "student" } });
    }
  };

  const handleSubmitDoubt = () => {
    if (ctaLoading) return;
    setCtaLoading("doubt");
    navigate({ to: "/submit" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="from-blue-50 via-indigo-50 to-purple-50 bg-gradient-to-br min-h-[calc(100vh-4rem)] flex items-center px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto w-full py-16 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column */}
          <div className="animate-fade-up">
            {/* Platform badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/80 text-primary border border-primary/20 text-sm font-medium px-4 py-1.5 rounded-full warm-shadow mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Education Platform
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-tight tracking-tight text-foreground max-w-lg mb-4">
              Build Real <span className="text-gradient">Confidence</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed mb-6">
              From doubt to confidence in simple steps. Ask freely, learn
              faster, and grow every day.
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3 mb-2 mt-6"
              data-ocid="hero.cta_row"
            >
              <Button
                size="lg"
                className="rounded-xl gradient-primary text-white font-semibold px-6 py-3 shadow-primary border-0 hover:opacity-90 transition-all duration-150 hover:scale-[1.02] w-full sm:w-auto min-w-[160px]"
                onClick={handleSubmitDoubt}
                disabled={ctaLoading === "doubt"}
                data-ocid="hero.submit_doubt"
              >
                {ctaLoading === "doubt" ? "Loading..." : "Submit a Doubt"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl bg-white border-2 border-primary/30 text-primary hover:bg-primary/5 font-semibold px-6 py-3 transition-all duration-150 hover:scale-[1.02] w-full sm:w-auto min-w-[160px]"
                onClick={handleJoinAsTeacher}
                disabled={ctaLoading === "teacher"}
                data-ocid="hero.teacher_button"
              >
                {ctaLoading === "teacher" ? "Loading..." : "Join as Teacher"}
              </Button>
            </div>

            {/* Student link */}
            <button
              type="button"
              onClick={handleStudent}
              className="text-sm text-primary underline underline-offset-2 hover:text-primary/80 transition-colors mt-2 block"
              data-ocid="hero.student_link"
            >
              I am a Student →
            </button>

            {/* Welcome back panel */}
            {profile && (
              <div
                className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-primary/15 warm-shadow mt-6"
                data-ocid="hero.welcome_panel"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {profile.role === AppRole.teacher ? "T" : "S"}
                </div>
                <div className="flex-1 text-sm min-w-0">
                  <span className="font-semibold text-foreground">
                    Welcome back!
                  </span>
                  <span className="text-muted-foreground ml-1 text-xs">
                    You're signed in as{" "}
                    {profile.role === AppRole.teacher
                      ? "a teacher"
                      : "a student"}
                    .
                  </span>
                </div>
                <Button
                  size="sm"
                  className="rounded-full gradient-primary text-white border-0 font-semibold flex-shrink-0"
                  onClick={() =>
                    navigate({
                      to:
                        profile.role === AppRole.teacher
                          ? "/dashboard/teacher"
                          : "/dashboard/student",
                    })
                  }
                  data-ocid="hero.dashboard_button"
                >
                  Dashboard <ArrowRight className="ml-1 w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>

          {/* Right column — single clean illustration card */}
          <div className="flex justify-center items-center">
            <div
              className="glass-card rounded-2xl p-6 warm-shadow-xl w-full max-w-sm"
              style={{
                backdropFilter: "blur(16px)",
                background: "rgba(255,255,255,0.72)",
              }}
            >
              {/* Illustration centered */}
              <div className="flex items-center justify-center py-4">
                <StudentIllustration />
              </div>

              {/* Confidence score bar */}
              <div className="mt-4 px-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">
                    Confidence Score
                  </span>
                  <span className="text-sm font-bold text-primary">85%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-primary/10 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700"
                    style={{ width: "85%" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Keep asking to grow your score!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT PLATFORM (id="features") ───────────────────────────────── */}
      <section id="features" className="py-20 px-4 sm:px-6 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              About the Platform
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground max-w-2xl mx-auto">
              Why <span className="text-gradient">AskSpark</span>?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ABOUT_CARDS.map((card) => (
              <div
                key={card.title}
                className={`glass-card rounded-2xl p-6 warm-shadow hover:warm-shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl border ${card.border} cursor-default`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center mb-5`}
                >
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-3">
                  {card.title}
                </h3>
                <ul className="space-y-2">
                  {card.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 mt-2 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID (id="features-grid") ───────────────────────────── */}
      <section id="features-grid" className="py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Platform Features
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground max-w-2xl mx-auto">
              Everything You Need to{" "}
              <span className="text-gradient">Learn Confidently</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURE_CARDS.map((card) => (
              <div
                key={card.title}
                className="glass-card rounded-2xl p-6 warm-shadow hover:warm-shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl border-white/40 cursor-default group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}
                >
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (id="how-it-works") ─────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 bg-accent/20 text-accent-foreground border border-accent/30 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Simple Process
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground max-w-2xl mx-auto">
              How <span className="text-gradient">AskSpark</span> Works
            </h2>
          </div>

          {/* Desktop: horizontal flow */}
          <div className="hidden lg:flex items-start justify-between gap-2">
            {HOW_STEPS.map((step, i) => (
              <div key={step.title} className="flex items-start gap-2 flex-1">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="relative mb-4">
                    <div className="w-14 h-14 rounded-2xl glass-card warm-shadow flex items-center justify-center border-white/40">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-foreground text-sm mb-1 leading-tight px-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>
                {i < HOW_STEPS.length - 1 && (
                  <div className="flex-shrink-0 mt-5">
                    <ChevronRight className="w-5 h-5 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical flow */}
          <div className="lg:hidden flex flex-col items-center gap-3">
            {HOW_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col items-center w-full max-w-xs"
              >
                <div className="glass-card rounded-2xl p-5 w-full warm-shadow border-white/40 flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center border-white/40">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-sm">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
                {i < HOW_STEPS.length - 1 && (
                  <div className="py-2">
                    <ArrowDown className="w-4 h-4 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden warm-shadow-xl">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Decorative blobs */}
            <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-white/10 blur-2xl" />

            <div className="relative px-8 py-14 text-center">
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-4">
                Start Your Learning Journey Today
              </h2>
              <p className="text-white/80 mb-8 max-w-md mx-auto text-base">
                Join thousands of students building real confidence with
                AskSpark
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
                <Button
                  size="lg"
                  className="rounded-full bg-white text-indigo-700 font-semibold px-8 py-3 hover:bg-white/90 transition-all duration-150 hover:scale-[1.02] border-0 shadow-lg min-w-[160px] w-full sm:w-auto"
                  onClick={handleSubmitDoubt}
                  data-ocid="cta.submit_doubt"
                >
                  Submit a Doubt <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-3 transition-all duration-150 hover:scale-[1.02] min-w-[160px] w-full sm:w-auto"
                  onClick={handleJoinAsTeacher}
                  data-ocid="cta.teacher_button"
                >
                  Join as Teacher
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-foreground text-primary-foreground py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <AskSparkLogo variant="icon" height={32} />
              <span className="font-display text-lg font-bold text-white">
                AskSpark
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              The AI-powered confidence-building platform for students. Ask
              freely, learn boldly.
            </p>
          </div>
          <div>
            <div className="font-display font-bold text-white/80 mb-4 text-sm uppercase tracking-wider">
              Platform
            </div>
            <div className="space-y-2">
              {["Features", "How It Works", "For Students", "For Teachers"].map(
                (l) => (
                  <div
                    key={l}
                    className="text-white/50 text-sm hover:text-white/80 cursor-pointer transition-colors"
                  >
                    {l}
                  </div>
                ),
              )}
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-white/80 mb-4 text-sm uppercase tracking-wider">
              Contact
            </div>
            <div className="space-y-2 text-white/50 text-sm">
              <div>📧 hello@askspark.app</div>
              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> English · हिंदी · తెలుగు
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-white/40 text-sm">
          © {year} AskSpark · Team Spark. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-white/70 transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
