"use client";
import { useState, useEffect } from "react";
import {
  Home,
  CodeXml,
  FileCode,
  Database,
  Settings,
  Menu,
  ChevronLeft,
  Chrome,
  Calendar,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { websiteName } from "@/data/BasicSettings";

// Menu items.
const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Calendar", url: "/calendar", icon: Calendar },
];

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size and set mobile state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setIsCollapsed(true);
  }, [isMobile]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="relative flex h-screen">
      {/* Sidebar */}
      <Sidebar
        className={`h-full bg-gray-900 text-white transition-all duration-300 shadow-lg ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <SidebarContent>
          {/* Sidebar Header */}
          <SidebarGroup>
            <SidebarGroupLabel
              className={`text-lg font-semibold px-4 py-3 transition pb-10 ${
                isCollapsed ? "hidden" : "block"
              }`}
            >
              <Link href="/" className="flex gap-2">
                <Image src="logo.svg" width={30} height={30} /> <span></span>
                {websiteName}
              </Link>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(({ title, url, icon: Icon }) => (
                  <SidebarMenuItem key={title} className="p-1 ">
                    <SidebarMenuButton asChild>
                      <a
                        href={url}
                        className="flex items-center space-x-3 px-4 py-1 text-black hover:bg-gray-800 rounded-md transition"
                      >
                        <Icon size={40} /> {/* Increased icon size */}
                        {!isCollapsed && (
                          <span className="text-sm">{title}</span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-0 p-2 bg-gray-800 text-white rounded-full transform translate-x-1/2 hover:bg-gray-700 transition"
        >
          {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
        </button>
      </Sidebar>

      {/* Overlay for mobile (opens menu on small screens) */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
