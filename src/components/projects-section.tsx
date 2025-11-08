import { motion } from "framer-motion";
import { createDelayedFadeInUp } from "@/lib/animation-variants";
import parkingLotGif from "@/assets/projects/open-spot/pkLot.gif";
import demofiIcon from "@/assets/projects/demofi/icon.svg";
import { Button } from "@/components/ui/button";

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-16 sm:py-24 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Project 1: Open Spot Parking */}
        <motion.div
          className="relative rounded-3xl shadow-md border overflow-hidden bg-linear-to-br from-gray-50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/30"
          {...createDelayedFadeInUp(0.2)}
        >
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 p-6 sm:p-8 lg:p-10">
            {/* Left: Content */}
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl font-semibold text-foreground mb-3 tracking-tight leading-tight">
                Open Spot Parking
              </h3>

              <p className="text-base sm:text-lg text-muted-foreground mb-2 leading-relaxed">
                Computer vision that detects vacant parking spots in real-time.
              </p>

              {/* Tech Stack */}
              <p className="text-xs sm:text-sm text-muted-foreground/60 mb-6">
                Computer Vision · PyTorch · Mobile
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
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
                  className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="flex items-center justify-center">
              <div className="relative w-full">
                <div className="relative rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10">
                  <img
                    src={parkingLotGif}
                    alt="Open Spot Parking detection"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project 2: DeMattos Finance - Centered Layout */}
        <motion.div
          className="relative rounded-3xl overflow-hidden bg-card shadow-md border"
          {...createDelayedFadeInUp(0.4)}
        >
          <div className="flex flex-col items-center text-center p-8 sm:p-10 lg:p-12 max-w-2xl mx-auto">
            {/* Logo */}
            <div className="mb-6">
              <img
                src={demofiIcon}
                alt="DeMattos Finance"
                className="w-24 h-24 sm:w-28 sm:h-28"
              />
            </div>

            {/* Title */}
            <h3 className="text-3xl sm:text-4xl font-semibold text-foreground mb-3 tracking-tight leading-tight">
              DeMattos Finance
            </h3>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground mb-2 leading-relaxed">
              The best place to consume financial content.
            </p>

            {/* Tech Stack */}
            <p className="text-xs sm:text-sm text-muted-foreground/60 mb-6">
              Financial APIs · AI Agents · Research Tools
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant="default"
                size="lg"
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Visit Site
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
