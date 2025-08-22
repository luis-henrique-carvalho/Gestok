import { Button } from "@/components/ui/button";
import { getValidSession } from "@/lib/auth-utils";
import { CircleIcon } from "lucide-react";
import Link from "next/link";



const Header = async () => {
  const session = await getValidSession();

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-primary" />
          <h2 className="ml-2 text-xl font-semibold text-gray-900">Ge<span className="text-primary">stok</span></h2>
        </Link>
        <div className="flex items-center space-x-4">
          <Button asChild className="rounded-full">
            {session ? (
              <Link href="/dashboard">Dashboard</Link>
            ) : (
              <Link href="/login">Entrar</Link>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full">
      <Header />
      {children}
    </section>
  );
}
