import { getProjectById } from "@/lib/projects-data";
import { ArrowLeft } from "lucide-react";
import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { useRouter, useParams } from "@ademattos/bunbox/client";

export default function ProjectPage() {
  const { navigate } = useRouter();
  const { projectId } = useParams();

  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-28 max-w-4xl">
          <Card className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Format date as "Month Day, Year"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format date as short "Month Day" for badge
  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Sort timeline by date (newest first)
  const sortedTimeline = project.timeline
    ? [...project.timeline].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];

  // Helper function to render text with URLs and newlines
  const renderTextWithLinks = (text: string) => {
    // URL regex pattern
    const urlPattern = /(https?:\/\/[^\s]+)/g;

    // Split by newlines first
    const lines = text.split("\n");

    return lines.map((line, lineIndex) => {
      const parts = line.split(urlPattern);

      return (
        <p key={lineIndex}>
          {parts.map((part, partIndex) => {
            // Check if this part is a URL
            if (urlPattern.test(part)) {
              return (
                <a
                  key={partIndex}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  {part}
                </a>
              );
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-transparent pt-24">
      {/* Header */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-20 text-center">
          {/* Logo */}
          {project.logo && (
            <div className="flex justify-center mb-8">
              <img
                src={project.logo}
                alt={project.logoAlt || `${project.title} Logo`}
                className="w-24 h-24 sm:w-32 sm:h-32"
              />
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech Stack */}
          <p className="text-sm text-muted-foreground/70">
            {project.techStack}
          </p>
        </div>

        {/* Timeline Entries */}
        {sortedTimeline.length > 0 && (
          <div className="space-y-32">
            {sortedTimeline.map((milestone, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-6 sm:gap-12"
              >
                {/* Date Badge - Left Column on larger screens, inline on mobile */}
                <div className="shrink-0 sm:w-32">
                  <div className="sm:sticky sm:top-24 transition-all duration-300 ease-out">
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300">
                      <span className="text-sm font-medium text-foreground">
                        {formatDateShort(milestone.date)}
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground transition-opacity duration-300">
                      {formatDate(milestone.date)}
                    </div>
                  </div>
                </div>

                {/* Content - Right Column */}
                <div className="flex-1 max-w-3xl">
                  <h2 className="text-3xl sm:text-5xl font-semibold text-foreground mb-8 sm:mb-16 leading-tight tracking-tight">
                    {milestone.title}
                  </h2>

                  <div className="space-y-12 sm:space-y-16">
                    {milestone.content.map((block, blockIndex) => (
                      <div key={blockIndex}>
                        {block.type === "text" && block.content && (
                          <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                            {renderTextWithLinks(block.content)}
                          </div>
                        )}

                        {block.type === "image" && block.image && (
                          <div className="mt-6 sm:mt-8 rounded-xl sm:rounded-2xl overflow-hidden border border-border/30 bg-card/20 backdrop-blur-sm shadow-2xl">
                            <Dialog>
                              <DialogTrigger asChild>
                                <div className="cursor-pointer">
                                  <img
                                    src={block.image}
                                    alt={block.imageAlt || milestone.title}
                                    className="w-full h-auto max-h-[500px] object-contain"
                                  />
                                </div>
                              </DialogTrigger>
                              <DialogContent className="max-w-[95vw]! max-h-[95vh] w-auto h-auto p-0 overflow-hidden border-none bg-black/95">
                                <DialogTitle className="sr-only">
                                  {milestone.title}
                                </DialogTitle>
                                <img
                                  src={block.image}
                                  alt={block.imageAlt || milestone.title}
                                  className="w-auto h-auto max-w-[95vw] max-h-[95vh] object-contain"
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-32 pt-8 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Bottom Spacing */}
        <div className="h-32" />
      </div>
    </div>
  );
}
