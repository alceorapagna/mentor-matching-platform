
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const SettingsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Coach Profile Settings</CardTitle>
          <CardDescription>Manage how you appear to potential clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Profile Visibility</h3>
              <p className="text-sm text-muted-foreground">
                Control whether your profile is visible in the coach directory
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline">Edit Profile</Button>
                <Button variant="outline">Preview Profile</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Session Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure your default session duration and availability
              </p>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Manage Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
