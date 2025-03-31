
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const ResourcesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Learning Resources
        </CardTitle>
        <CardDescription>Resources shared by your coach to support your development</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-6 text-muted-foreground">
          No learning resources added yet
        </p>
      </CardContent>
    </Card>
  );
};

export default ResourcesTab;
