// Sample profiles — clearly marked in the UI. Replace with real people when details are supplied.
export type PersonGroup = "investors" | "mentors" | "team";

export type PersonProfile = {
  slug: string;
  name: string;
  role: string;
  location: string;
  focus: string[];
  summary: string;
  bio: string;
};

export const peopleGroups: Record<PersonGroup, { label: string; singular: string; profiles: PersonProfile[] }> = {
  investors: {
    label: "Our Investors",
    singular: "Investor",
    profiles: [
      { slug: "sample-investor-1", name: "Sample Investor One", role: "Growth Equity Investor", location: "India", focus: ["Growth capital", "SMEs", "Manufacturing"], summary: "Backs established businesses ready for their next stage of scale.", bio: "This is a sample investor profile. It shows how an investor's background, investment focus and preferred business stages will appear once real details are supplied." },
      { slug: "sample-investor-2", name: "Sample Investor Two", role: "Angel Investor", location: "UAE", focus: ["Early-stage startups", "Technology", "Consumer"], summary: "Supports founders with early capital and practical market perspective.", bio: "This is a sample investor profile. Replace it with a genuine profile, photo and investment thesis when available." },
      { slug: "sample-investor-3", name: "Sample Investor Three", role: "Strategic Investor", location: "UK", focus: ["Cross-border expansion", "Partnerships", "Services"], summary: "Combines capital with strategic relationships across markets.", bio: "This is a sample investor profile used to demonstrate the layout of the Riloyd investor network." },
    ],
  },
  mentors: {
    label: "Our Mentors",
    singular: "Mentor",
    profiles: [
      { slug: "sample-mentor-1", name: "Sample Mentor One", role: "Strategy & Leadership Mentor", location: "India", focus: ["Founder guidance", "Leadership", "Strategy"], summary: "Helps founders sharpen priorities and lead through growth.", bio: "This is a sample mentor profile. It demonstrates how a mentor's experience, specialisms and mentoring approach will be presented." },
      { slug: "sample-mentor-2", name: "Sample Mentor Two", role: "Sales & Go-to-Market Mentor", location: "Singapore", focus: ["Sales growth", "Market entry", "B2B"], summary: "Brings commercial experience to customer and revenue decisions.", bio: "This is a sample mentor profile. Replace it with a genuine profile when real mentor details are supplied." },
      { slug: "sample-mentor-3", name: "Sample Mentor Three", role: "Finance & Funding Mentor", location: "Canada", focus: ["Funding readiness", "Financial planning", "Investor pitch"], summary: "Prepares businesses for credible conversations with capital providers.", bio: "This is a sample mentor profile used to demonstrate the layout of the Riloyd mentor network." },
    ],
  },
  team: {
    label: "Our Team Members",
    singular: "Team Member",
    profiles: [
      { slug: "sample-team-1", name: "Sample Team Member One", role: "Business Research Analyst", location: "India", focus: ["Market research", "Analysis"], summary: "Turns market evidence into useful business insight.", bio: "This is a sample team member profile. It shows how a team member's role and expertise will appear once real details are supplied." },
      { slug: "sample-team-2", name: "Sample Team Member Two", role: "Funding Advisory Associate", location: "UAE", focus: ["Funding readiness", "Investor relations"], summary: "Supports businesses preparing for capital conversations.", bio: "This is a sample team member profile. Replace it with a genuine profile when available." },
      { slug: "sample-team-3", name: "Sample Team Member Three", role: "Growth Strategy Consultant", location: "UK", focus: ["Sales growth", "Transformation"], summary: "Helps clients convert strategy into measurable action.", bio: "This is a sample team member profile used to demonstrate the Riloyd team layout." },
    ],
  },
};

export function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

export const managementRoles = [
  ["Chief Executive Officer", "CEO", "Leads vision, strategy and the overall direction of RILOYD."],
  ["Chief Financial Officer", "CFO", "Oversees financial strategy, governance and capital decisions."],
  ["Chief Revenue Officer", "CRO", "Drives revenue growth, client development and commercial strategy."],
  ["Chief Operating Officer", "COO", "Ensures delivery excellence and operational effectiveness."],
  ["Chief Strategy Officer", "CSO", "Shapes advisory frameworks and long-term strategic priorities."],
  ["Chief Technology Officer", "CTO", "Leads technology, digital capability and transformation tools."],
  ["Chief Risk Officer", "CRiO", "Guides risk management, compliance and responsible growth."],
] as const;
