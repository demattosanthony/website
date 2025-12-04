import { useState, useMemo } from "react";
import { tools } from "@/lib/tools-data";
import { Button } from "components/ui/button";
import { ArrowRight, Search } from "lucide-react";

export default function ToolsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique categories from tools
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(tools.map((tool) => tool.category).filter(Boolean))
    );
    return ["All", ...cats];
  }, []);

  // Filter tools by category and search
  const filteredTools = useMemo(() => {
    let filtered = [...tools];

    // Filter by category
    if (activeFilter !== "All") {
      filtered = filtered.filter((tool) => tool.category === activeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="mb-8 opacity-0 animate-slideLeft"
          style={{ animationDelay: "0s" }}
        >
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight mb-3">
            Tools
          </h1>
          <p className="text-foreground/60 text-lg">
            A collection of useful tools and utilities
          </p>
        </div>

        {/* Search and Filters */}
        <div
          className="mb-8 opacity-0 animate-clipReveal"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap pb-4 border-b border-border/40">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category || "All")}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                  activeFilter === category
                    ? "bg-accent text-foreground"
                    : "text-foreground/60 hover:text-foreground/80 hover:bg-accent/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <div
              key={tool.id}
              className="opacity-0 animate-scaleIn"
              style={{ animationDelay: `${0.15 + index * 0.05}s` }}
            >
              <a
                href={tool.path}
                target="__blank"
                className="group block h-full p-6 rounded-lg transition-all duration-200 border border-border/40 hover:border-border/80 bg-background/50 hover:bg-accent/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider">
                    {tool.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200" />
                </div>

                <h2 className="text-xl font-medium mb-3 group-hover:text-foreground transition-colors">
                  {tool.name}
                </h2>

                <p className="text-foreground/60 leading-relaxed text-sm">
                  {tool.description}
                </p>
              </a>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16 opacity-0 animate-fadeIn">
            <p className="text-foreground/60 text-lg mb-2">
              No tools found matching your criteria.
            </p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="text-sm"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
