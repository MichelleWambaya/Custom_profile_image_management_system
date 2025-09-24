import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-black/[.08] dark:border-white/[.145] bg-background text-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return <div className={cn("p-4 sm:p-6", props.className)} {...props} />;
}

export function CardTitle(
  props: React.HTMLAttributes<HTMLHeadingElement>
) {
  return <h3 className={cn("text-base font-semibold", props.className)} {...props} />;
}

export function CardContent(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return <div className={cn("p-4 sm:p-6 pt-0", props.className)} {...props} />;
}


