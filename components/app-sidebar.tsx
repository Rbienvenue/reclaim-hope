"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon, VideoIcon, File, LogOut } from "lucide-react"
import { FaChild } from "react-icons/fa6"
import { GoSponsorTiers } from "react-icons/go"
import { SiMediapipe } from "react-icons/si"
import { Button } from "./ui/button"
import Image from "next/image"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Children",
      url: "/admin/children",
      icon: (
        <FaChild/>
      ),
    },
    {
      title: "Sponsors",
      url: "/admin/sponsors",
      icon: (
        <GoSponsorTiers/>
    
      ),
    },
    {
      title: "Media",
      url: "/admin/media",
      icon: (
        <VideoIcon
        />
      ),
    },
    {
      title: "Documents",
      url: "/admin/documents",
      icon: (
        <File
        />
      ),
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Image
                alt="reclaim hope logo"
                src="/logo.png"
                width={160}
                height={60}
                className="h-[120px] w-auto object-contain"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent >
        <NavMain  items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Button><LogOut/> Logout</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
