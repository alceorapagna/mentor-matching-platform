
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Compass, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  acknowledge: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge this to continue",
  }),
});

interface CompassRequiredFormProps {
  userName: string;
}

const CompassRequiredForm = ({ userName }: CompassRequiredFormProps) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acknowledge: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    navigate("/reneu-compass");
  };

  return (
    <Card className="border-primary/20 max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Compass className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">Welcome to Your Renewal Journey, {userName}</CardTitle>
        <CardDescription className="text-lg mt-2">
          Before you begin, we need to map your personal Reneu Compass
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            The Reneu Compass is a crucial first step in your renewal journey. It helps us understand:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Your purpose and core values</li>
            <li>Your current satisfaction across Work, Mind, and Body dimensions</li>
            <li>Your desired future state in each dimension</li>
          </ul>
          
          <p className="mt-4">
            This assessment takes about 10-15 minutes to complete and provides the foundation for your personalized coaching journey.
          </p>
          
          <div className="bg-muted/50 p-4 rounded-lg mt-4">
            <h3 className="font-medium mb-2">What happens next:</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Complete your Reneu Compass assessment</li>
              <li>Schedule a discovery session with a Reneu coach</li>
              <li>Get matched with specialized coaches based on your needs</li>
              <li>Begin your personalized renewal journey</li>
            </ol>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
            <FormField
              control={form.control}
              name="acknowledge"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I understand that completing the Reneu Compass is required to continue
                    </FormLabel>
                    <FormDescription>
                      Your assessment will be reviewed during your discovery session with a coach
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormMessage />
            
            <Button type="submit" className="w-full mt-6">
              Begin My Reneu Compass
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CompassRequiredForm;
