import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";

// Updated static blogs with 'author' as an object
const staticBlogs = [
  { id: 1, title: "React", content: "React is a popular JavaScript library developed by Facebook, used for building user interfaces, especially for single-page applications. React's core concept revolves around the idea of components, which allow developers to build UI elements in a modular way. One of the most powerful features of React is its ability to handle state and re-render components efficiently when the state changes. React's virtual DOM makes this possible by updating only the components that have changed, rather than the entire page. This leads to better performance and a smoother user experience. React also introduced the concept of hooks in version 16.8, allowing developers to use state and other React features without writing classes. The useState hook is used to manage state in functional components, and useEffect is used for side effects like data fetching or manipulating the DOM. Whether you’re building a small app or a large-scale enterprise solution, React provides the flexibility to scale and manage complex UIs with ease. As the web development ecosystem evolves, React continues to be one of the most widely adopted libraries for front-end development.", author: { name: "Prasad Kailas Kadam" } },
  { id: 2, title: "Softskills", content: "In the world of professional development, soft skills are just as crucial as technical skills. Soft skills are the personal attributes and interpersonal abilities that define how well individuals can work or interact with others. They include traits like communication, teamwork, problem-solving, time management, leadership, adaptability, and emotional intelligence. Effective communication is one of the most important soft skills to master. Whether in writing or speaking, being able to convey your thoughts clearly and listen actively to others is essential in any work environment. Employers highly value employees who can articulate their ideas and collaborate effectively with colleagues and clients. Teamwork is another critical soft skill. In a professional setting, you often need to work with others to achieve a common goal. Being able to contribute meaningfully to a team, resolve conflicts, and maintain positive working relationships is vital to success. Problem-solving skills enable individuals to approach challenges logically and find solutions in a timely manner. These skills are particularly important in fast-paced industries where rapid decision-making is necessary. By actively working on soft skills, individuals can enhance their career prospects and become more effective and valued employees in any profession.", author: { name: "Shruti Hitesh Khilosiya" } },
  { id: 3, title: "AI Chatbot", content: "The rise of artificial intelligence (AI) has given birth to chatbots, intelligent systems capable of simulating conversation with users. Chatbots have become a vital tool for businesses looking to improve customer service, automate processes, and reduce response times. AI chatbots are powered by natural language processing (NLP), machine learning (ML), and deep learning algorithms. These technologies enable chatbots to understand human language, interpret context, and provide relevant responses. Unlike traditional rule-based chatbots, which rely on predefined scripts, AI-powered chatbots learn from interactions and improve their responses over time. There are two main types of AI chatbots: rule-based and AI-based. Rule-based chatbots follow specific commands and are limited to responding according to a set of pre-determined rules. In contrast, AI-based chatbots can understand complex queries, analyze sentiment, and adapt their responses based on the user's needs. The applications of AI chatbots are vast, ranging from customer support to healthcare, banking, and e-commerce. In customer service, chatbots can handle routine inquiries, freeing up human agents to focus on more complex issues. In healthcare, they can assist patients by providing medical advice and scheduling appointments. As AI technology continues to evolve, chatbots are expected to become even more sophisticated, capable of handling a wider range of tasks and providing personalized experiences for users.", author: { name: "Sahil Sachin Deshmukh" } },
  { id: 4, title: "Full Stack Development", content: "Full-stack development refers to the practice of working with both the front-end and back-end of web applications. A full-stack developer is proficient in multiple technologies, enabling them to build the entire application, from user interfaces to databases. The front-end of an application, also known as the client-side, refers to everything that users interact with directly in their web browser. Technologies like HTML, CSS, and JavaScript are fundamental to front-end development. Modern front-end frameworks and libraries, such as React, Angular, and Vue.js, provide developers with powerful tools for creating dynamic and responsive user interfaces. On the back-end, developers work with server-side languages such as Node.js, Python, Ruby, Java, and PHP. They also manage databases (SQL or NoSQL), which store the application’s data. Frameworks like Express (Node.js), Django (Python), and Laravel (PHP) help streamline back-end development by providing pre-built structures for handling common tasks like routing, authentication, and database interactions. Full-stack developers need to understand how to connect the front-end and back-end parts of an application through APIs (Application Programming Interfaces). They also need to be familiar with version control tools like Git, deployment processes, and cloud services. The rise of full-stack development has been driven by the demand for more versatile developers who can handle all aspects of web development. Full-stack developers are highly sought after in the tech industry because they can build end-to-end solutions, which is valuable for startups and larger organizations looking for cost-effective and efficient development teams. If you're aspiring to become a full-stack developer, you'll need to master both front-end and back-end technologies, as well as other essential tools like databases, APIs, and cloud platforms. It's a challenging but rewarding career path that opens up many opportunities in the world of software development.", author: { name: "Akshada Vasantrao Gaikwad" } }
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
