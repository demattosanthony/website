import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { MarkdownViewer } from "components/ui/markdown";
import { Button } from "components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "components/ui/tooltip";
import { Maximize2, Edit3, Download, RotateCcw, Type } from "lucide-react";

const DEFAULT_MARKDOWN = `# Markdown Preview

Welcome to the **Markdown Viewer**! Start typing on the left to see your content rendered on the right.

## Features

- **Live Preview**: See your markdown rendered in real-time
- **GFM Support**: GitHub Flavored Markdown supported
- **Tables**: Create beautiful tables
- **Code Blocks**: Syntax highlighting ready

## Example Table

| Feature | Supported |
|---------|-----------|
| Headers | ✓ |
| Lists | ✓ |
| Links | ✓ |
| Images | ✓ |

## Lists

### Unordered List
- First item
- Second item
- Third item

### Ordered List
1. First step
2. Second step
3. Third step

## Blockquote

> "The best way to predict the future is to invent it."
> — Alan Kay

## Links

[Visit GitHub](https://github.com)

---

Start editing to see your own markdown come to life!`;

const STORAGE_KEY = "markdown-viewer-content";

export default function MarkdownViewerPage() {
  const [markdown, setMarkdown] = useState(() => {
    // Load from localStorage on mount
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || DEFAULT_MARKDOWN;
    }
    return DEFAULT_MARKDOWN;
  });
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Calculate word and character count
  const stats = useMemo(() => {
    const words = markdown.trim().split(/\s+/).filter(Boolean).length;
    const chars = markdown.length;
    const lines = markdown.split("\n").length;
    return { words, chars, lines };
  }, [markdown]);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isSyncingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for fullscreen search parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsFullscreen(params.get("fullscreen") === "true");
    }
  }, []);

  // Save to localStorage whenever markdown changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, markdown);
  }, [markdown]);

  const handleEditorScroll = useCallback(() => {
    if (isSyncingRef.current || !editorRef.current || !previewRef.current)
      return;

    isSyncingRef.current = true;
    const editor = editorRef.current;
    const preview = previewRef.current;

    const scrollPercentage =
      editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
    preview.scrollTop =
      scrollPercentage * (preview.scrollHeight - preview.clientHeight);

    setTimeout(() => {
      isSyncingRef.current = false;
    }, 10);
  }, []);

  const handlePreviewScroll = useCallback(() => {
    if (isSyncingRef.current || !editorRef.current || !previewRef.current)
      return;

    isSyncingRef.current = true;
    const editor = editorRef.current;
    const preview = previewRef.current;

    const scrollPercentage =
      preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
    editor.scrollTop =
      scrollPercentage * (editor.scrollHeight - editor.clientHeight);

    setTimeout(() => {
      isSyncingRef.current = false;
    }, 10);
  }, []);

  // Draggable divider handlers
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;

      setLeftWidth(percentage);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Toggle fullscreen mode and update URL
  const toggleFullscreen = useCallback(() => {
    const newFullscreenState = !isFullscreen;
    setIsFullscreen(newFullscreenState);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (newFullscreenState) {
        url.searchParams.set("fullscreen", "true");
      } else {
        url.searchParams.delete("fullscreen");
      }
      window.history.pushState({}, "", url.toString());
    }
  }, [isFullscreen]);

  const handleDownloadPDF = useCallback(() => window.print(), []);
  const handleReset = useCallback(() => setMarkdown(DEFAULT_MARKDOWN), []);

  // Reusable button component with tooltip
  const ActionButton = ({
    onClick,
    icon: Icon,
    tooltip,
    className = "",
  }: {
    onClick: () => void;
    icon: React.ElementType;
    tooltip: string;
    className?: string;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onClick}
          variant="ghost"
          size="sm"
          className={`gap-2 cursor-pointer ${className}`}
        >
          <Icon className="h-3.5 w-3.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );

  // Header component
  const Header = ({
    title,
    actions,
    stats,
  }: {
    title: string;
    actions: React.ReactNode;
    stats?: React.ReactNode;
  }) => (
    <div className="px-4 py-3 border-b bg-linear-to-r from-muted/40 to-muted/20 backdrop-blur-sm shrink-0 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold text-muted-foreground tracking-wide">
          {title}
        </h2>
        {stats}
      </div>
      <div className="flex gap-2">{actions}</div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="w-full h-screen">
        <div className="fixed top-4 right-4 z-10 flex gap-2 print:hidden backdrop-blur-sm bg-background/50 p-2 rounded-lg border shadow-lg">
          <ActionButton
            onClick={handleDownloadPDF}
            icon={Download}
            tooltip="Download as PDF"
            className="hover:scale-110 transition-transform duration-200"
          />
          <ActionButton
            onClick={toggleFullscreen}
            icon={Edit3}
            tooltip="Edit Markdown"
            className="hover:scale-110 transition-transform duration-200"
          />
        </div>
        <div
          className="container mx-auto px-4 py-8 max-w-4xl"
          data-print-content
        >
          <MarkdownViewer content={markdown} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-background overflow-hidden">
      <div ref={containerRef} className="flex h-full overflow-hidden">
        {/* Editor Panel */}
        <div
          className={`bg-linear-to-br from-card/40 to-card/20 overflow-hidden ${
            !isDragging ? "transition-all duration-300" : ""
          }`}
          style={{ width: `${leftWidth}%` }}
        >
          <div className="h-full flex flex-col overflow-hidden">
            <Header
              title="MARKDOWN INPUT"
              stats={
                <div className="flex items-center gap-3 text-xs text-muted-foreground/70 animate-in fade-in duration-300">
                  <span className="flex items-center gap-1 transition-colors hover:text-foreground">
                    <Type className="h-3 w-3" />
                    {stats.words} words
                  </span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="transition-colors hover:text-foreground">
                    {stats.chars} chars
                  </span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="transition-colors hover:text-foreground">
                    {stats.lines} lines
                  </span>
                </div>
              }
              actions={
                <ActionButton
                  onClick={handleReset}
                  icon={RotateCcw}
                  tooltip="Reset to default"
                  className="h-7 hover:rotate-180 transition-transform duration-500"
                />
              }
            />
            <textarea
              ref={editorRef}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              onScroll={handleEditorScroll}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`flex-1 w-full p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed overflow-y-auto transition-all duration-300 ${
                isFocused ? "bg-card/20" : ""
              }`}
              placeholder="Enter your markdown here..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* Draggable Divider */}
        <div
          onMouseDown={handleMouseDown}
          className={`w-1 bg-border hover:bg-primary cursor-col-resize transition-all duration-200 shrink-0 relative group ${
            isDragging ? "bg-primary w-1.5" : ""
          }`}
        >
          <div className="absolute inset-y-0 -left-1 -right-1" />
          {/* Grip indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex flex-col gap-1">
              <div className="w-1 h-1 rounded-full bg-primary/60" />
              <div className="w-1 h-1 rounded-full bg-primary/60" />
              <div className="w-1 h-1 rounded-full bg-primary/60" />
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div
          className={`bg-background overflow-hidden ${
            !isDragging ? "transition-all duration-300" : ""
          }`}
          style={{ width: `${100 - leftWidth}%` }}
        >
          <div className="h-full flex flex-col overflow-hidden">
            <Header
              title="PREVIEW"
              actions={
                <>
                  <ActionButton
                    onClick={handleDownloadPDF}
                    icon={Download}
                    tooltip="Download as PDF"
                    className="h-7 hover:scale-110 transition-transform duration-200"
                  />
                  <ActionButton
                    onClick={toggleFullscreen}
                    icon={Maximize2}
                    tooltip="Fullscreen preview"
                    className="h-7 hover:scale-110 transition-transform duration-200"
                  />
                </>
              }
            />
            <div
              ref={previewRef}
              onScroll={handlePreviewScroll}
              className="flex-1 overflow-y-auto p-6 animate-in fade-in duration-500"
              data-print-content
            >
              <MarkdownViewer content={markdown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
