
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { Coach } from "./types";

interface ReviewsTabProps {
  coach: Coach;
}

const ReviewsTab = ({ coach }: ReviewsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Client Reviews</h2>
          <p className="text-muted-foreground">
            {coach.reviewCount} reviews, average {coach.rating} out of 5
          </p>
        </div>
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-500" />
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-6">
        {coach.reviews?.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{review.author}</h3>
                <p className="text-sm text-muted-foreground">{review.role}</p>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500" />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground">{review.content}</p>
            <p className="text-sm text-muted-foreground">{review.date}</p>
            <Separator className="mt-4" />
          </div>
        ))}
      </div>
      
      <Button variant="outline">
        Show All Reviews
      </Button>
    </div>
  );
};

export default ReviewsTab;
