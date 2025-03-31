
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText } from "lucide-react";

const ResourcesTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Coaching Resources</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assessment Templates</CardTitle>
            <CardDescription>Standard assessments for your clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  <span>Initial Assessment</span>
                </div>
                <Button variant="ghost" size="sm">Use</Button>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  <span>Goal Setting Worksheet</span>
                </div>
                <Button variant="ghost" size="sm">Use</Button>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  <span>Progress Review</span>
                </div>
                <Button variant="ghost" size="sm">Use</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Client Resources</CardTitle>
            <CardDescription>Materials to share with your clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  <span>Communication Styles Guide</span>
                </div>
                <Button variant="ghost" size="sm">Share</Button>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  <span>Stress Management Techniques</span>
                </div>
                <Button variant="ghost" size="sm">Share</Button>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  <span>Productivity Best Practices</span>
                </div>
                <Button variant="ghost" size="sm">Share</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourcesTab;
