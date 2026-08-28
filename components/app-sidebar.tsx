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
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon, VideoIcon, File, LogOut, Mail, ClipboardList, UsersRound, HandCoins, CreditCard } from "lucide-react"
import { FaChild } from "react-icons/fa6"
import { GoSponsorTiers } from "react-icons/go"
import { SiMediapipe } from "react-icons/si"
import { Button } from "./ui/button"
import Image from "next/image"
import { logoutAction } from "@/app/actions/auth"
import { Loader2 } from "lucide-react"

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
      title: "Donors",
      url: "/admin/donors",
      icon: (
        <UsersRound />
      ),
    },
    {
      title: "Donations",
      url: "/admin/donations",
      icon: (
        <HandCoins />
      ),
    },
    {
      title: "Payments",
      url: "/admin/payments",
      icon: (
        <CreditCard />
      ),
    },
    {
      title: "Newsletters",
      url: "/admin/newsletters",
      icon: (
        <Mail />
      ),
    },
    {
      title: "Reports",
      url: "/admin/reports",
      icon: (
        <ClipboardList />
      ),
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isLoggingOut, startLogout] = React.useTransition();

  const handleLogout = () => {
    startLogout(async () => {
      await logoutAction();
    });
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <Image
                alt="reclaim hope logo"
                src="/logo.png"
                width={100}
                height={100}
                className="h-[160px] w-[160px] rounded-full object-contain "
              />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent >
        <NavMain  items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full justify-center gap-2 cursor-pointer hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Logging out...</span>
            </>
          ) : (
            <>
              <LogOut className="size-4" />
              <span>Logout</span>
            </>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
