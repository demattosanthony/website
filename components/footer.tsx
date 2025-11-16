import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";
import linkedinIcon from "@/assets/logos/linkedin.svg";
import githubIcon from "@/assets/logos/github.svg";

function ExternalAccountLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 flex items-center justify-center">
            <img
              src={icon}
              alt={label}
              className="w-full h-full object-contain invert opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 sm:px-8 bg-[#1a1a1a] text-white">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <p className="text-sm text-white/60">
          © Copyright {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-5">
          <ExternalAccountLink
            href="https://www.linkedin.com/in/ademattos/"
            icon={linkedinIcon}
            label="LinkedIn"
          />
          <ExternalAccountLink
            href="https://github.com/demattosanthony"
            icon={githubIcon}
            label="GitHub"
          />
        </div>
      </div>
    </footer>
  );
}
