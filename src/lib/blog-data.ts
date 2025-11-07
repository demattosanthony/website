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
    coverImage: "/assets/blog/syyclops-3/1.jpg",
    images: [
      "/assets/blog/syyclops-3/1.jpg",
      "/assets/blog/syyclops-3/2.jpg",
      "/assets/blog/syyclops-3/3.png",
      "/assets/blog/syyclops-3/4.png",
    ],
  },
  {
    id: "computer-vision-journey",
    title: "My Journey in Computer Vision",
    description:
      "Building an end-to-end machine learning solution for real-time parking space detection using CNNs at High Point University.",
    coverImage: "/assets/blog/syyclops-3/2.jpg",
    category: "Research",
    date: "2025-10-13T16:00:00Z",
    content: `During my time at High Point University, I had the opportunity to work on an exciting undergraduate research project: building a CNN-based parking space detection system.

## The Problem

Campus parking was a constant headache for students. Finding available parking spots meant driving around aimlessly, wasting time and fuel. We needed a better solution.

## The Solution

I developed an end-to-end machine learning solution that could detect parking space availability in real-time using computer vision.

### The Pipeline

1. **Data Collection**: Set up cameras in parking lots and built a pipeline to collect and label thousands of images
2. **Model Training**: Trained a Convolutional Neural Network to detect occupied vs. empty parking spaces
3. **Real-time Inference**: Deployed the model to run real-time inference on live camera feeds
4. **REST API**: Built a scalable API to serve predictions to client applications
5. **Mobile App**: Created a mobile app where students could check parking availability before arriving on campus

## What I Learned

This project taught me so much about the full lifecycle of ML projects - from data collection to deployment. It also showed me the power of self-directed learning and the importance of building complete, production-ready solutions rather than just proof-of-concepts.

The best part? Seeing students actually use the app and hearing how it made their lives easier.`,
    images: ["/assets/blog/syyclops-3/2.jpg"],
  },
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}
