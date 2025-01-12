import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "./Loader";
import Image from "next/image";

export default function Cards({ selectedAuthor }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/getPosts");
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error("Expected an array of posts but received:", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Loader />;

  if (!posts.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No posts available.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map((post) =>
          post && post._id ? (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden"
            >
              <Link href={`/post/${post._id}`}>
                <div className="relative group cursor-pointer">
                  {/* Category Banner */}
                  <div className="absolute top-0 left-0 w-full bg-[#22C55E] text-white text-xs font-bold uppercase py-1.5 text-center shadow-md">
                    {post.category || "Uncategorized"}
                  </div>

                  <div className="w-full h-48 relative">
                  <Image
                        src={`/uploads/${post.post_img?.[0] || "dchowk.jpg"}`}
                        alt={post.title || "Post Image"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                        onError={(e) => {
                        e.target.src = '/uploads/ddchowk.jpg'; // Fallback if image fails to load
                        }}
                    />
                    </div>
                  
                </div>
                <div className="p-4">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 hover:text-green-500 transition-colors duration-300">
                    {post.title || "Untitled Post"}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    Author:{" "}
                    <span className="font-semibold">
                      {post.authorDetails?.username || "Unknown"}
                    </span>{" "}
                    |{" "}
                    <span>
                      {post.post_date
                        ? new Date(post.post_date).toLocaleDateString()
                        : "Unknown Date"}
                    </span>
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {post.description
                      ? `${post.description.slice(0, 100)}...`
                      : "No description available."}
                  </p>
                </div>
              </Link>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
