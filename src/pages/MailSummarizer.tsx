import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  Calendar, 
  BookOpen, 
  PartyPopper,
  FileText,
  ChevronRight,
  Zap,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";

const mockEmails = [
  {
    id: 1,
    subject: "Important: Mid-Semester Examination Schedule Released",
    from: "Academic Office",
    date: "2 hours ago",
    category: "academic",
    priority: "urgent",
    originalLength: 450,
    summary: "Mid-sem exams start Feb 20. Check portal for your schedule. Bring ID cards.",
    actionItems: ["Download hall ticket by Feb 18", "Carry valid ID to exam"],
    deadline: "Feb 18, 2026",
  },
  {
    id: 2,
    subject: "Annual Tech Fest 'Innovate 2026' - Call for Volunteers",
    from: "Student Council",
    date: "5 hours ago",
    category: "events",
    priority: "normal",
    originalLength: 680,
    summary: "Tech fest on March 5-7. Volunteer registration open. Certificate & goodies provided.",
    actionItems: ["Register on portal if interested", "Attend orientation on Feb 25"],
    deadline: "Feb 22, 2026",
  },
  {
    id: 3,
    subject: "Hostel Maintenance: Water Supply Disruption Notice",
    from: "Hostel Administration",
    date: "1 day ago",
    category: "administrative",
    priority: "warning",
    originalLength: 230,
    summary: "Water supply off on Feb 8, 10 AM - 4 PM for tank cleaning. Store water beforehand.",
    actionItems: ["Store water before 10 AM"],
    deadline: "Feb 8, 2026",
  },
  {
    id: 4,
    subject: "Library Extended Hours During Exam Week",
    from: "Central Library",
    date: "2 days ago",
    category: "academic",
    priority: "info",
    originalLength: 180,
    summary: "Library open 24/7 from Feb 18-28. Night canteen available. Silence zones enforced.",
    actionItems: [],
  },
];

const categoryIcons: Record<string, typeof Mail> = {
  academic: BookOpen,
  events: PartyPopper,
  administrative: FileText,
  urgent: AlertCircle,
};

const categoryColors: Record<string, string> = {
  academic: "bg-info/10 text-info border-info/20",
  events: "bg-success/10 text-success border-success/20",
  administrative: "bg-warning/10 text-warning border-warning/20",
  urgent: "bg-destructive/10 text-destructive border-destructive/20",
};

const priorityColors: Record<string, string> = {
  urgent: "bg-destructive text-destructive-foreground",
  warning: "bg-warning text-warning-foreground",
  normal: "bg-secondary text-secondary-foreground",
  info: "bg-info text-info-foreground",
};

const MailSummarizer = () => {
  const [pasteEmail, setPasteEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSummarize = () => {
    if (!pasteEmail.trim()) return;
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Mail Summarizer</h1>
            <p className="text-muted-foreground">AI-powered email summaries with action items</p>
          </div>
          <Badge className="w-fit gap-1 bg-gradient-primary text-white border-0">
            <Sparkles className="h-3 w-3" />
            AI Powered
          </Badge>
        </div>

        {/* Quick Paste Section */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Paste & Summarize
            </CardTitle>
            <CardDescription>Paste any long email to get an instant AI summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your email content here..."
              className="min-h-[120px] resize-none"
              value={pasteEmail}
              onChange={(e) => setPasteEmail(e.target.value)}
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleSummarize} 
                disabled={!pasteEmail.trim() || isProcessing}
                className="gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Summarize
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Summaries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Summaries</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 w-[200px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="administrative">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-3">
              {mockEmails.map((email) => {
                const CategoryIcon = categoryIcons[email.category] || Mail;
                return (
                  <Card key={email.id} className="card-interactive">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="flex gap-3 flex-1">
                          <div className={`mt-1 rounded-lg p-2 ${categoryColors[email.category]}`}>
                            <CategoryIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-medium">{email.subject}</h3>
                              <Badge className={priorityColors[email.priority]} variant="secondary">
                                {email.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              From: {email.from} • {email.date}
                            </p>
                            
                            {/* AI Summary */}
                            <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="h-4 w-4 text-primary" />
                                <span className="text-xs font-medium text-primary">AI Summary</span>
                                <Badge variant="outline" className="text-2xs ml-auto">
                                  {email.originalLength} → {email.summary.length} chars
                                </Badge>
                              </div>
                              <p className="text-sm">{email.summary}</p>
                            </div>

                            {/* Action Items */}
                            {email.actionItems.length > 0 && (
                              <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground">Action Items:</p>
                                <ul className="space-y-1">
                                  {email.actionItems.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm">
                                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {email.deadline && (
                              <div className="flex items-center gap-2 text-sm text-warning">
                                <Calendar className="h-4 w-4" />
                                Deadline: {email.deadline}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="shrink-0">
                          View Full <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            {["academic", "events", "administrative"].map((category) => (
              <TabsContent key={category} value={category} className="mt-4 space-y-3">
                {mockEmails.filter(e => e.category === category).map((email) => {
                  const CategoryIcon = categoryIcons[email.category] || Mail;
                  return (
                    <Card key={email.id} className="card-interactive p-4">
                      <p className="font-medium">{email.subject}</p>
                      <p className="text-sm text-muted-foreground mt-1">{email.summary}</p>
                    </Card>
                  );
                })}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default MailSummarizer;
