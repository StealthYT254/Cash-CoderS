import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Utensils,
  Mail,
  Search,
  ShoppingBag,
  Car,
  MapPin,
  Calendar,
  BookOpen,
  FolderOpen,
  Bot,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Daily Pulse",
    icon: Zap,
    children: [
      { title: "Mess Menu", icon: Utensils, href: "/mess-menu" },
      { title: "Mail Summarizer", icon: Mail, href: "/mail-summarizer" },
    ],
  },
  {
    title: "Student Exchange",
    icon: ShoppingBag,
    children: [
      { title: "Lost & Found", icon: Search, href: "/lost-found" },
      { title: "Marketplace", icon: ShoppingBag, href: "/marketplace" },
      { title: "Cab Pool", icon: Car, href: "/cab-pool" },
    ],
  },
  {
    title: "Explorer's Guide",
    icon: MapPin,
    href: "/explore",
  },
  {
    title: "Academic Cockpit",
    icon: BookOpen,
    children: [
      { title: "Timetable", icon: Calendar, href: "/timetable" },
      { title: "Assignments", icon: BookOpen, href: "/assignments" },
    ],
  },
  {
    title: "Personal Space",
    icon: FolderOpen,
    href: "/personal-space",
  },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  const renderNavItem = (item: typeof navItems[0], isChild = false) => {
    const isActive = item.href === location.pathname;
    const Icon = item.icon;

    const linkContent = (
      <Link
        to={item.href || "#"}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive && "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm",
          isChild && "ml-6",
          collapsed && !isChild && "justify-center px-2"
        )}
      >
        <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-sidebar-primary-foreground")} />
        {!collapsed && <span className="truncate">{item.title}</span>}
      </Link>
    );

    if (collapsed && !isChild) {
      return (
        <Tooltip key={item.title} delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.title}
          </TooltipContent>
        </Tooltip>
      );
    }

    return <div key={item.title}>{linkContent}</div>;
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo & Brand */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">Nexus</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8 shrink-0 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.title} className="space-y-1">
                    {!collapsed && (
                      <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                        {item.title}
                      </div>
                    )}
                    {item.children.map((child) => renderNavItem(child, false))}
                  </div>
                );
              }
              return renderNavItem(item);
            })}
          </nav>
        </ScrollArea>

        {/* AI Assistant Button */}
        <div className="border-t border-sidebar-border p-3">
          {collapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full border-sidebar-primary/50 bg-sidebar-accent text-sidebar-primary hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                >
                  <Bot className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">NexusBot AI Assistant</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              className="w-full bg-gradient-primary text-white hover:opacity-90"
            >
              <Bot className="mr-2 h-5 w-5" />
              Ask NexusBot
            </Button>
          )}
        </div>

        {/* Settings & Logout */}
        <div className="border-t border-sidebar-border p-3">
          <div className="space-y-1">
            {renderNavItem({ title: "Settings", icon: Settings, href: "/settings" })}
            <button
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                "text-destructive hover:bg-destructive/10",
                collapsed && "justify-center px-2"
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
