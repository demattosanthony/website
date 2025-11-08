export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
}

export const tools: Tool[] = [
  {
    id: "markdown-viewer",
    name: "Markdown Viewer",
    description:
      "A live markdown editor with real-time preview, synchronized scrolling, and PDF export capabilities.",
    category: "Productivity",
    path: "/tools/markdown",
  },
  {
    id: "json-prettier",
    name: "JSON Prettier",
    description:
      "Format and validate JSON with real-time error detection. Copy, minify, and beautify JSON effortlessly.",
    category: "Development",
    path: "/tools/json",
  },
  {
    id: "color-picker",
    name: "Color Picker",
    description:
      "Extract color values from any image. Upload an image, hover to preview colors, and click to get hex and RGB codes.",
    category: "Design",
    path: "/tools/color-picker",
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolsByCategory(category: string): Tool[] {
  if (category === "All") return tools;
  return tools.filter((tool) => tool.category === category);
}
