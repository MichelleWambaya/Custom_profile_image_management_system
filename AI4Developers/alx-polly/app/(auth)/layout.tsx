export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md w-full p-6">
      {children}
    </div>
  );
}


