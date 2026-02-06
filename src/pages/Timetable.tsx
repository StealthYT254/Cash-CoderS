import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  MapPin,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeSlots = ["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"];

const mockSchedule = {
  Mon: [
    { time: "9:00", subject: "Data Structures", room: "LH-301", type: "lecture", duration: 2 },
    { time: "2:00", subject: "DBMS Lab", room: "Lab-4", type: "lab", duration: 3 },
  ],
  Tue: [
    { time: "8:00", subject: "Mathematics", room: "LH-201", type: "lecture", duration: 1 },
    { time: "10:00", subject: "Computer Networks", room: "LH-302", type: "lecture", duration: 2 },
    { time: "3:00", subject: "Soft Skills", room: "LH-101", type: "tutorial", duration: 1 },
  ],
  Wed: [
    { time: "9:00", subject: "Operating Systems", room: "LH-303", type: "lecture", duration: 2 },
    { time: "1:00", subject: "CN Lab", room: "Lab-3", type: "lab", duration: 3 },
  ],
  Thu: [
    { time: "8:00", subject: "Data Structures", room: "LH-301", type: "lecture", duration: 1 },
    { time: "10:00", subject: "DBMS", room: "LH-202", type: "lecture", duration: 2 },
    { time: "2:00", subject: "OS Lab", room: "Lab-2", type: "lab", duration: 3 },
  ],
  Fri: [
    { time: "9:00", subject: "Mathematics", room: "LH-201", type: "lecture", duration: 2 },
    { time: "12:00", subject: "Computer Networks", room: "LH-302", type: "tutorial", duration: 1 },
  ],
  Sat: [
    { time: "9:00", subject: "Extra Class", room: "LH-101", type: "lecture", duration: 2 },
  ],
};

const typeColors: Record<string, string> = {
  lecture: "bg-primary/10 border-primary/30 text-primary",
  lab: "bg-success/10 border-success/30 text-success",
  tutorial: "bg-warning/10 border-warning/30 text-warning",
};

const Timetable = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3);
  const todaySchedule = mockSchedule[today as keyof typeof mockSchedule] || [];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Timetable</h1>
            <p className="text-muted-foreground">Your weekly class schedule</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline">This Week</Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Today's Quick View */}
        <Card className="bg-gradient-primary text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Today's Classes</h3>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {todaySchedule.length} classes
              </Badge>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {todaySchedule.length > 0 ? (
                todaySchedule.map((cls, i) => (
                  <div key={i} className="shrink-0 rounded-lg bg-white/10 p-3 min-w-[140px]">
                    <p className="font-medium text-sm">{cls.subject}</p>
                    <p className="text-xs text-white/80">{cls.time} • {cls.room}</p>
                  </div>
                ))
              ) : (
                <p className="text-white/80">No classes today! 🎉</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="week">
          <TabsList>
            <TabsTrigger value="week">Week View</TabsTrigger>
            <TabsTrigger value="day">Day View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="mt-6">
            {/* Week Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  <div className="p-2 text-sm font-medium text-muted-foreground">Time</div>
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className={`p-2 text-center text-sm font-medium rounded-lg ${
                        day === today ? "bg-primary text-primary-foreground" : ""
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-7 gap-2 mb-2">
                    <div className="p-2 text-xs text-muted-foreground flex items-center">
                      {time}
                    </div>
                    {weekDays.map((day) => {
                      const classes = mockSchedule[day as keyof typeof mockSchedule] || [];
                      const cls = classes.find((c) => c.time === time);
                      
                      if (cls) {
                        return (
                          <Card
                            key={`${day}-${time}`}
                            className={`p-2 cursor-pointer border ${typeColors[cls.type]}`}
                            style={{ gridRow: `span ${cls.duration}` }}
                          >
                            <p className="text-xs font-medium line-clamp-1">{cls.subject}</p>
                            <p className="text-2xs text-muted-foreground">{cls.room}</p>
                          </Card>
                        );
                      }

                      // Check if this slot is occupied by a multi-hour class
                      const isOccupied = classes.some((c) => {
                        const startHour = parseInt(c.time.split(":")[0]);
                        const currentHour = parseInt(time.split(":")[0]);
                        return currentHour > startHour && currentHour < startHour + c.duration;
                      });

                      if (isOccupied) return null;

                      return (
                        <div
                          key={`${day}-${time}`}
                          className="h-16 rounded-lg border border-dashed border-muted hover:border-primary/50 transition-colors"
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="day" className="mt-6">
            <div className="space-y-3">
              {todaySchedule.map((cls, i) => (
                <Card key={i} className={`card-interactive border-l-4 ${typeColors[cls.type].replace('bg-', 'border-l-')}`}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-lg font-bold">{cls.time}</p>
                        <p className="text-xs text-muted-foreground">{cls.duration}h</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">{cls.subject}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {cls.room}
                        </div>
                      </div>
                    </div>
                    <Badge className={typeColors[cls.type]}>{cls.type}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <div className="space-y-4">
              {weekDays.map((day) => {
                const classes = mockSchedule[day as keyof typeof mockSchedule] || [];
                return (
                  <div key={day}>
                    <h3 className={`font-semibold mb-2 ${day === today ? "text-primary" : ""}`}>
                      {day} {day === today && "(Today)"}
                    </h3>
                    {classes.length > 0 ? (
                      <div className="space-y-2">
                        {classes.map((cls, i) => (
                          <Card key={i} className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{cls.subject}</p>
                                <p className="text-sm text-muted-foreground">
                                  {cls.time} • {cls.room}
                                </p>
                              </div>
                              <Badge variant="outline">{cls.type}</Badge>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No classes</p>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Timetable;
