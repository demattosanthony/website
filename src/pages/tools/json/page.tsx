import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Copy,
  RotateCcw,
  Check,
  AlertCircle,
  FileJson,
  Minimize2,
} from "lucide-react";

const DEFAULT_JSON = `{"name": "JSON Prettier", "description": "A simple and efficient JSON formatter","features": ["Real-time formatting","Error detection",
"Copy to clipboard","Minify support"
],"nested": {"object": {"with": "multiple levels","of": "nesting"}
},"array": [1, 2, 3, 4, 5],"boolean": true,"null": null
}`;

const STORAGE_KEY = "json-prettier-content";

export default function JsonPage() {
  const [input, setInput] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || DEFAULT_JSON;
    }
    return DEFAULT_JSON;
  });

  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isMinified, setIsMinified] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, input);
  }, [input]);

  // Format JSON on input change
  useEffect(() => {
    try {
      if (!input.trim()) {
        setFormatted("");
        setError(null);
        return;
      }

      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, isMinified ? 0 : 2);
      setFormatted(formatted);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setFormatted("");
    }
  }, [input, isMinified]);

  const handleCopy = useCallback(() => {
    if (formatted) {
      navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [formatted]);

  const handleReset = useCallback(() => {
    setInput(DEFAULT_JSON);
    setIsMinified(false);
  }, []);

  const toggleMinify = useCallback(() => {
    setIsMinified((prev) => !prev);
  }, []);

  // Draggable divider
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
      const clampedPercentage = Math.min(Math.max(percentage, 20), 80);
      setLeftWidth(clampedPercentage);
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

  const ActionButton = ({
    onClick,
    icon: Icon,
    tooltip,
    disabled = false,
    className = "",
  }: {
    onClick: () => void;
    icon: React.ElementType;
    tooltip: string;
    disabled?: boolean;
    className?: string;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onClick}
          variant="ghost"
          size="sm"
          disabled={disabled}
          className={`gap-2 cursor-pointer ${className}`}
        >
          <Icon className="h-3.5 w-3.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );

  const Header = ({
    title,
    actions,
  }: {
    title: string;
    actions: React.ReactNode;
  }) => (
    <div className="px-4 py-3 border-b bg-muted/30 shrink-0 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2>
      <div className="flex gap-2">{actions}</div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-background overflow-hidden">
      <div ref={containerRef} className="flex h-full overflow-hidden">
        {/* Input Panel */}
        <div
          className="bg-card/30 overflow-hidden"
          style={{ width: `${leftWidth}%` }}
        >
          <div className="h-full flex flex-col overflow-hidden">
            <Header
              title="JSON INPUT"
              actions={
                <ActionButton
                  onClick={handleReset}
                  icon={RotateCcw}
                  tooltip="Reset to default"
                  className="h-7"
                />
              }
            />
            <textarea
              ref={editorRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 w-full p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed overflow-y-auto"
              placeholder="Paste your JSON here..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* Draggable Divider */}
        <div
          onMouseDown={handleMouseDown}
          className="w-1 bg-border hover:bg-primary cursor-col-resize transition-colors shrink-0 relative group"
        >
          <div className="absolute inset-y-0 -left-1 -right-1" />
        </div>

        {/* Output Panel */}
        <div
          className="bg-background overflow-hidden"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <div className="h-full flex flex-col overflow-hidden">
            <Header
              title="FORMATTED OUTPUT"
              actions={
                <>
                  <ActionButton
                    onClick={toggleMinify}
                    icon={isMinified ? FileJson : Minimize2}
                    tooltip={isMinified ? "Pretty print" : "Minify"}
                    disabled={!!error || !formatted}
                    className="h-7"
                  />
                  <ActionButton
                    onClick={handleCopy}
                    icon={copied ? Check : Copy}
                    tooltip={copied ? "Copied!" : "Copy to clipboard"}
                    disabled={!!error || !formatted}
                    className="h-7"
                  />
                </>
              }
            />
            <div className="flex-1 overflow-y-auto p-6">
              {error ? (
                <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-destructive mb-1">
                      Invalid JSON
                    </h3>
                    <p className="text-sm text-destructive/80">{error}</p>
                  </div>
                </div>
              ) : formatted ? (
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
                  {formatted}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <FileJson className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-sm">
                    Your formatted JSON will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
