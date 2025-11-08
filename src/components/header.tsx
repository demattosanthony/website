import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import logo from "../logo.svg";

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

const NavItem = ({ link, active, onClick }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <Link
        to={link.id ? `#${link.id}` : link.path!}
        onClick={(e) => onClick(e, link)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative text-xs px-2.5 py-1.5 sm:text-sm sm:px-4 sm:py-2 md:text-base md:px-5 rounded-full font-medium cursor-pointer flex items-center justify-center overflow-hidden"
      >
        {/* Active state background with shadow */}
        <AnimatePresence>
          {active && (
            <>
              <motion.span
                layoutId="activeTab"
                className="absolute inset-0 bg-foreground rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.4)]"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
              {/* Subtle inner glow for active state */}
              <motion.span
                className="absolute inset-0 rounded-full opacity-40"
                style={{
                  background:
                    "radial-gradient(80% 80% at 50% 0%, rgba(255,255,255,0.25), rgba(255,255,255,0) 70%)",
                  mixBlendMode: "overlay",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Hover effect for inactive items */}
        {!active && (
          <motion.span
            className="absolute inset-0 rounded-full bg-foreground/5 dark:bg-foreground/8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.95,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        )}

        {/* Subtle border highlight on hover */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && !active ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Text content */}
        <motion.span
          className={`relative z-10 ${
            active ? "text-background" : "text-foreground/70"
          }`}
          animate={{
            opacity: active ? 1 : isHovered ? 0.95 : 0.7,
            y: isHovered ? -0.5 : 0,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            opacity: { duration: 0.2 },
            y: { duration: 0.2, ease: "easeOut" },
            scale: { type: "spring", stiffness: 400, damping: 17 },
          }}
        >
          {link.label}
        </motion.span>

        {/* Ambient glow for active state */}
        {active && (
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(100% 100% at 50% 100%, rgba(255,255,255,0.15), rgba(255,255,255,0) 60%)",
              filter: "blur(8px)",
            }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        )}
      </Link>
    </div>
  );
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("/");

  useEffect(() => {
    if (location.pathname === "/") {
      const hash = window.location.hash.slice(1);
      setActiveTab(hash === "timeline" || hash === "contact" ? hash : "/");
    } else {
      setActiveTab(location.pathname);
    }
  }, [location.pathname]);

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
            <Link
              to="/"
              className="flex items-center gap-2 cursor-pointer group"
            >
              <img src={logo} alt="Anthony DeMattos" className="w-6 h-6" />
              <motion.h1
                className="text-base sm:text-lg md:text-xl font-normal"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="hidden sm:inline">Anthony DeMattos</span>
                <span className="inline sm:hidden">A. DeMattos</span>
              </motion.h1>
            </Link>
          </div>

          <nav className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
            {navLinks.map((link) => (
              <NavItem
                key={link.id || link.path}
                link={link}
                active={activeTab === (link.id || link.path)}
                onClick={handleClick}
              />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
