
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, PhoneCall } from 'lucide-react';
import { Coach } from '@/types/coach';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCoach: Coach | null;
  selectedPackage: string;
  setSelectedPackage: (value: string) => void;
  onSubmit: () => void;
  onContact: () => void;
}

export const ConfirmDialog = ({ 
  open, 
  onOpenChange, 
  selectedCoach, 
  selectedPackage,
  setSelectedPackage,
  onSubmit,
  onContact
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Coach Selection</DialogTitle>
          <DialogDescription>
            {selectedCoach?.name} will be added to your coaching team.
            {selectedCoach?.pricingModel === 'packages' ? 
              " Please select a coaching package below." : 
              " This coach offers custom pricing based on your needs."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img 
                src={selectedCoach?.imageSrc} 
                alt={selectedCoach?.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{selectedCoach?.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedCoach?.title}</p>
              
              {selectedCoach?.category === 'reneu' && (
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  Reneu Coach
                </span>
              )}
              {selectedCoach?.category === 'business' && (
                <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                  Business Coach
                </span>
              )}
              {selectedCoach?.category === 'mind' && (
                <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                  Mind Coach
                </span>
              )}
              {selectedCoach?.category === 'body' && (
                <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                  Body Coach
                </span>
              )}
            </div>
          </div>
          
          {selectedCoach?.pricingModel === 'packages' && selectedCoach?.packages && (
            <div className="space-y-4">
              <Label>Select a Coaching Package</Label>
              <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
                {selectedCoach.packages.basic && (
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic" className="flex-1 cursor-pointer">
                      <div className="font-medium">Basic</div>
                      <div className="text-sm text-muted-foreground">{selectedCoach.packages.basic}</div>
                    </Label>
                  </div>
                )}
                
                {selectedCoach.packages.standard && (
                  <div className="flex items-center space-x-2 rounded-md border p-3 bg-secondary/40">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="font-medium">Standard <span className="text-xs text-primary">(Recommended)</span></div>
                      <div className="text-sm text-muted-foreground">{selectedCoach.packages.standard}</div>
                    </Label>
                  </div>
                )}
                
                {selectedCoach.packages.premium && (
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium" className="flex-1 cursor-pointer">
                      <div className="font-medium">Premium</div>
                      <div className="text-sm text-muted-foreground">{selectedCoach.packages.premium}</div>
                    </Label>
                  </div>
                )}
              </RadioGroup>
            </div>
          )}
          
          {selectedCoach?.pricingModel === 'custom' && (
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
            <Button variant="outline" onClick={onContact} className="gap-2">
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
