export function Footer() {
  return (
    <footer className="mt-8 border-t border-black/[.08] dark:border-white/[.145]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 text-center text-xs text-foreground/60">
        © {new Date().getFullYear()} ALX Polly. All rights reserved.
      </div>
    </footer>
  );
}


