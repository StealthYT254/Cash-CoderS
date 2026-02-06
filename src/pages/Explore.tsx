import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Star, 
  Clock, 
  Phone,
  Navigation,
  Coffee,
  Utensils,
  ShoppingBag,
  Dumbbell,
  BookOpen,
  Wifi,
  CreditCard,
  Heart,
  Filter,
  Search,
} from "lucide-react";
import { useState } from "react";

const mockPlaces = [
  {
    id: 1,
    name: "The Study Cafe",
    category: "Cafe",
    description: "Quiet cafe perfect for studying with good WiFi",
    distance: "0.5 km",
    rating: 4.6,
    reviews: 128,
    priceRange: "₹₹",
    vibes: ["study-friendly", "quiet", "wifi"],
    image: "/placeholder.svg",
    timing: "8 AM - 11 PM",
    hasDiscount: true,
    discountText: "10% off for students",
  },
  {
    id: 2,
    name: "Domino's Pizza",
    category: "Restaurant",
    description: "Fast delivery, late night open",
    distance: "0.3 km",
    rating: 4.2,
    reviews: 456,
    priceRange: "₹₹",
    vibes: ["late-night", "delivery"],
    image: "/placeholder.svg",
    timing: "11 AM - 1 AM",
    hasDiscount: false,
  },
  {
    id: 3,
    name: "Campus Gym",
    category: "Fitness",
    description: "Well-equipped gym with trainers",
    distance: "On Campus",
    rating: 4.4,
    reviews: 89,
    priceRange: "Free",
    vibes: ["fitness", "morning"],
    image: "/placeholder.svg",
    timing: "6 AM - 10 PM",
    hasDiscount: false,
  },
  {
    id: 4,
    name: "Chai Point",
    category: "Cafe",
    description: "Best cutting chai near campus",
    distance: "0.2 km",
    rating: 4.5,
    reviews: 234,
    priceRange: "₹",
    vibes: ["budget", "quick-bite"],
    image: "/placeholder.svg",
    timing: "7 AM - 10 PM",
    hasDiscount: true,
    discountText: "Free samosa on orders above ₹50",
  },
];

const categories = [
  { name: "All", icon: MapPin },
  { name: "Cafes", icon: Coffee },
  { name: "Food", icon: Utensils },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Fitness", icon: Dumbbell },
  { name: "Study Spots", icon: BookOpen },
];

const vibeColors: Record<string, string> = {
  "study-friendly": "bg-info/10 text-info",
  "quiet": "bg-muted text-muted-foreground",
  "wifi": "bg-primary/10 text-primary",
  "late-night": "bg-purple-500/10 text-purple-500",
  "delivery": "bg-success/10 text-success",
  "fitness": "bg-orange-500/10 text-orange-500",
  "budget": "bg-success/10 text-success",
  "quick-bite": "bg-warning/10 text-warning",
};

const PlaceCard = ({ place }: { place: any }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="card-interactive overflow-hidden">
      <div className="relative h-40 bg-muted">
        <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
        {place.hasDiscount && (
          <Badge className="absolute top-2 left-2 bg-success text-success-foreground gap-1">
            <CreditCard className="h-3 w-3" />
            Student Discount
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
          onClick={() => setLiked(!liked)}
        >
          <Heart className={`h-5 w-5 ${liked ? "fill-destructive text-destructive" : ""}`} />
        </Button>
        <Badge className="absolute bottom-2 right-2" variant="secondary">
          {place.distance}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{place.name}</h3>
            <p className="text-sm text-muted-foreground">{place.category}</p>
          </div>
          <div className="flex items-center gap-1 text-warning">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-medium">{place.rating}</span>
            <span className="text-xs text-muted-foreground">({place.reviews})</span>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{place.description}</p>
        
        {/* Vibes */}
        <div className="mt-3 flex flex-wrap gap-1">
          {place.vibes.map((vibe: string) => (
            <Badge key={vibe} variant="outline" className={`text-2xs ${vibeColors[vibe] || ""}`}>
              {vibe}
            </Badge>
          ))}
        </div>

        {/* Discount */}
        {place.hasDiscount && (
          <p className="mt-2 text-xs text-success font-medium">🎉 {place.discountText}</p>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {place.timing}
          </span>
          <span className="font-medium">{place.priceRange}</span>
        </div>

        <div className="mt-3 flex gap-2">
          <Button size="sm" className="flex-1 gap-1">
            <Navigation className="h-4 w-4" />
            Navigate
          </Button>
          <Button size="sm" variant="outline">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Explorer's Guide</h1>
            <p className="text-muted-foreground">Discover places around campus</p>
          </div>
          <Badge variant="outline" className="w-fit gap-1">
            <Wifi className="h-3 w-3" />
            GPS Active
          </Badge>
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search places, cuisines, vibes..." className="pl-9" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat.name}
              variant={selectedCategory === cat.name ? "default" : "outline"}
              size="sm"
              className="shrink-0 gap-2"
              onClick={() => setSelectedCategory(cat.name)}
            >
              <cat.icon className="h-4 w-4" />
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Map Placeholder */}
        <Card className="h-48 bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Interactive map coming soon</p>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="nearby">
          <TabsList>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="discounts">Student Discounts</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="nearby" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discounts" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockPlaces.filter(p => p.hasDiscount).map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <Card className="p-8 text-center">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No saved places yet</p>
              <p className="text-sm text-muted-foreground mt-1">Like places to save them here</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Explore;
