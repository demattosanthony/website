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
import ToolsPage from "./pages/tools/page";
import MarkdownViewerPage from "./pages/tools/markdown-viewer/page";
import JsonPage from "./pages/tools/json/page";
import ColorPickerPage from "./pages/tools/color-picker/page";

// Root wrapper with providers and global components
function Root() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ScrollRestoration />
      <Toaster />
      <Outlet />
    </ThemeProvider>
  );
}

// Main layout with header and footer
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function NotFound() {
  return <h2>404 not found</h2>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
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
          {
            path: "/tools",
            element: <ToolsPage />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      {
        path: "/tools/markdown",
        element: <MarkdownViewerPage />,
      },
      {
        path: "/tools/json",
        element: <JsonPage />,
      },
      {
        path: "/tools/color-picker",
        element: <ColorPickerPage />,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
