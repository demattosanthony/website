import { Variants } from "framer-motion";

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export const profilePicAnimation = {
  initial: { opacity: 0, x: -100, y: -100, rotate: -180 },
  animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export const createDelayedFadeInUp = (delay: number) => ({
  ...fadeInUp,
  transition: { ...fadeInUp.transition, delay },
});
