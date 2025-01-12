import Footer2 from "@/components/Footer2";
import Header from "@/components/Header";
import { FaWhatsapp } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import "@/styles/globals.css";
import Head from "next/head";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import Headroom from "react-headroom";
import { UserProvider } from "../context/UserContext";
import Loader from "../components/Loader.jsx";

export const productInfo = createContext();

// Using Context API to access productInfo globally
export function MyContext() {
  return useContext(productInfo);
}

// App Component
export default function App({ Component, pageProps }) { 
  const [loading, setLoading] = useState(true);
  const [adminPage, setAdminPage] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [subTotal, setSubTotal] = useState(0);

  const router = useRouter();

  const menuLinks = [
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/posts", label: "Posts" },
    { href: "/admin/users", label: "Users" },
  ];

  // Initialize state and redirect logic
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Fetch user role
        const role = localStorage.getItem("role");
        setUserRole(role);

        // Check user authentication and redirect
        const storedUserData = localStorage.getItem("loggedInUser");
        if (router.pathname.startsWith("/admin") && !storedUserData) {
          router.push("/login");
          return;
        }

        // Determine if the page is an admin page
        setAdminPage(router.pathname.startsWith("/admin"));

        setLoading(false); // Stop loading after checks
      } catch (error) {
        console.error("Error initializing app:", error);
        localStorage.clear();
        setLoading(false); // Ensure the loader stops
      }
    };

    initializeApp();
  }, [router]);

  if (loading) {
    return <Loader />; // Display loader while initializing
  }

  return (
    <UserProvider>
      <>
        {/* WhatsApp Contact Link */}
        <Link
          href="https://wa.me/923074583567"
          className="fixed bottom-16 left-8 rounded-full bg-white/[0.25] text-green-500 duration-200 hover:scale-110 cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={50} />
        </Link>

        {/* Meta and Title */}
        <Head>
          <link rel="icon" href="/save-gaza-logo.png" />
          <title>SGC News Portal</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
            rel="stylesheet"
          />
        </Head>

        {/* Header */}
        <Headroom>
          <Header />
        </Headroom>

        {/* Admin Menu */}
        {adminPage && (
          <div className="menu w-full mx-auto mt-6 flex justify-center items-center gap-5">
            {menuLinks
              .filter((link) =>
                userRole === "0"
                  ? link.label !== "Users" // Exclude Users for role 0
                  : true
              )
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-semibold text-xl cursor-pointer hover:text-gray-500 ${
                    router.pathname === link.href
                      ? "text-blue-500 font-bold"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </div>
        )}

        {/* Main Component */}
        <Component {...pageProps} />

        {/* Footer */}
        <Footer2 />
      </>
    </UserProvider>
  );
}
 