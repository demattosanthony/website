import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router";
import "./index.css";
import HomePage from "./pages/page";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/header";
import Footer from "./components/footer";
import BlogPage from "./pages/blog/page";
import BlogPostPage from "./pages/blog/[blogId]/page";

function Layout() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ScrollRestoration />
      <Toaster />
      <Header />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}

function NotFound() {
  return <h2>404 not found</h2>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog/:blogId",
        element: <BlogPostPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
