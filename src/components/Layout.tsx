import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { Store } from "lucide-react";

export function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 border-b bg-card shadow-sm">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <Store className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Product Marketplace
                </h1>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
