import { useState, useEffect } from "react";

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

const staticBlogs = [
  { id: 1, title: "Static Blog 1", content: "Content for static blog 1.", author: { name: "Sahil" } },
  { id: 2, title: "Static Blog 2", content: "Content for static blog 2.", author: { name: "Jane Smith" } },
  { id: 3, title: "Static Blog 3", content: "Content for static blog 3.", author: { name: "Alice Brown" } },
  { id: 4, title: "Static Blog 4", content: "Content for static blog 4.", author: { name: "Bob White" } },
  { id: 5, title: "Static Blog 5", content: "Content for static blog 5.", author: { name: "Charlie Green" } },
  { id: 6, title: "Static Blog 6", content: "Content for static blog 6.", author: { name: "David Black" } },
];

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Simulate loading state and fetching data
    setTimeout(() => {
      setBlogs(staticBlogs); // Use static blogs data
      setLoading(false);
    }, 1000); // Simulate a 1-second delay for loading state
  }, []);

  return {
    loading,
    blogs,
  };
};
