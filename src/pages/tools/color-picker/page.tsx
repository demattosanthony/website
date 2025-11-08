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
  Upload,
  Pipette,
  Image as ImageIcon,
} from "lucide-react";
import type { ColorData } from "@/lib/color-utils";
import {
  rgbToHex,
  rgbToHsl,
  rgbToOklch,
  formatColorValue,
  drawMagnifiedLoupe,
} from "@/lib/color-utils";

// Components
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

const ColorFormat = ({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}) => (
  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-mono font-semibold">{value}</p>
    </div>
    <Button onClick={onCopy} variant="ghost" size="sm" className="gap-2">
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </Button>
  </div>
);

const ColorInfo = ({
  color,
  label,
  sectionId,
  onCopy,
  copiedId,
}: {
  color: ColorData;
  label: string;
  sectionId: string;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}) => {
  const formats = [
    { id: "hex", label: "HEX", value: formatColorValue("hex", color) },
    { id: "rgb", label: "RGB", value: formatColorValue("rgb", color) },
    { id: "hsl", label: "HSL", value: formatColorValue("hsl", color) },
    { id: "oklch", label: "OKLCH", value: formatColorValue("oklch", color) },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground">{label}</h3>
      <div
        className="w-full h-32 rounded-lg border-2 border-border"
        style={{ backgroundColor: color.hex }}
      />
      <div className="space-y-3">
        {formats.map(({ id, label, value }) => (
          <ColorFormat
            key={id}
            label={label}
            value={value}
            onCopy={() => onCopy(value, `${sectionId}-${id}`)}
            copied={copiedId === `${sectionId}-${id}`}
          />
        ))}
      </div>
    </div>
  );
};

