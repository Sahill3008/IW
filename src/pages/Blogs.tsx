import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

// Static blogs (for loading state)
const staticBlogs = [
  { id: 1, title: "Static Blog 1", content: "Content for static blog 1.", author: { name: "John Doe" } },
  { id: 2, title: "Static Blog 2", content: "Content for static blog 2.", author: { name: "Jane Smith" } },
  { id: 3, title: "Static Blog 3", content: "Content for static blog 3.", author: { name: "Alice Brown" } },
  { id: 4, title: "Static Blog 4", content: "Content for static blog 4.", author: { name: "Bob White" } },
  { id: 5, title: "Static Blog 5", content: "Content for static blog 5.", author: { name: "Charlie Green" } },
  { id: 6, title: "Static Blog 6", content: "Content for static blog 6.", author: { name: "David Black" } },
];

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  // If loading, show static blogs
  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            {staticBlogs.map(blog => (
              <BlogSkeleton key={blog.id} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render blogs once data is loaded
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          {blogs.map(blog => (
            <BlogCard
              key={blog.id} // Ensure each BlogCard has a unique key
              id={blog.id}
              authorname={blog.author.name || "Unknown"}
              title={blog.title}
              content={blog.content}
              publishedDate={"23rd June"} // Replace with dynamic date if available
            />
          ))}
        </div>
      </div>
    </div>
  );
};
