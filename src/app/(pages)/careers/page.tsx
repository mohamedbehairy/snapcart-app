import { Briefcase, MapPin } from "lucide-react";
import Link from "next/link";

const jobs = [
  {
    title: "Frontend Developer",
    type: "Full-time",
    location: "Cairo / Remote",
    description: "Build responsive UIs with React and Next.js.",
  },
  {
    title: "Backend Developer",
    type: "Full-time",
    location: "Cairo",
    description: "Develop scalable APIs with Node.js and MongoDB.",
  },
  {
    title: "UI/UX Designer",
    type: "Full-time",
    location: "Cairo",
    description: "Design beautiful and intuitive user experiences.",
  },
  {
    title: "Customer Support Specialist",
    type: "Full-time",
    location: "Cairo",
    description: "Help customers with their inquiries and issues.",
  },
  {
    title: "Marketing Specialist",
    type: "Part-time",
    location: "Remote",
    description: "Manage social media and marketing campaigns.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-accent shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-2">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Join Our Team</h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Help us build the future of e‑commerce in Egypt.
            </p>
          </div>

          {/* Intro */}
          <div className="border border-border rounded-xl p-5 bg-background/50 mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              At SnapCart, we're passionate about creating the best shopping
              experience for our customers. If you're excited about technology,
              design, and customer satisfaction, we'd love to meet you.
            </p>
          </div>

          {/* Job Listings */}
          <div className="space-y-4 mb-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="border border-border rounded-xl p-4 bg-background/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-2">
                    <h3 className="font-medium text-base">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {job.description}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors whitespace-nowrap"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-muted-foreground">
            Don't see a fitting role?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Send us your CV
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
