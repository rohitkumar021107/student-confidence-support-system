import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { loadLocalProfile } from "../hooks/useLocalProfile";
import AskSparkLogo from "./AskSparkLogo";
import NotificationBell from "./NotificationBell";

const NAV_LINKS = [
  { href: "/#features", label: "Features", isAnchor: true },
  { href: "/#how-it-works", label: "How It Works", isAnchor: true },
  { href: "/#team", label: "Team", isAnchor: true },
  { href: "/learning", label: "Learning", isAnchor: false },
  { href: "/blog", label: "Blog", isAnchor: false },
  { href: "/help", label: "Help Center", isAnchor: false },
  { href: "/chat", label: "Community", isAnchor: false },
];

export default function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 glass-nav transition-all duration-300 ${
        scrolled ? "warm-shadow" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center" data-ocid="nav.link">
          {/* Desktop: horizontal logo */}
          <AskSparkLogo
            variant="horizontal"
            height={38}
            className="hidden md:block"
          />
          {/* Mobile: icon only */}
          <AskSparkLogo variant="icon" height={36} className="md:hidden" />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((link) =>
            link.isAnchor ? (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-indigo-600 transition-colors duration-150"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="hover:text-indigo-600 transition-colors duration-150"
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {loadLocalProfile() && <NotificationBell />}
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-primary/30 text-primary hover:bg-primary/5 font-medium min-w-[120px] px-5 py-2.5 transition-all duration-150 hover:scale-[1.02]"
            onClick={() => navigate({ to: "/onboarding" })}
            data-ocid="header.secondary_button"
          >
            I&apos;m a Student
          </Button>
          <Button
            size="sm"
            className="rounded-full gradient-primary text-white hover:opacity-90 font-medium px-5 py-2.5 shadow-primary border-0 min-w-[120px] transition-all duration-150 hover:scale-[1.02]"
            onClick={() => navigate({ to: "/onboarding" })}
            data-ocid="header.primary_button"
          >
            I&apos;m a Teacher
          </Button>
          <div
            className="flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 shadow-md shadow-blue-500/30 transition-transform duration-150 hover:scale-105"
            data-ocid="header.brand_icon"
          >
            <AskSparkLogo variant="icon" height={28} />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <div
            className="flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-md shadow-blue-500/30"
            data-ocid="header.brand_icon_mobile"
          >
            <AskSparkLogo variant="icon" height={26} />
          </div>
          <button
            type="button"
            className="p-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="header.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-card border-t border-white/30 px-4 py-4 flex flex-col gap-3 animate-fade-in">
          {NAV_LINKS.map((link) =>
            link.isAnchor ? (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ),
          )}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            {loadLocalProfile() && (
              <div className="flex justify-center">
                <NotificationBell />
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/30 text-primary w-full py-2.5"
              onClick={() => {
                navigate({ to: "/onboarding" });
                setMobileOpen(false);
              }}
              data-ocid="header.secondary_button"
            >
              I&apos;m a Student
            </Button>
            <Button
              size="sm"
              className="rounded-full gradient-primary text-white border-0 w-full py-2.5"
              onClick={() => {
                navigate({ to: "/onboarding" });
                setMobileOpen(false);
              }}
              data-ocid="header.primary_button"
            >
              I&apos;m a Teacher
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
