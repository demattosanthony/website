import { motion } from "framer-motion";
import { createDelayedFadeInUp } from "@/lib/animation-variants";
import parkingLotGif from "@/assets/projects/open-spot/pkLot.gif";
import demofiMobileLight from "@/assets/projects/demofi/mobile-preview-light.svg";
import demofiMobileDark from "@/assets/projects/demofi/mobile-preview-dark.svg";
import demofiIcon from "@/assets/projects/demofi/icon.svg";
import syyclopsLogo from "@/assets/logos/syyclops.png";
import syyclopsBuilding from "@/assets/projects/syyclops/building.svg";
import { Button } from "components/ui/button";

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {/* Project 1: Syyclops */}
        <motion.div
          className="relative grid lg:grid-cols-2 gap-8 lg:gap-0 min-h-[600px]"
          {...createDelayedFadeInUp(0.6)}
        >
          {/* Left: Content */}
          <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
            {/* Logo */}
            <div className="mb-6">
              <img
                src={syyclopsLogo}
                alt="Syyclops Logo"
                className="w-20 h-20 sm:w-24 sm:h-24"
              />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              Syyclops
            </h2>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-6 leading-relaxed">
              A digital twin platform designed to improve building operations
              and maintenance.
            </p>

            {/* Tech Stack */}
            <p className="text-sm sm:text-base text-muted-foreground/70 mb-8">
              Digital Twin • Building Operations • IoT
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  View Demo
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-base"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative flex items-center justify-center px-6 sm:px-12 py-12 overflow-visible">
            <div className="relative w-full scale-125">
              <img
                src={syyclopsBuilding}
                alt="Syyclops Building"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Project 2: DeMattos Finance */}
        <motion.div
          className="relative grid lg:grid-cols-2 gap-8 lg:gap-0 min-h-[600px]"
          {...createDelayedFadeInUp(0.2)}
        >
          {/* Left: Content */}
          <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
            {/* Logo */}
            <div className="mb-6">
              <img
                src={demofiIcon}
                alt="DeMattos Finance Logo"
                className="w-20 h-20 sm:w-24 sm:h-24"
              />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              DeMattos Finance
            </h2>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-6 leading-relaxed">
              The best place to consume financial content.
            </p>

            {/* Tech Stack */}
            <p className="text-sm sm:text-base text-muted-foreground/70 mb-8">
              Financial APIs • AI Agents • Research Tools
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  View Demo
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-base"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right: Mobile Mockup */}
          <div className="relative flex items-center justify-center px-6 sm:px-12 py-12">
            <div className="relative w-full max-w-sm">
              {/* Light mode mockup */}
              <img
                src={demofiMobileLight}
                alt="DeMattos Finance Mobile App"
                className="w-full h-auto dark:hidden"
              />
              {/* Dark mode mockup */}
              <img
                src={demofiMobileDark}
                alt="DeMattos Finance Mobile App"
                className="w-full h-auto hidden dark:block"
              />
            </div>
          </div>
        </motion.div>

        {/* Project 3: Open Spot Parking */}
        <motion.div
          className="relative grid lg:grid-cols-2 gap-8 lg:gap-0 min-h-[600px]"
          {...createDelayedFadeInUp(0.4)}
        >
          {/* Left: Content */}
          <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              Open Spot Parking
            </h2>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-6 leading-relaxed">
              Computer vision that detects vacant parking spots in real-time.
            </p>

            {/* Tech Stack */}
            <p className="text-sm sm:text-base text-muted-foreground/70 mb-8">
              Computer Vision • PyTorch • Mobile
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base"
                asChild
              >
                <a
                  href="https://github.com/demattosanthony/carNocar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-base"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative flex items-center justify-center px-6 sm:px-12 py-12">
            <div className="relative w-full max-w-2xl">
              <img
                src={parkingLotGif}
                alt="Open Spot Parking detection"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
