import { serve } from "bun";
import index from "./index.html";

// TODO: Change this to just the public directory
const assetsDir = new URL("./assets/", import.meta.url).pathname;

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
        });
      },
    },

    "/assets/*": {
      GET(req) {
        const path = req.url.split("/assets/")[1];
        const file = Bun.file(assetsDir + path!);
        return new Response(file.stream(), {
          headers: {
            "Content-Type": file.type,
            "Content-Disposition": "inline",
          },
        });
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
