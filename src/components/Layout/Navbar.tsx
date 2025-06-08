import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">Data Manager</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="/products">Products</NavLink>
              <NavLink href="/price-plans">Price Plans</NavLink>
              <NavLink href="/pages">Pages</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: {
  href: string;
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    >
      {children}
    </Link>
  );
}