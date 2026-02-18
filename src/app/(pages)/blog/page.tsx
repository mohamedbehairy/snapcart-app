import { Calendar, FileText } from "lucide-react";

const posts = [
  {
    slug: "summer-fashion-2026",
    title: "Summer Fashion Trends 2026",
    date: "May 15, 2026",
    excerpt:
      "Discover the hottest styles and colors for the upcoming summer season.",
  },
  {
    slug: "tech-gadgets-guide",
    title: "Top 10 Gadgets You Need This Year",
    date: "May 10, 2026",
    excerpt:
      "From smart home devices to the latest headphones, we've rounded up the best tech.",
  },
  {
    slug: "secure-shopping-tips",
    title: "How to Shop Safely Online",
    date: "May 5, 2026",
    excerpt:
      "Protect your personal information with these simple security tips.",
  },
  {
    slug: "gift-guide-mothers-day",
    title: "Mother's Day Gift Guide",
    date: "April 28, 2026",
    excerpt: "Find the perfect present for mom with our curated gift ideas.",
  },
  {
    slug: "spring-cleaning-sale",
    title: "Spring Cleaning Sale – Up to 40% Off",
    date: "April 20, 2026",
    excerpt:
      "Refresh your home and wardrobe with our biggest sale of the season.",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-accent shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-2">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Blog</h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              News, tips, and updates from the SnapCart team.
            </p>
          </div>

          {/* Blog posts list */}
          <div className="space-y-4 mb-6">
            {posts.map((post, index) => (
              <article
                key={index}
                className="cursor-pointer border border-border rounded-xl p-5 bg-background/50 hover:bg-accent/5 transition-colors"
              >
                <h2 className="font-medium text-base mb-2">{post.title}</h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex cursor-pointer items-center text-sm font-medium text-primary hover:underline">
                  Read more →
                </span>
              </article>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-xs text-center text-muted-foreground">
            Want to write for us?{" "}
            <span className="text-primary hover:underline">Get in touch</span>
          </p>
        </div>
      </div>
    </div>
  );
}
