export interface BlogPost {
  id: string;
  title: string;
  description?: string;
  category?: string;
  date: string;
  content: string;
  coverImage?: string;
  images?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "crude-data",
    title: "Crude Data",
    description:
      "Raw data is worthless until refined into actionable insights.",
    content: `I’m sure you’ve heard the phrase “data is the new oil.” It gets repeated everywhere, but what does the comparison actually mean?

To see it clearly, think about how oil becomes valuable:

1. You first find it and pull it out of the ground.
2. You move it by a ship, rail, or truck into a refinery.
3. Then you run it through the refinery, where the real magic happens. The crude gets heated, separated, cleaned, and transformed into gasoline, diesel, jet fuel, and everything else we actually rely on.

Oil only becomes valuable once it’s refined into something we can actually use.

Now apply the same thinking to data:

1. You connect to the source of data (spreadsheets, databases, applications).
2. You move that data into a system where it can be processed.
3. Then you refine it: clean it, structure it, combine it, label it, and turn it into insights you can act on. 

Data only becomes valuable once it’s transformed into something that drives decisions, outcomes, and real results.

For example, imagine you run a large office building.

You have three main data sources:

• Utility bills: one big number each month for “electricity”

• A maintenance system: “chiller issue,” “hot/cold call,” “comfort complaint”

• A building automation system: thousands of points like CH-1.KW, CH-2.KW, SF-3.SPD

On their own, this is crude oil.
Big numbers, vague tickets, cryptic point names. You can’t clearly see where money is being burned.

Refinement is when you:

• Map each data point to the building, system, and specific piece of equipment it comes from

• Match your building automation trends to your utility bills over time

• Tie maintenance tickets to the same equipment so problems, operation, and cost all line up

Now you can see something concrete, like:

Two chillers that run inefficiently 24/ are driving 30% of your extra energy cost.

That’s value.
Not “a lot of data,” but a specific, actionable insight: fix these two machines, save this much money.

Syyclops is a data refinement factory for your building data. We plug into the messy systems you already have and turn them into clear, financial and operational insights you can act on.

https://syyclops.com`,
    date: "2025-11-15T14:30:00Z",
    category: "Insights",
  },
  {
    id: "syyclops-3-0",
    title: "Syyclops 3.0",
    description:
      "Four months of intense development culminating in a new era for smart building management and digital transformation.",
    category: "Product",
    date: "2025-10-26T14:30:00Z",
    content: `I am excited to announce the launch of Syyclops 3.0! The past four months have been a nonstop, intense grind to bring this to life. It included a weeklong trip to Slovenia to work side by side with our European developers, 15 hour workdays and nights, and countless challenges to overcome along the way. I am truly proud of what we have accomplished. 

While I could list all the new features we've built and the progress we've made, that's not the story I want to tell here. Software isn't the bottleneck in smart buildings today. 

The real challenge? Most organizations and buildings aren't digitally ready. They're flooded with tools, data, and "smart" solutions, yet they lack a clear digital direction or strategy. Before investing in more AI or IOT systems, the first step is understanding where you actually are on your digital journey.

At Syyclops, we believe success starts by meeting you where you are, not by forcing you to adapt to yet another system. That's why we begin with a Digital Readiness Assessment: a customized snapshot of your organization's digital maturity and a roadmap for how to evolve, aligned with your business goals and outcomes. This helps turn a complex digital transformation into a structured, actionable plan.

If your organization has already gone through this process and defined objectives, we're ready to dive straight into a pilot to prove value fast. 

If this resonates with you, let's connect. I'd love to hear about your challenges and explore how we can help. 

Let's build the future of smart buildings together.`,
    coverImage: "/blog/syyclops-3/1.jpg",
    images: [
      "/blog/syyclops-3/1.jpg",
      "/blog/syyclops-3/2.jpg",
      "/blog/syyclops-3/3.png",
      "/blog/syyclops-3/4.png",
    ],
  },
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}
