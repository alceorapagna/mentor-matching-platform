
import { Award, GraduationCap, Check } from "lucide-react";
import { Coach } from "./types";

interface AboutTabProps {
  coach: Coach;
}

const AboutTab = ({ coach }: AboutTabProps) => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Background & Experience</h2>
        <p className="text-muted-foreground mb-4">
          Dr. Sarah Johnson brings a wealth of experience in leadership development, having worked with 
          executives at Fortune 500 companies as well as startup founders. Her coaching methodology is 
          grounded in evidence-based practices and tailored to each client's unique challenges.
        </p>
        <p className="text-muted-foreground">
          Prior to her coaching career, Sarah served as a senior executive in the technology sector, 
          giving her firsthand understanding of leadership challenges in fast-paced environments.
        </p>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Education</h2>
        <div className="space-y-4">
          {coach.education?.map((edu, index) => (
            <div key={index} className="flex items-start gap-3">
              <GraduationCap className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{edu.degree}</p>
                <p className="text-muted-foreground">{edu.institution}, {edu.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Certifications</h2>
        <div className="space-y-4">
          {coach.certifications?.map((cert, index) => (
            <div key={index} className="flex items-start gap-3">
              <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{cert.name}</p>
                <p className="text-muted-foreground">{cert.issuer}, {cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Coaching Approach</h2>
        <p className="text-muted-foreground">
          My coaching approach is collaborative and results-oriented. I believe in creating a 
          safe, confidential space where clients can explore challenges, gain insights, and 
          develop practical strategies for growth. Each coaching relationship begins with a 
          thorough assessment of your current situation and clear goal-setting for our work together.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 mt-0.5" />
            <span>Evidence-based techniques</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 mt-0.5" />
            <span>Tailored development plans</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 mt-0.5" />
            <span>Regular progress assessments</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 mt-0.5" />
            <span>Practical, actionable strategies</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutTab;
