import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  MapPin, 
  Clock, 
  User,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Filter,
} from "lucide-react";
import { useState } from "react";

const mockLostItems = [
  {
    id: 1,
    title: "Black Leather Wallet",
    description: "Lost near library entrance. Contains ID card and some cash.",
    location: "Central Library",
    date: "Feb 5, 2026",
    time: "3:30 PM",
    status: "active",
    category: "Wallet",
    reportedBy: "Rahul S.",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Blue Water Bottle",
    description: "Milton 1L steel bottle with stickers",
    location: "Lecture Hall 5",
    date: "Feb 4, 2026",
    time: "11:00 AM",
    status: "matched",
    category: "Accessories",
    reportedBy: "Priya M.",
    image: "/placeholder.svg",
  },
];

const mockFoundItems = [
  {
    id: 1,
    title: "Apple AirPods Case",
    description: "White AirPods case found on bench",
    location: "Sports Complex",
    date: "Feb 5, 2026",
    time: "5:00 PM",
    status: "active",
    category: "Electronics",
    foundBy: "Admin Office",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Blue Umbrella",
    description: "Large blue umbrella with wooden handle",
    location: "Cafeteria",
    date: "Feb 3, 2026",
    time: "1:00 PM",
    status: "claimed",
    category: "Accessories",
    foundBy: "Mess Staff",
    image: "/placeholder.svg",
  },
];

const categories = ["Electronics", "Wallet", "ID Card", "Books", "Accessories", "Clothing", "Other"];

const ItemCard = ({ item, type }: { item: any; type: "lost" | "found" }) => (
  <Card className="card-interactive overflow-hidden">
    <div className="flex flex-col sm:flex-row">
      <div className="relative h-32 w-full sm:h-auto sm:w-32 shrink-0 bg-muted">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
        <Badge
          className={`absolute top-2 left-2 ${
            item.status === "active"
              ? "bg-warning text-warning-foreground"
              : item.status === "matched"
              ? "bg-success text-success-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {item.status === "active" ? "Active" : item.status === "matched" ? "Matched!" : "Claimed"}
        </Badge>
      </div>
      <CardContent className="flex-1 p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold">{item.title}</h3>
            <Badge variant="outline">{item.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {item.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {item.date}, {item.time}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {type === "lost" ? item.reportedBy : item.foundBy}
            </span>
          </div>
          <div className="flex gap-2 pt-2">
            {item.status === "active" && (
              <>
                <Button size="sm" className="flex-1">
                  {type === "lost" ? "I Found This" : "This is Mine"}
                </Button>
                <Button size="sm" variant="outline">
                  Contact
                </Button>
              </>
            )}
            {item.status === "matched" && (
              <Button size="sm" variant="outline" className="gap-1">
                <CheckCircle className="h-4 w-4 text-success" />
                View Match
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </div>
  </Card>
);

const LostFound = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportType, setReportType] = useState<"lost" | "found">("lost");

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Lost & Found</h1>
            <p className="text-muted-foreground">Report or find missing items on campus</p>
          </div>
          <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Report Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Report an Item</DialogTitle>
                <DialogDescription>
                  Fill in the details to report a lost or found item
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex gap-2">
                  <Button
                    variant={reportType === "lost" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setReportType("lost")}
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    I Lost Something
                  </Button>
                  <Button
                    variant={reportType === "found" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setReportType("found")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    I Found Something
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Item Name</Label>
                  <Input id="title" placeholder="e.g., Black Leather Wallet" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Where was it lost/found?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide details to help identify the item..."
                    className="resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Upload Image (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReportOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsReportOpen(false)}>Submit Report</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">12</p>
            <p className="text-sm text-muted-foreground">Active Lost</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-info">8</p>
            <p className="text-sm text-muted-foreground">Items Found</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-success">23</p>
            <p className="text-sm text-muted-foreground">Matched This Month</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">89%</p>
            <p className="text-sm text-muted-foreground">Recovery Rate</p>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search items..." className="pl-9" />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="lost">
          <TabsList>
            <TabsTrigger value="lost" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Lost Items
            </TabsTrigger>
            <TabsTrigger value="found" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Found Items
            </TabsTrigger>
            <TabsTrigger value="my-reports">My Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="lost" className="mt-6 space-y-4">
            {mockLostItems.map((item) => (
              <ItemCard key={item.id} item={item} type="lost" />
            ))}
          </TabsContent>

          <TabsContent value="found" className="mt-6 space-y-4">
            {mockFoundItems.map((item) => (
              <ItemCard key={item.id} item={item} type="found" />
            ))}
          </TabsContent>

          <TabsContent value="my-reports" className="mt-6">
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">You haven't reported any items yet</p>
              <Button className="mt-4" onClick={() => setIsReportOpen(true)}>
                Report Your First Item
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default LostFound;
