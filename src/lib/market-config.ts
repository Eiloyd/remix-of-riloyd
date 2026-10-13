import type { StaticImageData } from "./service-types";
import indiaLogo from "@/assets/regions/riloyd-india-transparent.png.asset.json";
import britainLogo from "@/assets/regions/riloyd-britain-transparent.png.asset.json";
import uaeLogo from "@/assets/regions/riloyd-uae-transparent.png.asset.json";
import canadaLogo from "@/assets/regions/riloyd-canada-transparent.png.asset.json";
import americaLogo from "@/assets/regions/riloyd-america-transparent.png.asset.json";
import singaporeLogo from "@/assets/regions/riloyd-singapore-transparent.png.asset.json";
import europeLogo from "@/assets/regions/riloyd-europe-transparent.png.asset.json";
import australiaLogo from "@/assets/regions/riloyd-australia-transparent.png.asset.json";
import indiaImage from "@/assets/global-india.jpg";
import britainImage from "@/assets/global-britain.jpg";
import uaeImage from "@/assets/global-uae.jpg";
import canadaImage from "@/assets/global-canada.jpg";
import americaImage from "@/assets/global-america.jpg";
import singaporeImage from "@/assets/global-singapore.jpg";
import europeImage from "@/assets/global-europe.jpg";
import australiaImage from "@/assets/global-australia.jpg";

export type MarketConfig = {
  slug: string;
  name: string;
  region: string;
  headline: string;
  description: string;
  introduction: string;
  image: StaticImageData;
  logo: string;
  landmark: string;
  opportunities: [string, string][];
};

export const marketOrder = ["india", "uk", "uae", "canada", "usa", "singapore", "europe", "australia"] as const;

export const marketConfigs: Record<(typeof marketOrder)[number], MarketConfig> = {
  india: { slug: "india", name: "India", region: "South Asia", headline: "Ambition at scale.", description: "Connecting Indian businesses with strategy, capital and opportunities across markets.", introduction: "India combines entrepreneurial energy, deep talent and expanding consumer demand. RILOYD helps leaders assess opportunities, strengthen readiness and build routes to sustainable growth.", image: indiaImage, logo: indiaLogo.url, landmark: "India Gate in New Delhi", opportunities: [["Growth Strategy", "Shape priorities for complex, fast-moving markets."], ["Funding Readiness", "Prepare a credible business and capital narrative."], ["Global Expansion", "Connect Indian ambition with international pathways."]] },
  uk: { slug: "uk", name: "UK", region: "United Kingdom", headline: "A gateway to global business.", description: "Building practical pathways into one of the world’s most connected commercial markets.", introduction: "The UK offers access to mature capital, specialist expertise and international networks. RILOYD supports businesses evaluating entry, partnerships and long-term positioning.", image: britainImage, logo: britainLogo.url, landmark: "Big Ben in London", opportunities: [["Market Entry", "Understand positioning, requirements and routes to market."], ["Investor Networks", "Prepare for relevant funding and stakeholder conversations."], ["Strategic Partnerships", "Identify relationships that can accelerate progress."]] },
  uae: { slug: "uae", name: "UAE", region: "Middle East", headline: "Opportunity at the crossroads.", description: "Helping businesses approach the UAE with commercial clarity and regional perspective.", introduction: "The UAE is a dynamic platform for the Middle East, Africa and Asia. RILOYD helps businesses examine market potential, establish priorities and develop the relationships needed to move forward.", image: uaeImage, logo: uaeLogo.url, landmark: "Burj Khalifa in Dubai", opportunities: [["Regional Expansion", "Build a considered pathway into connected Gulf markets."], ["Business Setup Insight", "Clarify commercial choices before committing resources."], ["Capital Connections", "Strengthen readiness for investor and partner discussions."]] },
  canada: { slug: "canada", name: "Canada", region: "North America", headline: "Build with confidence.", description: "Exploring innovation, partnership and growth opportunities across Canada.", introduction: "Canada brings together a stable business environment, diverse talent and strong innovation ecosystems. RILOYD helps businesses assess fit and convert market interest into an informed plan.", image: canadaImage, logo: canadaLogo.url, landmark: "Toronto skyline and CN Tower", opportunities: [["Market Research", "Understand demand, competition and commercial fit."], ["Innovation Networks", "Explore ecosystems aligned with your growth agenda."], ["Expansion Planning", "Turn market potential into phased action."]] },
  usa: { slug: "usa", name: "USA", region: "North America", headline: "Scale into possibility.", description: "Supporting informed access to a vast, competitive and opportunity-rich market.", introduction: "The USA rewards sharp positioning, strong execution and a clear understanding of customers. RILOYD helps businesses frame the opportunity and build practical expansion decisions.", image: americaImage, logo: americaLogo.url, landmark: "New York City skyline", opportunities: [["Go-to-Market", "Focus the audience, offer and channel strategy."], ["Commercial Research", "Test assumptions against market evidence."], ["Growth Partnerships", "Explore relationships that support market traction."]] },
  singapore: { slug: "singapore", name: "Singapore", region: "Asia-Pacific", headline: "Connected to Asia.", description: "Using Singapore’s strategic position to explore opportunity across Asia-Pacific.", introduction: "Singapore is a trusted centre for regional operations, finance and innovation. RILOYD supports businesses seeking a disciplined base for Asia-Pacific growth.", image: singaporeImage, logo: singaporeLogo.url, landmark: "Marina Bay Sands in Singapore", opportunities: [["Regional Strategy", "Prioritise markets and sequence expansion decisions."], ["Business Networks", "Explore relevant commercial and investor relationships."], ["Operating Perspective", "Align regional ambition with practical execution."]] },
  europe: { slug: "europe", name: "Europe", region: "European Markets", headline: "Many markets. One clear direction.", description: "Helping businesses navigate opportunity across diverse European markets.", introduction: "Europe brings varied customers, regulations and commercial cultures. RILOYD helps businesses identify where to focus and how to approach growth with the right context.", image: europeImage, logo: europeLogo.url, landmark: "Eiffel Tower in Paris", opportunities: [["Market Prioritisation", "Compare opportunities and select the strongest fit."], ["Strategic Research", "Build decisions around evidence and local context."], ["Partner Discovery", "Identify relationships that support entry and growth."]] },
  australia: { slug: "australia", name: "Australia", region: "Oceania", headline: "Connect across the Pacific.", description: "Creating informed pathways to customers, talent and partners in Australia.", introduction: "Australia combines sophisticated markets with strong links to Asia-Pacific. RILOYD helps businesses understand commercial potential and build a realistic route forward.", image: australiaImage, logo: australiaLogo.url, landmark: "Sydney Opera House", opportunities: [["Market Assessment", "Evaluate demand, competition and strategic fit."], ["Business Expansion", "Create a phased plan for entry and growth."], ["Cross-Border Connections", "Explore relevant market and partnership networks."]] },
};

export function findMarket(slug: string) {
  return marketOrder.map((key) => marketConfigs[key]).find((market) => market.slug === slug);
}