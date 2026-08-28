import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { verifyAdminSession } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication check: redirects to /login if unauthenticated
  await verifyAdminSession();

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full flex-1 flex flex-col min-h-screen bg-background font-sans">
          <div className="flex items-center p-4 border-b border-border/40 md:hidden">
            <SidebarTrigger />
            <span className="ml-2 font-semibold text-sm">Admin Menu</span>
          </div>
          <div className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}