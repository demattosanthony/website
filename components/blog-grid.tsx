import { useNavigate } from "react-router";
import { blogPosts } from "@/lib/blog-data";
import { calculateReadTime, getGridClasses } from "@/lib/blog-utils";

export default function BlogGrid() {
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 sm:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 auto-rows-auto">
          {blogPosts.map((post, index) => {
            const { container, image, title } = getGridClasses(index);

            return (
              <div
                key={post.id}
                onClick={() => navigate(`/blog/${post.id}`)}
                className={`group cursor-pointer ${container}`}
              >
                {/* Cover Image */}
                {post.coverImage && (
                  <div
                    className={`relative ${image} rounded-2xl overflow-hidden mb-4`}
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content Below Image */}
                <div className="space-y-2">
                  <h2
                    className={`font-bold text-foreground leading-tight ${title}`}
                  >
                    {post.title}
                  </h2>

                  <div className="flex items-center gap-3 text-foreground/60">
                    <span className="text-sm font-medium">{post.category}</span>
                    <span className="text-sm">
                      {calculateReadTime(post.content)} min read
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
