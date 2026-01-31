import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function FloatingCross() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Don't render until we have window dimensions
  if (windowSize.width === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Decorative crosses */}
      <motion.div
        className="absolute top-20 left-1/4"
        animate={{
          x: (mousePosition.x - windowSize.width / 2) * 0.013,
          y: (mousePosition.y - windowSize.height / 2) * 0.013,
          rotate: mousePosition.x * 0.033,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
        }}
      >
        <div className="relative w-12 h-12 opacity-10">
          <div className="absolute left-1/2 top-0 w-1.5 h-12 bg-[#DC143C] transform -translate-x-1/2 rounded-full" />
          <div className="absolute top-1/3 left-[6.5px] right-[6.5px] h-1.5 bg-[#DC143C] transform -translate-y-1/2 rounded-full" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-1/4"
        animate={{
          x: (mousePosition.x - windowSize.width / 2) * -0.0195,
          y: (mousePosition.y - windowSize.height / 2) * -0.0195,
          rotate: -mousePosition.x * 0.0195,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 120,
        }}
      >
        <div className="relative w-16 h-16 opacity-10">
          <div className="absolute left-1/2 top-0 w-2 h-16 bg-[#DC143C] transform -translate-x-1/2 rounded-full" />
          <div className="absolute top-1/3 left-[6.5px] right-[6.5px] h-2 bg-[#DC143C] transform -translate-y-1/2 rounded-full" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-20"
        animate={{
          x: (mousePosition.x - windowSize.width / 2) * 0.01,
          y: (mousePosition.y - windowSize.height / 2) * 0.01,
          rotate: mousePosition.y * 0.013,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 150,
        }}
      >
        <div className="relative w-10 h-10 opacity-10">
          <div className="absolute left-1/2 top-0 w-1.5 h-10 bg-[#FF1744] transform -translate-x-1/2 rounded-full" />
          <div className="absolute top-1/3 left-[6.5px] right-[6.5px] h-1.5 bg-[#FF1744] transform -translate-y-1/2 rounded-full" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/3"
        animate={{
          x: (mousePosition.x - windowSize.width / 2) * -0.016,
          y: (mousePosition.y - windowSize.height / 2) * -0.016,
          rotate: -mousePosition.y * 0.026,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
        }}
      >
        <div className="relative w-14 h-14 opacity-10">
          <div className="absolute left-1/2 top-0 w-1.5 h-14 bg-[#DC143C] transform -translate-x-1/2 rounded-full" />
          <div className="absolute top-1/3 left-[6.5px] right-[6.5px] h-1.5 bg-[#DC143C] transform -translate-y-1/2 rounded-full" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/3 left-1/2"
        animate={{
          x: (mousePosition.x - windowSize.width / 2) * 0.012,
          y: (mousePosition.y - windowSize.height / 2) * 0.012,
          rotate: mousePosition.x * -0.016,
        }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 110,
        }}
      >
        <div className="relative w-16 h-16 opacity-10">
          <div className="absolute left-1/2 top-0 w-2 h-16 bg-[#DC143C] transform -translate-x-1/2 rounded-full" />
          <div className="absolute top-1/3 left-[6.5px] right-[6.5px] h-2 bg-[#DC143C] transform -translate-y-1/2 rounded-full" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/3"
        animate={{
          x: (mousePosition.x - windowSize.width / 2) * -0.014,
          y: (mousePosition.y - windowSize.height / 2) * -0.014,
          rotate: -mousePosition.y * 0.023,
        }}
        transition={{
          type: "spring",
          damping: 18,
          stiffness: 90,
        }}
      >
        <div className="relative w-12 h-12 opacity-10">
          <div className="absolute left-1/2 top-0 w-1.5 h-12 bg-[#FF1744] transform -translate-x-1/2 rounded-full" />
          <div className="absolute top-1/3 left-[6.5px] right-[6.5px] h-1.5 bg-[#FF1744] transform -translate-y-1/2 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}