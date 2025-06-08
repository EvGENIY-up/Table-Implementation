import Navbar from '@/components/Layout/Navbar';

export default function DashboardLayout({children}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}