import { useMemo, memo, useId } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Utilities
import { marked } from "marked";

// Code block components
import { CodeBlock, CodeBlockCode } from "components/ui/code-block";
import { cn } from "@/lib/utils";

function extractLanguage(className?: string): string {
  if (!className) return "plaintext";
  const match = className.match(/language-(\w+)/);
  return match?.[1] ?? "plaintext";
}

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

export type MarkdownViewerProps = {
  content: string;
  id?: string;
  className?: string;
  components?: Partial<Components>;
};

const INITIAL_COMPONENTS: Partial<Components> = {
  h1: ({ children }) => (
    <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl my-1">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="leading-7 text-base [&:not(:first-child)]">{children}</p>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic text-base" {...props}>
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="my-4 w-full overflow-x-auto" {...props}>
      <table className="w-full border-collapse text-base">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="m-0 border-t p-0 even:bg-muted text-base">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="border px-4 py-2 text-left font-bold text-base">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border px-4 py-2 text-left text-base">{children}</td>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="mb-2 ml-6 list-disc [&>li]:mt-2 text-base marker:text-foreground"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="my-2 ml-6 list-decimal [&>li]:mt-2 text-base marker:text-foreground"
      style={{ counterReset: "list-item" }}
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="text-base">{children}</li>,
  code: function CodeComponent({ className, children, ...props }) {
    const isInline =
      !props.node?.position?.start.line ||
      props.node?.position?.start.line === props.node?.position?.end.line;

    if (isInline) {
      return (
        <span
          className={cn(
            "bg-primary-foreground dark:bg-muted rounded-sm px-1 font-mono text-sm",
            className
          )}
          {...props}
        >
          {children}
        </span>
      );
    }

    const language = extractLanguage(className);

    return (
      <CodeBlock className={className}>
        <CodeBlockCode code={children as string} language={language} />
      </CodeBlock>
    );
  },
  pre: function PreComponent({ children }) {
    return <>{children}</>;
  },
  em: ({ children }) => <em>{children}</em>,
  strong: ({ children }) => <strong>{children}</strong>,
  a: ({ children, ...props }) => (
    <a
      className="text-blue-500 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ ...props }) => <img className="max-w-full h-auto" {...props} />,
  hr: ({ ...props }) => <hr className="my-4" {...props} />,
};

const MemoizedMarkdownBlock = memo(
  function MarkdownBlock({
    content,
    components = INITIAL_COMPONENTS,
  }: {
    content: string;
    components?: Partial<Components>;
  }) {
    return (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    );
  },
  function propsAreEqual(prevProps, nextProps) {
    return prevProps.content === nextProps.content;
  }
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

function MarkdownViewerComponent({
  content,
  id,
  className,
  components = INITIAL_COMPONENTS,
}: MarkdownViewerProps) {
  const generatedId = useId();
  const blockId = id ?? generatedId;
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

  return (
    <div className={cn("markdown-viewer flex flex-col gap-2", className)}>
      {blocks.map((block, index) => (
        <MemoizedMarkdownBlock
          key={`${blockId}-block-${index}`}
          content={block}
          components={components}
        />
      ))}
    </div>
  );
}

const MarkdownViewer = memo(MarkdownViewerComponent);
MarkdownViewer.displayName = "MarkdownViewer";

export { MarkdownViewer };
