import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FolderOpen, 
  FileText, 
  Upload, 
  Search, 
  Plus,
  MoreVertical,
  File,
  Image,
  FileSpreadsheet,
  Presentation,
  Download,
  Trash2,
  Grid,
  List,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const mockFolders = [
  { id: 1, name: "Semester 5", files: 24, updated: "2 days ago" },
  { id: 2, name: "Project Reports", files: 8, updated: "1 week ago" },
  { id: 3, name: "Lab Manuals", files: 12, updated: "3 days ago" },
  { id: 4, name: "Exam Notes", files: 45, updated: "1 day ago" },
];

const mockFiles = [
  { id: 1, name: "DSA Notes Chapter 5.pdf", type: "pdf", size: "2.4 MB", updated: "Yesterday" },
  { id: 2, name: "DBMS ER Diagram.png", type: "image", size: "856 KB", updated: "3 days ago" },
  { id: 3, name: "Project Report Draft.docx", type: "doc", size: "1.2 MB", updated: "1 week ago" },
  { id: 4, name: "Presentation Final.pptx", type: "ppt", size: "5.8 MB", updated: "2 days ago" },
  { id: 5, name: "Marks Sheet.xlsx", type: "sheet", size: "124 KB", updated: "1 month ago" },
];

const fileIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  image: Image,
  doc: FileText,
  ppt: Presentation,
  sheet: FileSpreadsheet,
  default: File,
};

const fileColors: Record<string, string> = {
  pdf: "text-red-500",
  image: "text-green-500",
  doc: "text-blue-500",
  ppt: "text-orange-500",
  sheet: "text-emerald-500",
  default: "text-muted-foreground",
};

const PersonalSpace = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Personal Space</h1>
            <p className="text-muted-foreground">Your documents and notes organized</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              New Folder
            </Button>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>

        {/* Storage Stats */}
        <Card className="bg-gradient-primary text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Storage Used</p>
                <p className="text-2xl font-bold">2.4 GB / 5 GB</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/80">48% used</p>
                <Button variant="secondary" size="sm" className="mt-2">
                  Upgrade
                </Button>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/20">
              <div className="h-full w-[48%] rounded-full bg-white" />
            </div>
          </CardContent>
        </Card>

        {/* Search & View Toggle */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search files and folders..." className="pl-9" />
          </div>
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

        {/* Folders */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Folders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockFolders.map((folder) => (
              <Card key={folder.id} className="card-interactive">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <FolderOpen className="h-10 w-10 text-primary" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="font-medium mt-2">{folder.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {folder.files} files • {folder.updated}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Files */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Recent Files</h2>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mockFiles.map((file) => {
                const Icon = fileIcons[file.type] || fileIcons.default;
                const color = fileColors[file.type] || fileColors.default;
                return (
                  <Card key={file.id} className="card-interactive">
                    <CardContent className="p-4 text-center">
                      <Icon className={`h-12 w-12 mx-auto ${color}`} />
                      <h3 className="font-medium mt-2 text-sm line-clamp-2">{file.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{file.size}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {mockFiles.map((file) => {
                const Icon = fileIcons[file.type] || fileIcons.default;
                const color = fileColors[file.type] || fileColors.default;
                return (
                  <Card key={file.id} className="card-interactive">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className={`h-8 w-8 ${color}`} />
                        <div>
                          <h3 className="font-medium">{file.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {file.size} • {file.updated}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Access</CardTitle>
            <CardDescription>Frequently accessed files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {mockFiles.slice(0, 3).map((file) => {
                const Icon = fileIcons[file.type] || fileIcons.default;
                const color = fileColors[file.type] || fileColors.default;
                return (
                  <Card key={file.id} className="shrink-0 w-40 card-interactive">
                    <CardContent className="p-3 text-center">
                      <Icon className={`h-8 w-8 mx-auto ${color}`} />
                      <p className="text-xs font-medium mt-2 line-clamp-1">{file.name}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default PersonalSpace;
