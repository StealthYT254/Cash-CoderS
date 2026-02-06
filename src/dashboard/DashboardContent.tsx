import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Utensils,
  Mail,
  Search,
  ShoppingBag,
  Car,
  MapPin,
  Calendar,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { title: "Mess Menu", icon: Utensils, href: "/mess-menu", color: "bg-orange-500" },
  { title: "Lost & Found", icon: Search, href: "/lost-found", color: "bg-red-500" },
  { title: "Marketplace", icon: ShoppingBag, href: "/marketplace", color: "bg-green-500" },
  { title: "Cab Pool", icon: Car, href: "/cab-pool", color: "bg-blue-500" },
  { title: "Explore", icon: MapPin, href: "/explore", color: "bg-purple-500" },
  { title: "Timetable", icon: Calendar, href: "/timetable", color: "bg-teal-500" },
];

const todayMeals = [
  { meal: "Breakfast", time: "7:30 - 9:30 AM", items: "Paratha, Chole, Curd, Tea", status: "completed" },
  { meal: "Lunch", time: "12:30 - 2:30 PM", items: "Rice, Dal, Paneer, Roti, Salad", status: "current" },
  { meal: "Snacks", time: "5:00 - 6:00 PM", items: "Samosa, Tea, Biscuits", status: "upcoming" },
  { meal: "Dinner", time: "7:30 - 9:30 PM", items: "Chapati, Sabzi, Rice, Dal", status: "upcoming" },
];

const recentAnnouncements = [
  {
    title: "Library Extended Hours",
    category: "Academic",
    time: "2 hours ago",
    priority: "info",
  },
  {
    title: "Hostel Maintenance Notice",
    category: "Administrative",
    time: "5 hours ago",
    priority: "warning",
  },
  {
    title: "Exam Schedule Released",
    category: "Academic",
    time: "1 day ago",
    priority: "urgent",
  },
];

const upcomingEvents = [
  { title: "AI Workshop", date: "Tomorrow", time: "3:00 PM" },
  { title: "Cultural Fest", date: "Feb 15", time: "All Day" },
  { title: "Placement Drive", date: "Feb 18", time: "9:00 AM" },
];

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Good Afternoon, John! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening on campus today</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1 px-3 py-1">
            <Clock className="h-3 w-3" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </Badge>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href}>
              <Card className="card-interactive h-full">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  <div className={`mb-2 rounded-xl p-3 ${action.color}`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium md:text-sm">{action.title}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Mess Menu */}
        <Card className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Today's Mess Menu</CardTitle>
              <CardDescription>What's cooking in the mess</CardDescription>
            </div>
            <Link to="/mess-menu">
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayMeals.map((meal) => (
              <div
                key={meal.meal}
                className={`flex items-start justify-between rounded-lg p-3 ${
                  meal.status === "current"
                    ? "bg-primary/10 border border-primary/20"
                    : meal.status === "completed"
                    ? "bg-muted/50 opacity-60"
                    : "bg-muted/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${
                      meal.status === "current"
                        ? "bg-primary animate-pulse"
                        : meal.status === "completed"
                        ? "bg-muted-foreground"
                        : "bg-muted-foreground/50"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{meal.meal}</p>
                    <p className="text-xs text-muted-foreground">{meal.time}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{meal.items}</p>
                  </div>
                </div>
                {meal.status === "current" && (
                  <Badge className="bg-primary">Now</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mail & Announcements */}
        <Card className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Recent Announcements</CardTitle>
              <CardDescription>AI-summarized for you</CardDescription>
            </div>
            <Link to="/mail-summarizer">
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAnnouncements.map((announcement, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div
                  className={`mt-0.5 rounded-full p-1.5 ${
                    announcement.priority === "urgent"
                      ? "bg-destructive/10 text-destructive"
                      : announcement.priority === "warning"
                      ? "bg-warning/10 text-warning"
                      : "bg-info/10 text-info"
                  }`}
                >
                  {announcement.priority === "urgent" ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : announcement.priority === "warning" ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{announcement.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary" className="text-2xs">
                      {announcement.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{announcement.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <CardDescription>Don't miss out</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date} • {event.time}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Remind Me
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-lg">Your Activity</CardTitle>
            <CardDescription>This week's highlights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                title="Assignments Due"
                value="3"
                icon={BookOpen}
                trend="+1 this week"
                trendUp={false}
              />
              <StatCard
                title="Cab Pool Rides"
                value="2"
                icon={Car}
                trend="₹240 saved"
                trendUp={true}
              />
              <StatCard
                title="Marketplace"
                value="5"
                icon={ShoppingBag}
                trend="Active listings"
              />
              <StatCard
                title="Lost Items"
                value="1"
                icon={Search}
                trend="1 matched!"
                trendUp={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Prompt */}
      <Card className="bg-gradient-primary text-white">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/20 p-3">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Need Help? Ask NexusBot!</h3>
              <p className="text-sm text-white/80">
                Get instant answers about campus, schedule, or anything else
              </p>
            </div>
          </div>
          <Button variant="secondary" className="shrink-0">
            Start Chatting
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
}: {
  title: string;
  value: string;
  icon: typeof BookOpen;
  trend: string;
  trendUp?: boolean;
}) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-muted-foreground" />
        {trendUp !== undefined && (
          <TrendingUp
            className={`h-4 w-4 ${trendUp ? "text-success" : "text-destructive"}`}
          />
        )}
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{trend}</p>
    </div>
  );
}
