import type { ReactNode } from "react";
import Header from "@/components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSideBar";

type Props = { children?: ReactNode };

const AdminLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="border w-full px-8 py-6">
          <Header />
        </header>
        <div className="w-full px-8 pt-8">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
