import { getBlogPostById } from "@/lib/blog-data";
import { MarkdownViewer } from "components/ui/markdown";
import { ArrowLeft } from "lucide-react";
import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { Badge } from "components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { useRouter, useParams } from "@ademattos/bunbox/client";

export default function BlogPostPage() {
  const { navigate } = useRouter();
  const { blogId } = useParams();

  const blogPost = blogId ? getBlogPostById(blogId) : undefined;

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-28 max-w-4xl">
          <Card className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist.
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

  return (
    <div className="h-full bg-background pt-12">
      {/* Hero Section */}
      <div className="border-b border-border max-w-5xl mx-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-16">
          {/* Date and Category */}
          <div className="flex items-center justify-center gap-4 mb-8 text-sm">
            <time dateTime={blogPost.date} className="text-muted-foreground">
              {formatDate(blogPost.date)}
            </time>
            {blogPost.category && (
              <>
                <span className="text-muted-foreground">•</span>
                <Badge variant="secondary" className="text-sm">
                  {blogPost.category}
                </Badge>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 leading-tight tracking-tight">
            {blogPost.title}
          </h1>

          {/* Description */}
          {blogPost.description && (
            <p className="text-lg md:text-xl text-center text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {blogPost.description}
            </p>
          )}

          {/* Cover Image */}
          {blogPost.coverImage && (
            <div className="mt-12">
              <img
                src={blogPost.coverImage}
                alt={`${blogPost.title} cover`}
                className="w-full rounded-lg shadow-lg border border-border max-h-128 object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-12 md:py-16">
        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <MarkdownViewer content={blogPost.content} />
        </article>

        {/* Images */}
        {blogPost.images && blogPost.images.length > 0 && (
          <div className="mt-12">
            <div
              className={`grid gap-4 ${
                blogPost.images.length === 1
                  ? "grid-cols-1"
                  : blogPost.images.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-2 md:grid-cols-3"
              }`}
            >
              {blogPost.images.map((image, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <img
                        src={image}
                        alt={`${blogPost.title} - Image ${index + 1}`}
                        className="w-full h-48 md:h-64 object-cover"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw]! max-h-[95vh] w-auto h-auto p-0 overflow-hidden border-none bg-black/95">
                    <DialogTitle className="sr-only">
                      {blogPost.title} - Image {index + 1}
                    </DialogTitle>
                    <img
                      src={image}
                      alt={`${blogPost.title} - Image ${index + 1}`}
                      className="w-auto h-auto max-w-[95vw] max-h-[95vh] object-contain"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-16 pt-8 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
