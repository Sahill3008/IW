import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";

// Updated static blogs with 'author' as an object
const staticBlogs = [
  { id: 1, title: "Static Blog 1", content: "This is the content for blog 1.", author: { name: "John Doe" } },
  { id: 2, title: "Static Blog 2", content: "This is the content for blog 2.", author: { name: "Jane Smith" } },
  { id: 3, title: "Static Blog 3", content: "This is the content for blog 3.", author: { name: "Alice Brown" } },
  { id: 4, title: "Static Blog 4", content: "This is the content for blog 4.", author: { name: "Bob White" } },
  // Add more blogs as needed
];

export const Blog = () => {
  const { id } = useParams();
  
  // Define the blog type with 'author' as an object
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<{ id: number; title: string; content: string; author: { name: string } } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchedBlog = staticBlogs.find((b) => b.id === Number(id));  // Convert id to number
      setBlog(fetchedBlog || null);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading || !blog) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};

export default Blog;
