import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Car, 
  Plus, 
  MapPin, 
  Clock, 
  Users,
  Calendar,
  ArrowRight,
  Phone,
  MessageCircle,
  IndianRupee,
  Plane,
  Train,
} from "lucide-react";

const mockRides = [
  {
    id: 1,
    from: "Campus Gate",
    to: "Airport",
    date: "Feb 8, 2026",
    time: "6:00 AM",
    type: "flight",
    seatsTotal: 4,
    seatsAvailable: 2,
    pricePerSeat: 400,
    driver: { name: "Arjun S.", avatar: "/placeholder.svg", rating: 4.8 },
    stops: ["Kormangala", "Indiranagar"],
  },
  {
    id: 2,
    from: "Campus",
    to: "Railway Station",
    date: "Feb 7, 2026",
    time: "4:00 PM",
    type: "train",
    seatsTotal: 3,
    seatsAvailable: 1,
    pricePerSeat: 150,
    driver: { name: "Neha P.", avatar: "/placeholder.svg", rating: 4.9 },
    stops: [],
  },
  {
    id: 3,
    from: "Airport",
    to: "Campus",
    date: "Feb 10, 2026",
    time: "11:00 PM",
    type: "flight",
    seatsTotal: 4,
    seatsAvailable: 3,
    pricePerSeat: 450,
    driver: { name: "Vikram R.", avatar: "/placeholder.svg", rating: 4.7 },
    stops: ["Whitefield"],
  },
];

const RideCard = ({ ride }: { ride: any }) => (
  <Card className="card-interactive">
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={ride.driver.avatar} />
            <AvatarFallback>{ride.driver.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{ride.driver.name}</p>
            <p className="text-xs text-muted-foreground">⭐ {ride.driver.rating}</p>
          </div>
        </div>
        <Badge variant="outline" className="gap-1">
          {ride.type === "flight" ? <Plane className="h-3 w-3" /> : <Train className="h-3 w-3" />}
          {ride.type === "flight" ? "Airport" : "Station"}
        </Badge>
      </div>

      {/* Route */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex flex-col items-center">
          <div className="h-3 w-3 rounded-full border-2 border-primary bg-background" />
          <div className="h-8 w-0.5 bg-border" />
          <div className="h-3 w-3 rounded-full bg-primary" />
        </div>
        <div className="flex-1">
          <p className="font-medium">{ride.from}</p>
          {ride.stops.length > 0 && (
            <p className="text-xs text-muted-foreground my-1">
              via {ride.stops.join(" → ")}
            </p>
          )}
          <p className="font-medium">{ride.to}</p>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {ride.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {ride.time}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {ride.seatsAvailable}/{ride.seatsTotal} seats
        </span>
      </div>

      {/* Seats Visualization */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: ride.seatsTotal }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < ride.seatsTotal - ride.seatsAvailable ? "bg-muted" : "bg-success"
            }`}
          />
        ))}
      </div>

      {/* Price & Actions */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold flex items-center">
            <IndianRupee className="h-4 w-4" />
            {ride.pricePerSeat}
          </span>
          <span className="text-xs text-muted-foreground">/seat</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button size="sm">Request Seat</Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CabPool = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Cab Pool</h1>
            <p className="text-muted-foreground">Share rides and split costs with fellow students</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Offer a Ride
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center bg-gradient-primary text-white">
            <p className="text-2xl font-bold">₹2,400</p>
            <p className="text-sm text-white/80">Saved this month</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-success">12</p>
            <p className="text-sm text-muted-foreground">Rides shared</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-info">4.9</p>
            <p className="text-sm text-muted-foreground">Your rating</p>
          </Card>
        </div>

        {/* Quick Search */}
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Campus" className="pl-9" />
                </div>
              </div>
              <ArrowRight className="hidden md:block text-muted-foreground" />
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Airport / Station" className="pl-9" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" />
              </div>
              <Button className="md:w-auto w-full">
                Search Rides
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="available">
          <TabsList>
            <TabsTrigger value="available">Available Rides</TabsTrigger>
            <TabsTrigger value="my-rides">My Rides</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-rides" className="mt-6">
            <Card className="p-8 text-center">
              <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">You haven't created any rides yet</p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Offer Your First Ride
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <Card className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No pending requests</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CabPool;
