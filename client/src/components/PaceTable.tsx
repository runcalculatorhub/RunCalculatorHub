import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PaceTableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export default function PaceTable({ headers, rows, caption }: PaceTableProps) {
  return (
    <div className="bg-white rounded-xl border border-card-border overflow-hidden" data-testid="pace-table">
      <div className="overflow-x-auto">
        <Table>
          {caption && <caption className="text-sm text-muted-foreground mt-2 mb-3 px-4 text-left">{caption}</caption>}
          <TableHeader>
            <TableRow className="bg-primary/4 border-b border-card-border">
              {headers.map((header, i) => (
                <TableHead key={i} className="text-xs font-semibold text-foreground uppercase tracking-wider whitespace-nowrap">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i} className="border-b border-card-border/60 hover:bg-accent/30 transition-colors">
                {row.map((cell, j) => (
                  <TableCell key={j} className="text-sm text-foreground whitespace-nowrap py-2.5">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
