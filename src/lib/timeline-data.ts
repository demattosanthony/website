interface TimelineItem {
  title: string;
  year?: string;
  logo: string;
  logoAlt: string;
  highlights?: string[];
  subsections?: {
    title: string;
    year: string;
    highlights: string[];
  }[];
}

export const timelineData: TimelineItem[] = [
  {
    title: "Syyclops",
    logo: "/assets/logos/syyclops.png",
    logoAlt: "Syyclops",
    subsections: [
      {
        title: "Chief Technology Officer",
        year: "2023 - Present",
        highlights: [
          "Leading engineering team and driving business strategy",
          "Architecting always-on digital twin platform with seamless external system connectivity",
        ],
      },
      {
        title: "Software Engineer",
        year: "2021 - 2023",
        highlights: [
          "Built knowledge graph foundation integrating BIM data with COBie ontology",
          "Integrated frontier LLMs for conversational building data interfaces",
          "Built real-time IAQ sensor integrations with 3D model visualizations",
          "Configured BACnet gateways for building automation connectivity",
        ],
      },
    ],
  },
  {
    title: "High Point University",
    year: "2017 - 2021",
    logo: "/assets/logos/hpu_purple.webp",
    logoAlt: "High Point University",
    highlights: [
      "Bachelor of Science in Computer Science",
      "Built end-to-end ML parking detection system with mobile app",
    ],
  },
];
