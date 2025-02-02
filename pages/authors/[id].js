import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Wrapper from "@/components/Wrapper";

export default function AuthorPage() {
  const router = useRouter();
  const { id } = router.query;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    console.log("ID", id);

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/getPostsByAuthor?author=${id}`);
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  if (loading) return <Loader />;

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            No Posts Found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn&apos;t find any posts by the selected author. Check back
            later.
          </p>
          <Link href="/" passHref>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition duration-300 ease-in-out">
              Go Back to Homepage
            </button>
          </Link>
        </div>
        <div className="mt-8">
          <Image
            src="/no-posts.png"
            alt="No posts illustration"
            width={500}
            height={300}
            className="w-full h-64"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Wrapper>
        <h1 className="text-3xl my-6 flex items-center justify-center font-bold mb-8">
          Posts by&nbsp;
          <span className="text-primary">
            {posts[0]?.authorDetails?.username || "Author"}
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden"
            >
              <Link href={`/post/${post._id}`} passHref>
                <div className="relative group">
                  {/* Full-Width Category Banner */}
                  <div className="absolute top-0 left-0 w-full bg-[#22C55E] text-white text-xs font-bold uppercase py-2 text-center shadow-md">
                    {post.category}
                  </div>
                  <Image
                    className="h-48 md:h-64 w-full object-cover"
                    src={`/uploads/${post.post_img[0]}`}
                    alt={post.title}
                    width={500}
                    height={300}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 hover:text-blue-500 transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    Author{" "}
                    <span className="font-semibold">
                      {post.authorDetails.username}
                    </span>{" "}
                    |{" "}
                    <span>{new Date(post.post_date).toLocaleDateString()}</span>
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {post.description.slice(0, 100)}...
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