const CursorIndicator = ({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) => (
  <div
    className="absolute pointer-events-none"
    style={{ left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` }}
  >
    <div className="relative -translate-x-1/2 -translate-y-1/2">
      <div className="w-6 h-6 rounded-full border-2 border-white shadow-lg" />
      <div className="absolute inset-0 w-6 h-6 rounded-full border-2 border-black/20" />
    </div>
  </div>
);

const MagnifiedLoupe = ({
  color,
  sourceCanvas,
}: {
  color: ColorData;
  sourceCanvas: HTMLCanvasElement;
}) => {
  const loupeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (loupeRef.current) {
      drawMagnifiedLoupe(loupeRef.current, sourceCanvas, color.x, color.y);
    }
  }, [color.x, color.y, sourceCanvas]);

  // Position loupe on left if near right edge, otherwise on right
  const xPercent = (color.x / sourceCanvas.width) * 100;
  const isNearRightEdge = xPercent > 70;
  const transform = isNearRightEdge
    ? "translate(calc(-100% - 20px), -50%)"
    : "translate(20px, -50%)";

  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        left: `${xPercent}%`,
        top: `${(color.y / sourceCanvas.height) * 100}%`,
        transform,
      }}
    >
      <div className="bg-background border-2 border-border rounded-lg shadow-2xl overflow-hidden">
        <canvas ref={loupeRef} className="w-[120px] h-[120px]" />
        <div className="px-2 py-1.5 bg-muted/50 border-t border-border">
          <p className="text-[10px] font-mono font-semibold text-center">
            {color.hex}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function ColorPickerPage() {
  const [image, setImage] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<ColorData | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const processFile = useCallback((file: File) => {
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setSelectedColor(null);
        setHoveredColor(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingFile(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleReset = useCallback(() => {
    setImage(null);
    setSelectedColor(null);
    setHoveredColor(null);
    setIsDraggingFile(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const getColorAtPosition = useCallback(
    (x: number, y: number): ColorData | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const { data } = ctx.getImageData(x, y, 1, 1);
      const [r = 0, g = 0, b = 0] = data;

      return {
        hex: rgbToHex(r, g, b),
        rgb: { r, g, b },
        hsl: rgbToHsl(r, g, b),
        oklch: rgbToOklch(r, g, b),
        x,
        y,
      };
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(
        (e.clientX - rect.left) * (canvas.width / rect.width)
      );
      const y = Math.floor(
        (e.clientY - rect.top) * (canvas.height / rect.height)
      );

      const color = getColorAtPosition(x, y);
      if (color) setHoveredColor(color);
    },
    [getColorAtPosition]
  );

  const handleClick = useCallback(() => {
    if (hoveredColor) setSelectedColor(hoveredColor);
  }, [hoveredColor]);

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  // Draw image on canvas
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      imageRef.current = img;
    };

    img.src = image;
  }, [image]);

  // Draggable divider
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const percentage = ((e.clientX - rect.left) / rect.width) * 100;
      setLeftWidth(Math.min(Math.max(percentage, 20), 80));
    };

    const handleUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <div className="w-full h-screen bg-background overflow-hidden">
      <div ref={containerRef} className="flex h-full overflow-hidden">
        {/* Image Panel */}
        <div
          className={`bg-card/30 ${
            image ? "overflow-visible" : "overflow-hidden"
          }`}
          style={{ width: `${leftWidth}%` }}
        >
          <div
            className={`h-full flex flex-col ${
              image ? "overflow-visible" : "overflow-hidden"
            }`}
          >
            <Header
              title="IMAGE"
              actions={
                <ActionButton
                  onClick={handleReset}
                  icon={RotateCcw}
                  tooltip="Reset"
                  className="h-7"
                  disabled={!image}
                />
              }
            />

            <div
              className={`flex-1 p-6 ${
                image ? "overflow-visible" : "overflow-auto"
              }`}
            >
              {!image ? (
                <div className="h-full flex items-center justify-center p-4">
                  <div
                    onDragEnter={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.types.includes("Files"))
                        setIsDraggingFile(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      if (e.currentTarget === e.target)
                        setIsDraggingFile(false);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = "copy";
                    }}
                    onDrop={handleDrop}
                    className="relative w-full max-w-lg"
                  >
                    <div
                      className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                        isDraggingFile
                          ? "border-primary/70 bg-primary/3 shadow-sm"
                          : "border-border/80 bg-background/50 hover:border-border shadow-sm"
                      }`}
                    >
                      <div className="text-center space-y-6 py-14 px-10">
                        <div className="flex justify-center">
                          <ImageIcon
                            className={`w-14 h-14 transition-all duration-200 ${
                              isDraggingFile
                                ? "text-primary scale-105"
                                : "text-muted-foreground/50"
                            }`}
                            strokeWidth={1.25}
                          />
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xl font-medium text-foreground">
                            {isDraggingFile
                              ? "Drop to Upload"
                              : "Upload an Image"}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground/80 max-w-[280px] mx-auto">
                            {isDraggingFile
                              ? "Release to extract colors from your image"
                              : "Drag and drop here, or click to browse"}
                          </p>
                        </div>

                        {!isDraggingFile && (
                          <div className="space-y-4 pt-1">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="image-upload"
                            />
                            <label htmlFor="image-upload">
                              <Button
                                className="gap-2 h-10 px-5 text-sm font-medium"
                                asChild
                              >
                                <span className="cursor-pointer">
                                  <Upload className="h-4 w-4" strokeWidth={2} />
                                  Choose Image
                                </span>
                              </Button>
                            </label>
                            <p className="text-[11px] text-muted-foreground/50 font-medium tracking-wide pt-2">
                              PNG, JPG, GIF • UP TO 10MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-full overflow-visible">
                  <div className="relative inline-block overflow-visible">
                    <canvas
                      ref={canvasRef}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => setHoveredColor(null)}
                      onClick={handleClick}
                      className="max-w-full h-auto rounded-lg border border-border cursor-crosshair"
                      style={{ display: "block" }}
                    />
                    {hoveredColor && canvasRef.current && (
                      <>
                        <CursorIndicator
                          x={hoveredColor.x}
                          y={hoveredColor.y}
                          width={canvasRef.current.width}
                          height={canvasRef.current.height}
                        />
                        <MagnifiedLoupe
                          color={hoveredColor}
                          sourceCanvas={canvasRef.current}
                        />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Draggable Divider */}
        <div
          onMouseDown={() => setIsDragging(true)}
          className="w-1 bg-border hover:bg-primary cursor-col-resize transition-colors shrink-0 relative group"
        >
          <div className="absolute inset-y-0 -left-1 -right-1" />
        </div>

        {/* Color Info Panel */}
        <div
          className="bg-background overflow-hidden"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <div className="h-full flex flex-col overflow-hidden">
            <Header title="COLOR DETAILS" actions={<div className="h-7" />} />

            <div className="flex-1 overflow-y-auto p-6">
              {!image ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Pipette className="w-12 h-12 mb-3 opacity-50 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Upload an image to start picking colors
                  </p>
                </div>
              ) : !selectedColor && !hoveredColor ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Pipette className="w-12 h-12 mb-3 opacity-50 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Hover over the image to preview colors
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Click to select a color
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedColor && (
                    <ColorInfo
                      color={selectedColor}
                      label="SELECTED COLOR"
                      sectionId="selected"
                      onCopy={handleCopy}
                      copiedId={copiedId}
                    />
                  )}
                  {hoveredColor && (
                    <div className="pt-6 border-t">
                      <ColorInfo
                        color={hoveredColor}
                        label="HOVERED COLOR"
                        sectionId="hovered"
                        onCopy={handleCopy}
                        copiedId={copiedId}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
