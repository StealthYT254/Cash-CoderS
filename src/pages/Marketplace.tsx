import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  Heart,
  MessageCircle,
  Share2,
  Filter,
  Grid,
  List,
  Tag,
  IndianRupee,
} from "lucide-react";
import { useState } from "react";

const mockListings = [
  {
    id: 1,
    title: "Engineering Mathematics Textbook",
    description: "Kreyszig 10th Edition. Good condition with some highlights.",
    price: 350,
    originalPrice: 850,
    category: "Books",
    condition: "Good",
    seller: "Amit K.",
    postedDate: "2 days ago",
    image: "/placeholder.svg",
    liked: false,
    views: 45,
  },
  {
    id: 2,
    title: "HP Laptop Charger",
    description: "65W charger, works perfectly. Compatible with most HP laptops.",
    price: 500,
    originalPrice: 1200,
    category: "Electronics",
    condition: "Like New",
    seller: "Sneha R.",
    postedDate: "1 week ago",
    image: "/placeholder.svg",
    liked: true,
    views: 89,
  },
  {
    id: 3,
    title: "Study Table with Chair",
    description: "Wooden study table with cushion chair. Perfect for hostel room.",
    price: 1500,
    originalPrice: 4000,
    category: "Furniture",
    condition: "Good",
    seller: "Graduating Senior",
    postedDate: "3 days ago",
    image: "/placeholder.svg",
    liked: false,
    views: 156,
  },
  {
    id: 4,
    title: "Firefox Cycle",
    description: "26 inch cycle, used for 1 year. Minor scratches.",
    price: 3000,
    originalPrice: 8000,
    category: "Vehicles",
    condition: "Fair",
    seller: "Rohan M.",
    postedDate: "5 days ago",
    image: "/placeholder.svg",
    liked: false,
    views: 234,
  },
];

const categories = ["All", "Books", "Electronics", "Furniture", "Vehicles", "Clothing", "Sports", "Other"];

const ListingCard = ({ listing, viewMode }: { listing: any; viewMode: "grid" | "list" }) => {
  const [liked, setLiked] = useState(listing.liked);
  const discount = Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100);

  if (viewMode === "list") {
    return (
      <Card className="card-interactive overflow-hidden">
        <div className="flex">
          <div className="relative h-32 w-32 shrink-0 bg-muted">
            <img src={listing.image} alt={listing.title} className="h-full w-full object-cover" />
            <Badge className="absolute top-2 left-2 bg-success text-success-foreground">
              {discount}% OFF
            </Badge>
          </div>
          <CardContent className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{listing.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{listing.description}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setLiked(!liked)}>
                <Heart className={`h-5 w-5 ${liked ? "fill-destructive text-destructive" : ""}`} />
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold text-primary flex items-center">
                <IndianRupee className="h-4 w-4" />
                {listing.price}
              </span>
              <span className="text-sm text-muted-foreground line-through">₹{listing.originalPrice}</span>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <Badge variant="outline">{listing.condition}</Badge>
              <span>{listing.seller}</span>
              <span>{listing.postedDate}</span>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="card-interactive overflow-hidden">
      <div className="relative aspect-square bg-muted">
        <img src={listing.image} alt={listing.title} className="h-full w-full object-cover" />
        <Badge className="absolute top-2 left-2 bg-success text-success-foreground">
          {discount}% OFF
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
          onClick={() => setLiked(!liked)}
        >
          <Heart className={`h-5 w-5 ${liked ? "fill-destructive text-destructive" : ""}`} />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary flex items-center">
              <IndianRupee className="h-4 w-4" />
              {listing.price}
            </span>
            <span className="text-xs text-muted-foreground line-through">₹{listing.originalPrice}</span>
          </div>
          <Badge variant="outline">{listing.condition}</Badge>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{listing.seller}</span>
          <span>{listing.views} views</span>
        </div>
        <div className="mt-3 flex gap-2">
          <Button size="sm" className="flex-1">
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Marketplace = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Marketplace</h1>
            <p className="text-muted-foreground">Buy and sell within campus community</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Sell Something
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search marketplace..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="recent">
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories Quick Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === "All" ? "default" : "outline"}
              size="sm"
              className="shrink-0"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="browse">
          <TabsList>
            <TabsTrigger value="browse">Browse All</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-6">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  : "space-y-4"
              }
            >
              {mockListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} viewMode={viewMode} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="mt-6">
            <Card className="p-8 text-center">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your wishlist is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Like items to save them here</p>
            </Card>
          </TabsContent>

          <TabsContent value="my-listings" className="mt-6">
            <Card className="p-8 text-center">
              <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">You haven't listed anything yet</p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Listing
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Marketplace;
