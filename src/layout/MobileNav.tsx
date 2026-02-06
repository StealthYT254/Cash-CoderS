import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Utensils,
  ShoppingBag,
  MapPin,
  BookOpen,
  MoreHorizontal,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const mainNavItems = [
  { title: "Home", icon: LayoutDashboard, href: "/" },
  { title: "Mess", icon: Utensils, href: "/mess-menu" },
  { title: "Exchange", icon: ShoppingBag, href: "/marketplace" },
  { title: "Explore", icon: MapPin, href: "/explore" },
  { title: "More", icon: MoreHorizontal, href: "#more" },
];

const moreItems = [
  { title: "Mail Summarizer", href: "/mail-summarizer" },
  { title: "Lost & Found", href: "/lost-found" },
  { title: "Cab Pool", href: "/cab-pool" },
  { title: "Timetable", href: "/timetable" },
  { title: "Assignments", href: "/assignments" },
  { title: "Personal Space", href: "/personal-space" },
  { title: "Settings", href: "/settings" },
];

export function MobileNav() {
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center justify-around px-2 pb-safe">
        {mainNavItems.map((item) => {
          const isActive = item.href === location.pathname;
          const Icon = item.icon;

          if (item.href === "#more") {
            return (
              <Sheet key={item.title} open={moreOpen} onOpenChange={setMoreOpen}>
                <SheetTrigger asChild>
                  <button
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                      "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-2xs font-medium">{item.title}</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-auto max-h-[70vh]">
                  <SheetHeader>
                    <SheetTitle>More Options</SheetTitle>
                  </SheetHeader>
                  <div className="grid grid-cols-2 gap-3 py-4">
                    {moreItems.map((moreItem) => (
                      <Link
                        key={moreItem.title}
                        to={moreItem.href}
                        onClick={() => setMoreOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start h-12",
                            location.pathname === moreItem.href && "bg-primary/10 border-primary"
                          )}
                        >
                          {moreItem.title}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            );
          }

          return (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
              <span className={cn("text-2xs font-medium", isActive && "text-primary")}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
