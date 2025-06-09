import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Data Management Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <Card
          title="Products"
          href="/products"
          description="Manage product catalog"
        />
        <Card
          title="Price Plans"
          href="/price-plans"
          description="Manage pricing strategies"
        />
        <Card title="Pages" href="/pages" description="Manage content pages" />
      </div>
    </div>
  );
}

function Card({
  title,
  href,
  description,
}: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
