"use client";

import { useState, useEffect } from "react";
import logo from "@/app/icon.svg";
import { useRouter } from "@ademattos/bunbox/client";

const navLinks = [
  { path: "/", label: "Home" },
  { id: "timeline", label: "Timeline" },
  { path: "/blog", label: "Blog" },
  { path: "/tools", label: "Tools" },
  { id: "contact", label: "Contact" },
];

const smoothScroll = (top: number) => {
  window.scrollTo({ top, behavior: "smooth" });
};

type NavLink = (typeof navLinks)[0];

interface NavItemProps {
  link: NavLink;
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => void;
}

const NavItem = ({ link, active, onClick }: NavItemProps) => (
  <a
    href={link.id ? `#${link.id}` : link.path!}
    onClick={(e) => onClick(e, link)}
    className="group relative text-xs px-2.5 py-1.5 sm:text-sm sm:px-4 sm:py-2 md:text-base md:px-5 rounded-full font-medium cursor-pointer flex items-center justify-center overflow-hidden"
  >
    {/* Active state background */}
    {active && (
      <span className="absolute inset-0 bg-foreground rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.4)]" />
    )}

    {/* Hover effect for inactive items */}
    {!active && (
      <span className="absolute inset-0 rounded-full bg-foreground/5 dark:bg-foreground/8 opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100" />
    )}

    {/* Text content */}
    <span
      className={`relative z-10 transition-all duration-200 group-hover:scale-105 group-active:scale-95 ${
        active
          ? "text-background"
          : "text-foreground/70 group-hover:text-foreground/95"
      }`}
    >
      {link.label}
    </span>
  </a>
);

export default function Header() {
  const [activeTab, setActiveTab] = useState<string>("/");
  const [isToolsPage, setIsToolsPage] = useState(false);
  const { navigate } = useRouter();

  useEffect(() => {
    if (location.pathname === "/") {
      const hash = window.location.hash.slice(1);
      setActiveTab(hash === "timeline" || hash === "contact" ? hash : "/");
    } else {
      setActiveTab(location.pathname);
    }
    // Check if we're on a tools page (not the tools listing page)
    setIsToolsPage(location.pathname.startsWith("/tools/"));
  }, [location.pathname]);

  // Hide header on tools pages
  if (isToolsPage) {
    return null;
  }

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: NavLink
  ) => {
    e.preventDefault();
    const target = link.id || link.path!;
    setActiveTab(target);

    if (location.pathname !== "/") {
      // If we're on a different page and clicking a hash link, navigate to home first
      if (link.id) {
        navigate(`/#${link.id}`);
      } else if (link.path) {
        navigate(link.path);
      }
      return;
    }

    if (link.id) {
      const element = document.getElementById(link.id);
      if (element) {
        // Account for mobile (56px) vs desktop (64px) header height
        const headerOffset = window.innerWidth < 640 ? 56 : 64;
        smoothScroll(
          element.getBoundingClientRect().top +
            window.pageYOffset -
            headerOffset
        );
        window.history.pushState(null, "", `#${link.id}`);
      }
    } else if (link.path === "/") {
      smoothScroll(0);
      window.history.pushState(null, "", "/");
    } else if (link.path) {
      navigate(link.path);
    }
  };

  return (
    <header className="h-14 sm:h-16 fixed top-0 left-0 right-0 z-50">
      <div className="h-14 sm:h-16 bg-background/70 backdrop-blur-md w-full border-b border-border px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div>
            <a
              href="/"
              className="flex items-center gap-2 cursor-pointer group"
            >
              <img src={logo} alt="Anthony DeMattos" className="w-6 h-6" />
              <h1 className="text-base sm:text-lg md:text-xl font-normal transition-transform duration-200 ease-out hover:scale-[1.02]">
                <span className="hidden sm:inline">Anthony DeMattos</span>
                <span className="inline sm:hidden">A. DeMattos</span>
              </h1>
            </a>
          </div>

          <nav className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
            {navLinks.map((link) => {
              const key = link.id || link.path!;
              return (
                <NavItem
                  key={key}
                  link={link}
                  active={activeTab === key}
                  onClick={handleClick}
                />
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
