
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, PhoneCall } from "lucide-react";
import { Coach } from "./types";

interface ConfirmDialogProps {
  coach: Coach;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  selectedPackage: string | null;
  setSelectedPackage: (pkg: string) => void;
  onContactClick: () => void;
}

const ConfirmDialog = ({ 
  coach, 
  open, 
  onOpenChange, 
  onSubmit, 
  selectedPackage, 
  setSelectedPackage,
  onContactClick
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Coach Selection</DialogTitle>
          <DialogDescription>
            {coach.name} will be added to your coaching team.
            {coach.packages.length > 0 ? 
              " Please select a coaching package below." : 
              " This coach offers custom pricing based on your needs."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img 
                src={coach.profileImage} 
                alt={coach.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{coach.name}</h3>
              <p className="text-sm text-muted-foreground">{coach.title}</p>
              
              <div className="mt-1">
                {coach.category === 'reneu' && (
                  <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    Reneu Coach
                  </span>
                )}
                {coach.category === 'business' && (
                  <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                    Business Coach
                  </span>
                )}
                {coach.category === 'mind' && (
                  <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                    Mind Coach
                  </span>
                )}
                {coach.category === 'body' && (
                  <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                    Body Coach
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {coach.packages.length > 0 && (
            <div className="space-y-4">
              <Label>Select a Coaching Package</Label>
              <RadioGroup value={selectedPackage || ''} onValueChange={setSelectedPackage}>
                {coach.packages.map((pkg) => (
                  <div key={pkg.id} className={`flex items-center space-x-2 rounded-md border p-3 ${pkg.id === 2 ? "bg-secondary/40" : ""}`}>
                    <RadioGroupItem value={pkg.name} id={pkg.id.toString()} />
                    <Label htmlFor={pkg.id.toString()} className="flex-1 cursor-pointer">
                      <div className="font-medium">
                        {pkg.name}
                        {pkg.id === 2 && <span className="text-xs text-primary ml-1">(Recommended)</span>}
                      </div>
                      <div className="text-sm text-muted-foreground">{pkg.description}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          
          {coach.packages.length === 0 && (
            <div className="p-4 bg-secondary/30 rounded-md border">
              <p className="text-sm">
                This coach offers custom pricing based on your specific needs and goals. 
                After confirmation, they will contact you to discuss package options.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter className="sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={onContactClick} className="gap-2">
              <PhoneCall className="h-4 w-4" />
              Contact First
            </Button>
          </div>
          <Button type="button" onClick={onSubmit} className="gap-2">
            <Check className="h-4 w-4" />
            Confirm Coach
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
