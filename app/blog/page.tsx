import { useState, useMemo } from "react";
import { blogPosts } from "@/lib/blog-data";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { ChevronDown, Grid3x3, List } from "lucide-react";

type ViewMode = "list" | "grid";
type SortOption = "newest" | "oldest";

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Get unique categories from blog posts
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(blogPosts.map((post) => post.category).filter(Boolean))
    );
    return ["All", ...cats];
  }, []);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = [...blogPosts];

    // Filter by category
    if (activeFilter !== "All") {
      posts = posts.filter((post) => post.category === activeFilter);
    }

    // Sort by date
    posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return posts;
  }, [activeFilter, sortBy]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1
          className="text-4xl sm:text-5xl font-normal tracking-tight mb-8 opacity-0 animate-slideLeft"
          style={{ animationDelay: "0s" }}
        >
          My Blog
        </h1>

        {/* Filters and Controls */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-border/40 opacity-0 animate-clipReveal"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category || "All")}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeFilter === category
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-background border border-border/50 rounded-lg px-4 py-2 pr-10 text-sm font-medium cursor-pointer hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 border border-border/50 rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setViewMode("grid")}
                className={`${
                  viewMode === "grid"
                    ? "bg-accent"
                    : "hover:bg-transparent text-foreground/60"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setViewMode("list")}
                className={`${
                  viewMode === "list"
                    ? "bg-accent"
                    : "hover:bg-transparent text-foreground/60"
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className={viewMode === "list" ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="opacity-0 animate-scaleIn"
              style={{ animationDelay: `${0.15 + index * 0.05}s` }}
            >
              <a
                href={`/blog/${post.id}`}
                className={`group block transition-colors duration-200 ${
                  viewMode === "list"
                    ? "hover:bg-accent/30 -mx-4 px-4 py-6 rounded-lg"
                    : "h-full hover:bg-accent/30 p-6 rounded-lg border border-border/40"
                }`}
              >
                {viewMode === "list" ? (
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="shrink-0 sm:w-32">
                      <Badge variant="outline" className="mb-2 text-xs font-medium">
                        {post.category}
                      </Badge>
                      <p className="text-sm text-foreground/60">{formatDate(post.date)}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-medium mb-2 group-hover:text-foreground/80 transition-colors">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="text-foreground/70 leading-relaxed">{post.description}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <Badge variant="outline" className="mb-3 text-xs font-medium">
                      {post.category}
                    </Badge>
                    <h2 className="text-xl font-medium mb-2 group-hover:text-foreground/80 transition-colors">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-foreground/70 leading-relaxed text-sm mb-4">
                        {post.description}
                      </p>
                    )}
                    <p className="text-sm text-foreground/60">{formatDate(post.date)}</p>
                  </>
                )}
              </a>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 opacity-0 animate-fadeIn">
            <p className="text-foreground/60 text-lg">
              No posts found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
