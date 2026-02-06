import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  BookOpen, 
  Clock, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  FileText,
  Upload,
  Filter,
} from "lucide-react";

const mockAssignments = [
  {
    id: 1,
    title: "Data Structures Assignment 3",
    subject: "Data Structures",
    dueDate: "Feb 10, 2026",
    dueTime: "11:59 PM",
    status: "pending",
    progress: 60,
    totalMarks: 50,
    description: "Implement AVL trees and analyze time complexity",
    attachments: ["assignment3.pdf"],
  },
  {
    id: 2,
    title: "DBMS Lab Report",
    subject: "Database Management",
    dueDate: "Feb 8, 2026",
    dueTime: "5:00 PM",
    status: "pending",
    progress: 30,
    totalMarks: 30,
    description: "SQL queries practice and normalization exercises",
    attachments: [],
  },
  {
    id: 3,
    title: "CN Assignment 2",
    subject: "Computer Networks",
    dueDate: "Feb 5, 2026",
    dueTime: "11:59 PM",
    status: "submitted",
    progress: 100,
    totalMarks: 40,
    submittedAt: "Feb 4, 2026",
    description: "Network layer protocols analysis",
    attachments: ["cn_assignment.pdf"],
    grade: 35,
  },
  {
    id: 4,
    title: "OS Case Study",
    subject: "Operating Systems",
    dueDate: "Feb 3, 2026",
    dueTime: "5:00 PM",
    status: "graded",
    progress: 100,
    totalMarks: 25,
    submittedAt: "Feb 2, 2026",
    description: "Process scheduling algorithms comparison",
    grade: 22,
    feedback: "Good analysis. Could improve on real-world examples.",
  },
];

const getDaysRemaining = (dueDate: string) => {
  const due = new Date(dueDate);
  const now = new Date();
  const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
};

const AssignmentCard = ({ assignment }: { assignment: any }) => {
  const daysRemaining = getDaysRemaining(assignment.dueDate);
  const isOverdue = daysRemaining < 0 && assignment.status === "pending";
  const isUrgent = daysRemaining <= 2 && daysRemaining >= 0 && assignment.status === "pending";

  return (
    <Card className={`card-interactive ${isOverdue ? "border-destructive" : isUrgent ? "border-warning" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{assignment.title}</h3>
              {assignment.status === "pending" && isOverdue && (
                <Badge variant="destructive">Overdue</Badge>
              )}
              {assignment.status === "pending" && isUrgent && (
                <Badge className="bg-warning text-warning-foreground">Due Soon</Badge>
              )}
              {assignment.status === "submitted" && (
                <Badge className="bg-info text-info-foreground">Submitted</Badge>
              )}
              {assignment.status === "graded" && (
                <Badge className="bg-success text-success-foreground">Graded</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{assignment.subject}</p>
          </div>
          <Badge variant="outline">{assignment.totalMarks} marks</Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>

        {/* Due Date */}
        <div className="flex items-center gap-4 text-sm mb-3">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {assignment.dueDate}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            {assignment.dueTime}
          </span>
          {assignment.status === "pending" && !isOverdue && (
            <span className={`font-medium ${isUrgent ? "text-warning" : "text-muted-foreground"}`}>
              {daysRemaining === 0 ? "Due today!" : `${daysRemaining} days left`}
            </span>
          )}
        </div>

        {/* Progress for pending */}
        {assignment.status === "pending" && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-medium">{assignment.progress}%</span>
            </div>
            <Progress value={assignment.progress} className="h-2" />
          </div>
        )}

        {/* Grade for graded assignments */}
        {assignment.status === "graded" && (
          <div className="mb-3 p-3 rounded-lg bg-success/10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Grade</span>
              <span className="text-lg font-bold text-success">
                {assignment.grade}/{assignment.totalMarks}
              </span>
            </div>
            {assignment.feedback && (
              <p className="text-xs text-muted-foreground mt-2">{assignment.feedback}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {assignment.status === "pending" && (
            <>
              <Button size="sm" className="flex-1 gap-1">
                <Upload className="h-4 w-4" />
                Submit
              </Button>
              <Button size="sm" variant="outline">
                <FileText className="h-4 w-4" />
              </Button>
            </>
          )}
          {assignment.status === "submitted" && (
            <Button size="sm" variant="outline" className="w-full">
              View Submission
            </Button>
          )}
          {assignment.status === "graded" && (
            <Button size="sm" variant="outline" className="w-full">
              View Feedback
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Assignments = () => {
  const pendingCount = mockAssignments.filter(a => a.status === "pending").length;
  const submittedCount = mockAssignments.filter(a => a.status === "submitted").length;
  const gradedCount = mockAssignments.filter(a => a.status === "graded").length;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Assignments</h1>
            <p className="text-muted-foreground">Track and submit your coursework</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter by Subject
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <AlertCircle className="h-6 w-6 mx-auto text-warning mb-2" />
            <p className="text-2xl font-bold">{pendingCount}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </Card>
          <Card className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto text-info mb-2" />
            <p className="text-2xl font-bold">{submittedCount}</p>
            <p className="text-sm text-muted-foreground">Submitted</p>
          </Card>
          <Card className="p-4 text-center">
            <CheckCircle2 className="h-6 w-6 mx-auto text-success mb-2" />
            <p className="text-2xl font-bold">{gradedCount}</p>
            <p className="text-sm text-muted-foreground">Graded</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending" className="gap-1">
              Pending
              {pendingCount > 0 && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-2xs">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {mockAssignments.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {mockAssignments
                .filter((a) => a.status === "pending")
                .map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="submitted" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {mockAssignments
                .filter((a) => a.status === "submitted")
                .map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="graded" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {mockAssignments
                .filter((a) => a.status === "graded")
                .map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Assignments;
