import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ThumbsUp, ThumbsDown, Clock, Users, Flame, Leaf } from "lucide-react";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const menuData = {
  Monday: {
    breakfast: { items: ["Aloo Paratha", "Curd", "Pickle", "Tea/Coffee"], time: "7:30 - 9:30 AM", rating: 4.2 },
    lunch: { items: ["Rice", "Dal Tadka", "Paneer Butter Masala", "Roti", "Salad"], time: "12:30 - 2:30 PM", rating: 4.5 },
    snacks: { items: ["Samosa", "Tea", "Biscuits"], time: "5:00 - 6:00 PM", rating: 3.8 },
    dinner: { items: ["Chapati", "Mixed Veg", "Rice", "Dal Fry", "Sweet"], time: "7:30 - 9:30 PM", rating: 4.0 },
  },
  Tuesday: {
    breakfast: { items: ["Poha", "Boiled Eggs", "Bread Butter", "Milk"], time: "7:30 - 9:30 AM", rating: 4.0 },
    lunch: { items: ["Rice", "Rajma", "Aloo Gobi", "Roti", "Papad"], time: "12:30 - 2:30 PM", rating: 4.3 },
    snacks: { items: ["Pakoras", "Chutney", "Tea"], time: "5:00 - 6:00 PM", rating: 4.1 },
    dinner: { items: ["Puri", "Chole", "Rice", "Raita"], time: "7:30 - 9:30 PM", rating: 4.4 },
  },
};

const MealCard = ({ meal, data, isCurrentMeal }: { meal: string; data: any; isCurrentMeal: boolean }) => (
  <Card className={`card-interactive ${isCurrentMeal ? 'ring-2 ring-primary' : ''}`}>
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg capitalize">{meal}</CardTitle>
          {isCurrentMeal && <Badge className="bg-primary animate-pulse">Now Serving</Badge>}
        </div>
        <div className="flex items-center gap-1 text-warning">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium">{data.rating}</span>
        </div>
      </div>
      <CardDescription className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {data.time}
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {data.items.map((item: string, i: number) => (
          <Badge key={i} variant="secondary" className="text-xs">
            {item}
          </Badge>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            ~120 eating
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-4 w-4 text-orange-500" />
            450 cal
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-success hover:text-success hover:bg-success/10">
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10">
            <ThumbsDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const MessMenu = () => {
  const today = weekDays[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const currentHour = new Date().getHours();
  
  const getCurrentMeal = () => {
    if (currentHour >= 7 && currentHour < 10) return "breakfast";
    if (currentHour >= 12 && currentHour < 15) return "lunch";
    if (currentHour >= 17 && currentHour < 18) return "snacks";
    if (currentHour >= 19 && currentHour < 22) return "dinner";
    return null;
  };

  const currentMeal = getCurrentMeal();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Mess Menu</h1>
            <p className="text-muted-foreground">See what's cooking and rate your meals</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="gap-1">
              <Leaf className="h-3 w-3 text-success" />
              Veg Options Available
            </Badge>
          </div>
        </div>

        {/* Crowd Level Indicator */}
        <Card className="bg-gradient-accent text-white">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6" />
              <div>
                <p className="font-semibold">Current Crowd Level: Moderate</p>
                <p className="text-sm text-white/80">Best time to visit: 1:30 PM - 2:00 PM</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              ~85 people
            </Badge>
          </CardContent>
        </Card>

        <Tabs defaultValue={today} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            {weekDays.map((day) => (
              <TabsTrigger key={day} value={day} className="min-w-[100px]">
                {day.slice(0, 3)}
                {day === today && <span className="ml-1 text-xs">(Today)</span>}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(menuData).map(([day, meals]) => (
            <TabsContent key={day} value={day} className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(meals).map(([meal, data]) => (
                  <MealCard
                    key={meal}
                    meal={meal}
                    data={data}
                    isCurrentMeal={day === today && meal === currentMeal}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
          
          {/* Placeholder for other days */}
          {weekDays.filter(d => !["Monday", "Tuesday"].includes(d)).map(day => (
            <TabsContent key={day} value={day} className="mt-6">
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Menu for {day} will be available soon</p>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MessMenu;
