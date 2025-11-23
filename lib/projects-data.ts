export interface ProjectAction {
  label: string;
  href?: string;
  variant?: "default" | "outline";
}

export interface ProjectVisual {
  type: "image" | "mobile-mockup" | "gif";
  src: string;
  srcDark?: string; // For mobile mockups with dark mode variant
  alt: string;
  className?: string;
  containerClassName?: string;
}

export interface MilestoneContent {
  type: "text" | "image";
  content?: string; // For text blocks
  image?: string; // For image blocks
  imageAlt?: string;
}

export interface ProjectMilestone {
  date: string; // ISO date string
  title: string;
  content: MilestoneContent[]; // Array of text and image blocks
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  logo?: string;
  logoAlt?: string;
  visual: ProjectVisual;
  actions: ProjectAction[];
  animationDelay: number;
  layout?: "default" | "reversed"; // For alternating layouts
  timeline?: ProjectMilestone[]; // Timeline of project milestones
}

export const projects: Project[] = [
  {
    id: "syyclops",
    title: "Syyclops",
    description:
      "A digital twin platform designed to improve building operations and maintenance.",
    techStack: "Digital Twin • Building Operations • IoT",
    logo: "/logos/syyclops.png",
    logoAlt: "Syyclops Logo",
    visual: {
      type: "image",
      src: "/projects/syyclops/building.svg",
      alt: "Syyclops Building",
      containerClassName: "relative w-full scale-125",
    },
    actions: [
      {
        label: "Website",
        href: "https://syyclops.com",
        variant: "default",
      },
      {
        label: "Learn More",
        variant: "outline",
      },
    ],
    animationDelay: 0.6,
    timeline: [
      {
        date: "2025-10-01",
        title: "Syyclops 3.0 Launch",
        content: [
          {
            type: "text",
            content: `Syyclops 3.0 marked a transformative milestone for the company, representing a complete reimagining of our platform capabilities and architecture.

The platform evolved from a manual data input system into a sophisticated data integration engine that seamlessly connects to any building management system, automatically maps data to a standardized ontology, and maintains real-time synchronization with robust version control.

We introduced a suite of powerful products built on top of this foundation, including customizable dashboards and an advanced AI Engineer that can generate actionable artifacts such as comprehensive reports, interactive dashboards, capital planning recommendations, and predictive maintenance schedules.

This release positioned Syyclops as a true digital twin platform, capable of delivering intelligent insights and automation at scale.`,
          },
          {
            type: "image",
            image: "/projects/syyclops/3-0-1.png",
            imageAlt: "Syyclops 3.0 Launch",
          },
          {
            type: "image",
            image: "/projects/syyclops/3-0-2.png",
            imageAlt: "Syyclops 3.0 Launch 2",
          },
          {
            type: "image",
            image: "/projects/syyclops/3-0-3.png",
            imageAlt: "Syyclops 3.0 Launch 3",
          },
          {
            type: "image",
            image: "/projects/syyclops/3-0-4.png",
            imageAlt: "Syyclops 3.0 Launch 4",
          },
        ],
      },
      {
        date: "2023-02-06",
        title: "Application redesign",
        content: [
          {
            type: "text",
            content: `We were able to hire a great graphic designer to come in and redesign the entire application style from the ground help. This was a great process working side by side all with the goal of making the application more user friendly and visually appealing.`,
          },
          {
            type: "image",
            image: "/projects/syyclops/blue_redesign.png",
            imageAlt: "Application redesign",
          },
          {
            type: "image",
            image: "/projects/syyclops/redesign_3.png",
            imageAlt: "Application redesign 2",
          },
        ],
      },
      {
        date: "2022-02-06",
        title: "Widgets & AI Engineer beginning",
        content: [
          {
            type: "text",
            content: `I designed and implemented a widget panel system inspired by iOS widgets, enabling quick snapshot views of all the data integrated into the digital twin. Each widget served as an entry point, allowing users to dive deeper into detailed analytics and insights.

During this period, I also integrated the GPT-3 API to build one of the first AI chat applications for building operations—this was even before ChatGPT's public launch.`,
          },
          {
            type: "image",
            image: "/projects/syyclops/ai_engineer_v1.png",
            imageAlt: "AI Engineer",
          },
          {
            type: "text",
            content: `As soon as I learned about the GPT-3 API, I began experimenting with ways to integrate it into our platform as an intelligent assistant for building operations.

At the time, creating conversational AI required creative prompt engineering with the GPT-3 completions API—essentially "hacking together" an assistant through carefully crafted prompts.`,
          },
          {
            type: "image",
            image: "/projects/syyclops/gpt_3_1.png",
            imageAlt: "GPT-3 API",
          },
        ],
      },
      {
        date: "2022-02-06",
        title: "Neo4j",
        content: [
          {
            type: "text",
            content: `After working through several data integrations, it became clear that our current data model wasn't suitable for what we were attempting to accomplish. We lacked a unified schema to represent the diverse types of data we were collecting and the relationships between them.
              
This led me to research digital twins and their associated data models, diving deep into the world of ontologies. I discovered that the building industry has several open standards designed to model buildings and their systems, including:

https://brickschema.org/
https://www.project-haystack.org/
https://github.com/WillowInc/opendigitaltwins-building

Through this research, I identified Neo4j as an ideal solution for our data modeling needs. As a graph database, it naturally handled the complex relationships in our data, worked seamlessly with RDF ontologies, and provided excellent support for implementing the Brick Schema standard.`,
          },
          {
            type: "image",
            image: "/projects/syyclops/neo4j_1.png",
            imageAlt: "Neo4j",
          },
        ],
      },
      {
        date: "2021-10-15",
        title: "Live Indoor Quality",
        content: [
          {
            type: "text",
            content: `One of my first projects was integrating live data streams of indoor quality sensors into the syyclops platform. The data needed to be collected and associated with assets in a Building Information Model (BIM) model.
            
To establish this connection, I registered webhooks on the Senseware IAQ platform and created an Azure Function App that would trigger on webhook calls, parse the incoming data, and store it in a TimescaleDB instance.`,
          },
          {
            type: "image",
            image: "/projects/syyclops/iaq_sensor_data_v1.png",
            imageAlt: "Live Indoor Quality Data",
          },
        ],
      },
    ],
  },
  {
    id: "demattos-finance",
    title: "DeMattos Finance",
    description: "The best place to consume financial content.",
    techStack: "Financial APIs • AI Agents • Research Tools",
    logo: "/projects/demofi/icon.svg",
    logoAlt: "DeMattos Finance Logo",
    visual: {
      type: "mobile-mockup",
      src: "/projects/demofi/mobile-preview-light.svg",
      srcDark: "/projects/demofi/mobile-preview-dark.svg",
      alt: "DeMattos Finance Mobile App",
      containerClassName: "relative w-full max-w-sm mx-auto sm:mx-0",
    },
    actions: [
      {
        label: "Learn More",
        variant: "outline",
      },
    ],
    animationDelay: 0.2,
    timeline: [
      {
        date: "2024-06-01",
        title: "DeMattos Finance Hacking",
        content: [
          {
            type: "text",
            content: `Put together a working application that used AI agents to regularly scrape the web to find the top financial stories and rank them. Then deep research each story to find all the different sides of it and the nuance of the converstaion. Then take the research report and turn it into something that is disgestible and nuanced gives all side of the story in 2-3 paragraphs. This genrated a useful financial feed that was not overvlown with ads, noice, and lose of nuance.`,
          },
          {
            type: "image",
            image: "/projects/demofi/landing.png",
            imageAlt: "DeMattos Finance Landing Page",
          },
          {
            type: "image",
            image: "/projects/demofi/article.png",
            imageAlt: "DeMattos Finance Article",
          },
          {
            type: "image",
            image: "/projects/demofi/search.png",
            imageAlt: "DeMattos Finance Search",
          },
          {
            type: "image",
            image: "/projects/demofi/mobile.PNG",
            imageAlt: "DeMattos Finance Mobile",
          },
          {
            type: "image",
            image: "/projects/demofi/stock.png",
            imageAlt: "DeMattos Finance Stock",
          },
        ],
      },
    ],
  },
  {
    id: "open-spot-parking",
    title: "Open Spot Parking",
    description:
      "Computer vision that detects vacant parking spots in real-time.",
    techStack: "Computer Vision • PyTorch • Mobile",
    visual: {
      type: "gif",
      src: "/projects/open-spot/pkLot.gif",
      alt: "Open Spot Parking detection",
      containerClassName: "relative w-full max-w-2xl mx-auto sm:mx-0",
    },
    actions: [
      {
        label: "View on GitHub",
        href: "https://github.com/demattosanthony/carNocar",
        variant: "default",
      },
    ],
    animationDelay: 0.4,
    timeline: [
      {
        date: "2023-11-20",
        title: "Real-time Detection System",
        content: [
          {
            type: "text",
            content:
              "Implemented real-time parking spot detection using computer vision models, achieving 95% accuracy in identifying vacant spots from live camera feeds.",
          },
          {
            type: "image",
            image: "/projects/open-spot/pkLot.gif",
            imageAlt: "Parking Spot Detection Demo",
          },
        ],
      },
      {
        date: "2023-08-15",
        title: "PyTorch Model Training",
        content: [
          {
            type: "text",
            content:
              "Trained custom PyTorch models on thousands of parking lot images to accurately distinguish between occupied and vacant parking spaces across different lighting conditions.",
          },
        ],
      },
      {
        date: "2023-05-01",
        title: "Project Inception",
        content: [
          {
            type: "text",
            content:
              "Started Open Spot Parking project to solve the common problem of finding parking in crowded urban areas using computer vision technology.",
          },
          {
            type: "image",
            image: "/projects/open-spot/mobile.gif",
            imageAlt: "Mobile App Preview",
          },
        ],
      },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
