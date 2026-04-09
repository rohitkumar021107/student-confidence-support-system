import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, A as AppRole, l as loadLocalProfile, s as saveLocalProfile, a as saveUserToFirestore } from "./index-B7a7mDQO.js";
import { B as Button } from "./button-hr6MopZc.js";
import { A as AskSparkLogo, M as Menu } from "./AskSparkLogo-DnmTS80g.js";
import { u as useUserProfile } from "./useQueries-Cra97OJ1.js";
import { S as Sparkles } from "./sparkles-CUF2ysXJ.js";
import { A as ArrowRight } from "./arrow-right-wA15OFq9.js";
import { S as Shield } from "./shield-BMpr_TuK.js";
import { M as MessageCircle } from "./message-circle-BcRWUMxG.js";
import { U as Users } from "./users-uLn5tsom.js";
import { T as TrendingUp, S as Star } from "./trending-up-BT84zGwT.js";
import { S as Send } from "./send-D-GxA4SX.js";
import { Z as Zap } from "./zap-BtFvHXuQ.js";
import { G as GraduationCap } from "./graduation-cap-CAwON0ps.js";
import { T as Trophy } from "./trophy-B7xH6Umk.js";
import { X } from "./x-DgJjIYoB.js";
import "./utils-CYIioXGT.js";
import "./useFirestoreDoubts-kWMuGG-S.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const NAV_LINKS = [
  { label: "Features", href: "#features", isAnchor: true },
  { label: "How it Works", href: "#how-it-works", isAnchor: true },
  { label: "Learning", href: "/learning", isAnchor: false },
  { label: "Blog", href: "/blog", isAnchor: false },
  { label: "Help Center", href: "/help", isAnchor: false }
];
function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(null);
  reactExports.useEffect(() => {
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
        String(Date.now() + 15e3)
      );
      void saveUserToFirestore(
        localProfile.userId,
        localProfile.displayName,
        "teacher"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `sticky top-0 z-50 glass-nav transition-all duration-300 ${scrolled ? "warm-shadow" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "/",
              className: "flex items-center flex-shrink-0",
              "data-ocid": "nav.logo",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AskSparkLogo,
                  {
                    variant: "horizontal",
                    height: 38,
                    className: "hidden md:block"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AskSparkLogo, { variant: "icon", height: 36, className: "md:hidden" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground", children: NAV_LINKS.map(
            (link) => link.isAnchor ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: link.href,
                className: "hover:text-indigo-600 transition-colors duration-150",
                "data-ocid": "nav.link",
                children: link.label
              },
              link.label
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: link.href,
                onClick: (e) => {
                  e.preventDefault();
                  navigate({ to: link.href });
                },
                className: "hover:text-indigo-600 transition-colors duration-150 cursor-pointer",
                "data-ocid": "nav.link",
                children: link.label
              },
              link.label
            )
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "rounded-full border-primary/30 text-primary hover:bg-primary/5 font-medium min-w-[120px] px-5 py-2.5 transition-all duration-150 hover:scale-[1.02]",
                onClick: handleTeacher,
                disabled: loading === "teacher",
                "data-ocid": "nav.teacher_button",
                children: loading === "teacher" ? "..." : "Join as Teacher"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "rounded-full gradient-primary text-white hover:opacity-90 font-medium px-5 py-2.5 shadow-primary border-0 min-w-[120px] transition-all duration-150 hover:scale-[1.02]",
                onClick: handleStudent,
                disabled: loading === "student",
                "data-ocid": "nav.student_button",
                children: loading === "student" ? "..." : "I am a Student"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 shadow-md shadow-blue-500/30 transition-transform duration-150 hover:scale-105",
                "data-ocid": "nav.brand_icon",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(AskSparkLogo, { variant: "icon", height: 28 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-md shadow-blue-500/30",
                "data-ocid": "nav.brand_icon_mobile",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(AskSparkLogo, { variant: "icon", height: 26 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "p-2 rounded-xl hover:bg-muted transition-colors",
                onClick: () => setMobileOpen(!mobileOpen),
                "aria-label": "Toggle menu",
                "data-ocid": "nav.toggle",
                children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
              }
            )
          ] })
        ] }),
        mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden glass-card border-t border-white/30 px-4 py-4 flex flex-col gap-2 animate-fade-in", children: [
          NAV_LINKS.map(
            (link) => link.isAnchor ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: link.href,
                className: "text-sm font-medium py-2 text-foreground hover:text-primary transition-colors",
                onClick: () => setMobileOpen(false),
                children: link.label
              },
              link.label
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: link.href,
                className: "text-sm font-medium py-2 text-foreground hover:text-primary transition-colors",
                onClick: (e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  navigate({ to: link.href });
                },
                children: link.label
              },
              link.label
            )
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "rounded-full border-primary/30 text-primary w-full py-2.5",
                onClick: () => {
                  setMobileOpen(false);
                  handleTeacher();
                },
                "data-ocid": "nav.teacher_button",
                children: "Join as Teacher"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "rounded-full gradient-primary text-white border-0 w-full py-2.5",
                onClick: () => {
                  setMobileOpen(false);
                  handleStudent();
                },
                "data-ocid": "nav.student_button",
                children: "I am a Student"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const BADGES = [
  {
    label: "Ask",
    color: "bg-blue-500/90 text-white",
    delay: "0s",
    position: "-top-3 left-4"
  },
  {
    label: "Get Answers",
    color: "bg-purple-500/90 text-white",
    delay: "0.4s",
    position: "-top-3 right-4"
  },
  {
    label: "Build Confidence",
    color: "bg-indigo-500/90 text-white",
    delay: "0.8s",
    position: "-bottom-3 left-1/2 -translate-x-1/2"
  }
];
function StudentIllustration() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-52 h-52 mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-primary/20 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: "160",
        height: "180",
        viewBox: "0 0 160 180",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-label": "Student asking questions illustration",
        role: "img",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "stu-grad", x1: "0", y1: "0", x2: "1", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#3B82F6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#8B5CF6" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "50",
              y: "95",
              width: "60",
              height: "70",
              rx: "12",
              fill: "url(#stu-grad)",
              opacity: "0.9"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "80", cy: "68", r: "26", fill: "url(#stu-grad)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "72", cy: "67", r: "3.5", fill: "white", opacity: "0.9" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "88", cy: "67", r: "3.5", fill: "white", opacity: "0.9" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M72 76 Q80 82 88 76",
              stroke: "white",
              strokeWidth: "2",
              strokeLinecap: "round",
              fill: "none",
              opacity: "0.9"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "26",
              y: "100",
              width: "28",
              height: "10",
              rx: "5",
              fill: "url(#stu-grad)",
              opacity: "0.7"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "106",
              y: "100",
              width: "28",
              height: "10",
              rx: "5",
              fill: "url(#stu-grad)",
              opacity: "0.7"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "26",
              y: "108",
              width: "28",
              height: "20",
              rx: "4",
              fill: "#6366F1",
              opacity: "0.85"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "33",
              y1: "114",
              x2: "47",
              y2: "114",
              stroke: "white",
              strokeWidth: "1.5",
              opacity: "0.6"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "33",
              y1: "119",
              x2: "47",
              y2: "119",
              stroke: "white",
              strokeWidth: "1.5",
              opacity: "0.6"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "92",
              y: "20",
              width: "56",
              height: "34",
              rx: "10",
              fill: "white",
              opacity: "0.95"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "100,54 110,54 104,62", fill: "white", opacity: "0.95" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: "120",
              y: "34",
              textAnchor: "middle",
              fontSize: "9",
              fill: "#6366F1",
              fontWeight: "700",
              children: "How?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: "120",
              y: "46",
              textAnchor: "middle",
              fontSize: "9",
              fill: "#8B5CF6",
              fontWeight: "600",
              children: "Why?"
            }
          )
        ]
      }
    ) }),
    BADGES.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `absolute ${badge.position} badge-float`,
        style: { animationDelay: badge.delay },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `${badge.color} text-xs font-semibold px-3 py-1.5 rounded-full warm-shadow-lg backdrop-blur-sm whitespace-nowrap`,
            children: badge.label
          }
        )
      },
      badge.label
    ))
  ] });
}
const ABOUT_CARDS = [
  {
    icon: TriangleAlert,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    title: "The Problem",
    bullets: [
      "Students fear asking doubts in class",
      "Questions go unanswered, confidence drops"
    ],
    border: "border-orange-100/60"
  },
  {
    icon: Shield,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Our Solution",
    bullets: [
      "Ask anonymously — no fear, no judgment",
      "Safe, supportive learning environment"
    ],
    border: "border-green-100/60"
  },
  {
    icon: Sparkles,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "AskSpark Platform",
    bullets: [
      "AI + real teachers always available",
      "Fast, reliable answers 24/7"
    ],
    border: "border-purple-100/60"
  }
];
const FEATURE_CARDS = [
  {
    icon: MessageCircle,
    iconBg: "bg-blue-500",
    title: "Ask Any Question",
    desc: "No question is too small. Ask anonymously or with your name — get answers fast."
  },
  {
    icon: Users,
    iconBg: "bg-purple-500",
    title: "Learn Together",
    desc: "Join a community of students. Share knowledge, solve problems together."
  },
  {
    icon: TrendingUp,
    iconBg: "bg-indigo-500",
    title: "Track Your Progress",
    desc: "Watch your confidence score and XP grow with every question answered."
  },
  {
    icon: Star,
    iconBg: "gradient-primary",
    title: "Build Confidence",
    desc: "From nervous to confident — AskSpark turns doubts into your biggest strengths."
  }
];
const HOW_STEPS = [
  {
    icon: LogIn,
    title: "Sign In or Stay Anonymous",
    subtitle: "Your choice — no pressure"
  },
  {
    icon: Send,
    title: "Submit Your Doubt",
    subtitle: "Text or image — any format"
  },
  {
    icon: Zap,
    title: "AI Processes & Organizes",
    subtitle: "Smart categorization instantly"
  },
  {
    icon: GraduationCap,
    title: "Teacher Answers",
    subtitle: "Text or video explanation"
  },
  {
    icon: Trophy,
    title: "Gain Confidence",
    subtitle: "XP points + confidence score"
  }
];
function LandingPage() {
  const navigate = useNavigate();
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const { data: profile } = useUserProfile();
  const [ctaLoading, setCtaLoading] = reactExports.useState(
    null
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
        String(Date.now() + 15e3)
      );
      void saveUserToFirestore(
        localProfile.userId,
        localProfile.displayName,
        "teacher"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "from-blue-50 via-indigo-50 to-purple-50 bg-gradient-to-br min-h-[calc(100vh-4rem)] flex items-center px-4 sm:px-6 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto w-full py-16 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 bg-white/80 text-primary border border-primary/20 text-sm font-medium px-4 py-1.5 rounded-full warm-shadow mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          "AI-Powered Education Platform"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-tight tracking-tight text-foreground max-w-lg mb-4", children: [
          "Build Real ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Confidence" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed mb-6", children: "From doubt to confidence in simple steps. Ask freely, learn faster, and grow every day." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col sm:flex-row gap-3 mb-2 mt-6",
            "data-ocid": "hero.cta_row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "rounded-xl gradient-primary text-white font-semibold px-6 py-3 shadow-primary border-0 hover:opacity-90 transition-all duration-150 hover:scale-[1.02] w-full sm:w-auto min-w-[160px]",
                  onClick: handleSubmitDoubt,
                  disabled: ctaLoading === "doubt",
                  "data-ocid": "hero.submit_doubt",
                  children: [
                    ctaLoading === "doubt" ? "Loading..." : "Submit a Doubt",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "rounded-xl bg-white border-2 border-primary/30 text-primary hover:bg-primary/5 font-semibold px-6 py-3 transition-all duration-150 hover:scale-[1.02] w-full sm:w-auto min-w-[160px]",
                  onClick: handleJoinAsTeacher,
                  disabled: ctaLoading === "teacher",
                  "data-ocid": "hero.teacher_button",
                  children: ctaLoading === "teacher" ? "Loading..." : "Join as Teacher"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleStudent,
            className: "text-sm text-primary underline underline-offset-2 hover:text-primary/80 transition-colors mt-2 block",
            "data-ocid": "hero.student_link",
            children: "I am a Student →"
          }
        ),
        profile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-primary/15 warm-shadow mt-6",
            "data-ocid": "hero.welcome_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary", children: profile.role === AppRole.teacher ? "T" : "S" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-sm min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Welcome back!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-1 text-xs", children: [
                  "You're signed in as",
                  " ",
                  profile.role === AppRole.teacher ? "a teacher" : "a student",
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "rounded-full gradient-primary text-white border-0 font-semibold flex-shrink-0",
                  onClick: () => navigate({
                    to: profile.role === AppRole.teacher ? "/dashboard/teacher" : "/dashboard/student"
                  }),
                  "data-ocid": "hero.dashboard_button",
                  children: [
                    "Dashboard ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 w-3.5 h-3.5" })
                  ]
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card rounded-2xl p-6 warm-shadow-xl w-full max-w-sm",
          style: {
            backdropFilter: "blur(16px)",
            background: "rgba(255,255,255,0.72)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StudentIllustration, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 px-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Confidence Score" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: "85%" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 rounded-full bg-primary/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700",
                  style: { width: "85%" }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 text-center", children: "Keep asking to grow your score!" })
            ] })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "features", className: "py-20 px-4 sm:px-6 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-sm font-medium px-4 py-1.5 rounded-full mb-4", children: "About the Platform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground max-w-2xl mx-auto", children: [
          "Why ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "AskSpark" }),
          "?"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: ABOUT_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `glass-card rounded-2xl p-6 warm-shadow hover:warm-shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl border ${card.border} cursor-default`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center mb-5`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: `w-6 h-6 ${card.iconColor}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-3", children: card.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: card.bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current opacity-50 mt-2 flex-shrink-0" }),
                  b
                ]
              },
              b
            )) })
          ]
        },
        card.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "features-grid", className: "py-20 px-4 sm:px-6 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-sm font-medium px-4 py-1.5 rounded-full mb-4", children: "Platform Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground max-w-2xl mx-auto", children: [
          "Everything You Need to",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Learn Confidently" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: FEATURE_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card rounded-2xl p-6 warm-shadow hover:warm-shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl border-white/40 cursor-default group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: "w-6 h-6 text-white" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-2", children: card.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: card.desc })
          ]
        },
        card.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "how-it-works", className: "py-20 px-4 sm:px-6 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1.5 bg-accent/20 text-accent-foreground border border-accent/30 text-sm font-medium px-4 py-1.5 rounded-full mb-4", children: "Simple Process" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground max-w-2xl mx-auto", children: [
          "How ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "AskSpark" }),
          " Works"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex items-start justify-between gap-2", children: HOW_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl glass-card warm-shadow flex items-center justify-center border-white/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center", children: i + 1 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm mb-1 leading-tight px-1", children: step.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: step.subtitle })
        ] }),
        i < HOW_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-primary/40" }) })
      ] }, step.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden flex flex-col items-center gap-3", children: HOW_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center w-full max-w-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5 w-full warm-shadow border-white/40 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl glass-card flex items-center justify-center border-white/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2 -right-2 w-5 h-5 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center", children: i + 1 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm", children: step.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: step.subtitle })
              ] })
            ] }),
            i < HOW_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-4 h-4 text-primary/40" }) })
          ]
        },
        step.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden warm-shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/10 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-white/10 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-8 py-14 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl sm:text-4xl font-bold text-white mb-4", children: "Start Your Learning Journey Today" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 mb-8 max-w-md mx-auto text-base", children: "Join thousands of students building real confidence with AskSpark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row flex-wrap justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "rounded-full bg-white text-indigo-700 font-semibold px-8 py-3 hover:bg-white/90 transition-all duration-150 hover:scale-[1.02] border-0 shadow-lg min-w-[160px] w-full sm:w-auto",
              onClick: handleSubmitDoubt,
              "data-ocid": "cta.submit_doubt",
              children: [
                "Submit a Doubt ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              variant: "outline",
              className: "rounded-full border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-3 transition-all duration-150 hover:scale-[1.02] min-w-[160px] w-full sm:w-auto",
              onClick: handleJoinAsTeacher,
              "data-ocid": "cta.teacher_button",
              children: "Join as Teacher"
            }
          )
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-foreground text-primary-foreground py-16 px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto grid md:grid-cols-3 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AskSparkLogo, { variant: "icon", height: 32 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-white", children: "AskSpark" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm leading-relaxed", children: "The AI-powered confidence-building platform for students. Ask freely, learn boldly." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-white/80 mb-4 text-sm uppercase tracking-wider", children: "Platform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["Features", "How It Works", "For Students", "For Teachers"].map(
            (l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-white/50 text-sm hover:text-white/80 cursor-pointer transition-colors",
                children: l
              },
              l
            )
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-white/80 mb-4 text-sm uppercase tracking-wider", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-white/50 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "📧 hello@askspark.app" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5" }),
              " English · हिंदी · తెలుగు"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-white/40 text-sm", children: [
        "© ",
        year,
        " AskSpark · Team Spark. Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            target: "_blank",
            rel: "noreferrer",
            className: "underline hover:text-white/70 transition-colors",
            children: "caffeine.ai"
          }
        )
      ] })
    ] })
  ] });
}
export {
  LandingPage as default
};
