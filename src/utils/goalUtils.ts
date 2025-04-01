import { Goal } from "@/types/session";
import { CompassData } from "@/contexts/auth/types";

export const generateGoalsFromCompass = (compassData?: CompassData): Goal[] => {
  if (!compassData) {
    return [
      { id: 1, text: "Improve leadership communication skills", progress: 65, category: 'work' },
      { id: 2, text: "Develop strategic planning capabilities", progress: 40, category: 'mind' },
      { id: 3, text: "Enhance team management and delegation", progress: 25, category: 'body' },
    ];
  }
  
  const goals: Goal[] = [];
  
  // Generate Work goals
  if (compassData.dimensions.work.notes) {
    goals.push({
      id: 1,
      text: `Work: ${compassData.dimensions.work.notes.split('.')[0] || 'Improve professional fulfillment'}`,
      progress: Math.round((compassData.dimensions.work.current / 10) * 100),
      category: 'work'
    });
  } else {
    goals.push({
      id: 1,
      text: "Improve leadership communication skills",
      progress: 65,
      category: 'work'
    });
  }

  // Generate Mind goals
  if (compassData.dimensions.mind.notes) {
    goals.push({
      id: 2,
      text: `Mind: ${compassData.dimensions.mind.notes.split('.')[0] || 'Enhance mental wellbeing'}`,
      progress: Math.round((compassData.dimensions.mind.current / 10) * 100),
      category: 'mind'
    });
  } else {
    goals.push({
      id: 2,
      text: "Develop strategic planning capabilities",
      progress: 40,
      category: 'mind'
    });
  }

  // Generate Body goals
  if (compassData.dimensions.body.notes) {
    goals.push({
      id: 3,
      text: `Body: ${compassData.dimensions.body.notes.split('.')[0] || 'Improve physical health'}`,
      progress: Math.round((compassData.dimensions.body.current / 10) * 100),
      category: 'body'
    });
  } else {
    goals.push({
      id: 3,
      text: "Enhance team management and delegation",
      progress: 25,
      category: 'body'
    });
  }
  
  return goals;
};

export const getSampleJourneyData = (goals: Goal[]) => {
  return {
    pastSessions: [
      { 
        id: 1, 
        date: "October 15, 2023", 
        summary: "Discussed communication challenges with the team. Identified key areas for improvement including active listening and providing clearer feedback.",
        keyTakeaways: ["Practice active listening", "Document feedback before meetings", "Follow up with team members individually"]
      },
      { 
        id: 2, 
        date: "November 1, 2023", 
        title: "Strategic Planning",
        summary: "Reviewed progress on team communication. Explored strategic planning frameworks that can be applied to the upcoming quarterly planning session.",
        keyTakeaways: ["Implement SWOT analysis", "Schedule individual prep meetings", "Create communication plan template"]
      },
    ],
    goals: goals,
    upcomingSessions: [
      {
        id: 1,
        date: "November 15, 2023",
        time: "3:00 PM - 4:00 PM",
        title: "Goal Review",
        coach: "Mark Johnson",
      }
    ]
  };
};
