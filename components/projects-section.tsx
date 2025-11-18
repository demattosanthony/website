import { motion } from "framer-motion";
import { createDelayedFadeInUp } from "@/lib/animation-variants";
import { Button } from "components/ui/button";
import { projects } from "@/lib/projects-data";
import { useRouter } from "@ademattos/bunbox/client";

export default function ProjectsSection() {
  const { navigate } = useRouter();

  return (
    <section id="projects" className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {projects.map((project) => {
          const isMobileMockup = project.visual.type === "mobile-mockup";
          const visualContainerClass = project.visual.containerClassName || "";

          // Determine visual container alignment based on project
          const visualAlignmentClass =
            project.id === "syyclops"
              ? "justify-center px-6 sm:px-12 py-12 overflow-visible"
              : "justify-end pl-6 sm:pl-12 pr-0 sm:pr-0 py-12";

          return (
            <motion.div
              key={project.id}
              className="relative grid lg:grid-cols-2 gap-8 lg:gap-0 min-h-[600px]"
              {...createDelayedFadeInUp(project.animationDelay)}
            >
              {/* Left: Content */}
              <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
                {/* Logo */}
                {project.logo && (
                  <div className="mb-6">
                    <img
                      src={project.logo}
                      alt={project.logoAlt || `${project.title} Logo`}
                      className="w-20 h-20 sm:w-24 sm:h-24"
                    />
                  </div>
                )}

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
                  {project.title}
                </h2>

                <p className="text-xl sm:text-2xl text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <p className="text-sm sm:text-base text-muted-foreground/70 mb-8">
                  {project.techStack}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  {project.actions.map((action, index) => {
                    const isPrimary = action.variant === "default";
                    const buttonClass = isPrimary
                      ? "rounded-md bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base"
                      : "rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-base";

                    // Handle external links
                    if (action.href && !action.href.startsWith("/")) {
                      return (
                        <Button
                          key={index}
                          size="lg"
                          className={buttonClass}
                          asChild
                        >
                          <a
                            href={action.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {action.label}
                          </a>
                        </Button>
                      );
                    }

                    // Handle "Learn More" button - navigate to project page
                    if (action.label === "Learn More" && !action.href) {
                      return (
                        <Button
                          key={index}
                          variant={action.variant || "outline"}
                          size="lg"
                          className={buttonClass}
                          onClick={() => navigate(`/projects/${project.id}`)}
                        >
                          {action.label}
                        </Button>
                      );
                    }

                    // Handle internal links
                    if (action.href && action.href.startsWith("/")) {
                      return (
                        <Button
                          key={index}
                          size="lg"
                          className={buttonClass}
                          onClick={() => navigate(action.href!)}
                        >
                          {action.label}
                        </Button>
                      );
                    }

                    // Default button (no action)
                    return (
                      <Button
                        key={index}
                        variant={action.variant || "outline"}
                        size="lg"
                        className={buttonClass}
                      >
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Visual */}
              <div
                className={`relative flex items-center ${visualAlignmentClass}`}
              >
                <div className={visualContainerClass}>
                  {isMobileMockup ? (
                    <>
                      {/* Light mode mockup */}
                      <img
                        src={project.visual.src}
                        alt={project.visual.alt}
                        className="w-full h-auto dark:hidden"
                      />
                      {/* Dark mode mockup */}
                      {project.visual.srcDark && (
                        <img
                          src={project.visual.srcDark}
                          alt={project.visual.alt}
                          className="w-full h-auto hidden dark:block"
                        />
                      )}
                    </>
                  ) : (
                    <img
                      src={project.visual.src}
                      alt={project.visual.alt}
                      className={`w-full h-auto ${
                        project.visual.className || "rounded-lg"
                      }`}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
