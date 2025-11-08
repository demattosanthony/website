import { motion } from "framer-motion";
import { createDelayedFadeInUp } from "@/lib/animation-variants";
import profilePic from "@/assets/profile-pic.png";

export default function HeroSection() {
  return (
    <div
      id="about"
      className="relative sm:min-h-[65vh] flex flex-col items-center justify-start pt-[12vh] sm:pt-[14vh]"
    >
      {/* Profile Picture */}
      <motion.div className="mb-6 sm:mb-8" {...createDelayedFadeInUp(0)}>
        <div className="w-[270px] h-[270px] rounded-full overflow-hidden bg-linear-to-br from-green-400 via-green-500 to-emerald-500 p-[5px] shadow-xl">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-background bg-background">
            <img
              src={profilePic}
              alt="Anthony's profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Greeting */}
      <motion.h2
        className="text-2xl sm:text-3xl font-normal mb-6 sm:mb-8 text-foreground/70"
        {...createDelayedFadeInUp(0.3)}
      >
        Hi I'm Anthony 👋
      </motion.h2>

      {/* Main Headline */}
      <motion.h1
        className="text-3xl sm:text-5xl font-semibold text-center mb-6 sm:mb-12 max-w-3xl leading-[1.1] px-4"
        {...createDelayedFadeInUp(0.5)}
      >
        I build software systems and applications
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-base sm:text-lg md:text-xl lg:text-2xl text-center text-foreground/60 max-w-5xl leading-relaxed px-4 font-light"
        {...createDelayedFadeInUp(0.7)}
      >
        CTO based in DC currently leading{" "}
        <span className="font-semibold text-foreground">Syyclops</span>,
        building the future of smart buildings. I create innovative solutions
        that bridge the physical and digital worlds.
      </motion.p>
    </div>
  );
}
