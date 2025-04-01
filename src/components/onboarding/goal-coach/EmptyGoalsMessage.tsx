
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmptyGoalsMessage = () => {
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">
        No renewal goals have been set. Complete your Reneu Compass to get personalized coach recommendations.
      </p>
      <Button className="mt-4" asChild>
        <Link to="/renewal-compass">
          Start Reneu Compass
        </Link>
      </Button>
    </div>
  );
};

export default EmptyGoalsMessage;
