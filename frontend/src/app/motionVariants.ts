/**
 * Общие варианты анимаций Motion для главной и страницы контактов.
 * Длительность появления: 0.3–0.5 с, hover: scale 1.05, мягкая тень.
 */

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export const fadeSlideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  inView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

export const viewportOnce = { once: true, amount: 0.2 };

export const hoverScale = {
  whileHover: { scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)" },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 },
};

export const hoverScaleCrimson = {
  whileHover: {
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(220, 20, 60, 0.25)",
  },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 },
};

export const staggerContainer = {
  initial: {},
  inView: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  inView: { opacity: 1, y: 0 },
};
