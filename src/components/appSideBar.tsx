import {
  CircleCheck,
  ListTodo,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Plus, Folder, SquareCheckBig } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader  className="pt-6">
        <div className="flex gap-2">
          <SquareCheckBig />
          Todo List
        </div>
        <Card className="p-4 mt-4 mb-4">
          <CardContent className="px-2 flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <ListTodo size={20} strokeWidth={2} /> All tasks
              </div>
              <p>1</p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <CircleCheck size={20} strokeWidth={2} /> All done
              </div>
              <p>1</p>
            </div>
          </CardContent>
          </Card>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <Button
          variant="ghost"
          className="mx-3 justify-start flex font-normal"
        >
          <ListTodo size={20} strokeWidth={2} /> All tasks
        </Button>
        <SidebarGroup className="pt-0">
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <Plus className="cursor-pointer" />{" "}
            <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="All Tasks">
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Folder size={20} strokeWidth={2} />
                    <span>All Tasks</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
