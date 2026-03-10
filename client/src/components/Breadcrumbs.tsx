import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4" data-testid="breadcrumbs">
      <Link href="/">
        <span className="hover:text-primary cursor-pointer transition-colors" data-testid="breadcrumb-home">
          <Home className="w-3.5 h-3.5" />
        </span>
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
          {crumb.path ? (
            <Link href={crumb.path}>
              <span className="hover:text-primary cursor-pointer transition-colors" data-testid={`breadcrumb-${i}`}>
                {crumb.label}
              </span>
            </Link>
          ) : (
            <span className="text-foreground font-medium" data-testid={`breadcrumb-${i}`}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
