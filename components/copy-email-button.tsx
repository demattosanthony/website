import { toast } from "sonner";

interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 font-semibold underline decoration-2 hover:opacity-80 transition-opacity cursor-pointer"
      aria-label="Copy email"
    >
      <span>{email}</span>
    </button>
  );
}
