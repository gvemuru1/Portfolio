import { assetPath } from "@/lib/asset-path";
import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

const resume = {
  "name": "Gurucharan Vemuru",
  "initials": "GV",
  "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  "location": "Milwaukee, WI 53211",
  "locationLink": "https://www.google.com/maps/search/?api=1&query=Milwaukee%2C+WI",
  "description": "Software Engineer",
  "summary": "Full-stack engineer with 3+ years building web and mobile products. I'm drawn to backend reliability work: keeping transactions consistent and making failures easy to trace across services. Most recently helped take a service marketplace from prototype to a beta-tested MVP.",
  "avatarUrl": "/gurucharan.jpeg",
  "work": [
    {
      "company": "Zably AI",
      "title": "Software Engineer",
      "start": "Jul 2025",
      "end": "Aug 2026",
      "summary": "Helped bring an on-demand marketplace to MVP so the team could pursue funding.",
      "description": [
        "Built customer flows from Figma prototypes in Next.js and React Native (Expo), using AI coding tools to speed up delivery.",
        "Took the app through multiple App Store review rounds, fixing privacy-policy and user-consent requirements for the beta release.",
        "Implemented OAuth 2.0 sign-in with Google, Apple and Microsoft on top of JWT sessions, so new users join from their provider profile instead of a long signup form, with the address confirmed at checkout.",
        "Built the proximity-assignment service that matches customers with nearby service providers using OSRM routing, with Google Maps and Places for nearby search.",
        "Improved perceived image load time with skeleton (shimmer) loading states and Cloudflare CDN delivery of user images.",
        "Designed Node.js and FastAPI services for the customer and service-provider sides, using gRPC for service calls and RabbitMQ for async workflows; deployed on Kubernetes with Tilt and traced cross-service latency with Jaeger."
      ],
      "logoUrl": "/zably-ai.png"
    },
    {
      "company": "UWM Accessibility Resource Center",
      "title": "Web Accessibility Developer",
      "start": "Sep 2024",
      "end": "May 2025",
      "summary": "",
      "description": [
        "Audited about 200 pages across university WordPress and React sites against WCAG 2.2 AA during a three-month summer project, working within a multi-person accessibility team.",
        "Owned keyboard-only navigation testing (tab order, focus visibility) and React code audits in React DevTools, flagging non-semantic markup such as clickable divs used in place of real buttons.",
        "Verified pages with the NVDA screen reader and contrast checks against the team's checklist, catching issues like unlabeled images in dynamic cards, and reported findings in daily stand-ups so developers could fix them."
      ],
      "logoUrl": "/uwm.png"
    },
    {
      "company": "Stack Apps",
      "title": "Software Engineer",
      "start": "Apr 2021",
      "end": "Jun 2023",
      "summary": "",
      "description": [
        "Developed PostgreSQL procedures and triggers supporting 5,000+ monthly transactions, cutting manual work by 30% and holding error rates below 2%.",
        "Integrated Kafka into payment workflows with at-least-once delivery and idempotent consumers, preventing duplicate transaction processing.",
        "Built Go microservices with OAuth 2.0 and role-based access control, supporting PCI DSS initiatives and reducing security incidents by 35%."
      ],
      "logoUrl": "/stackapps.svg"
    }
  ],
  "education": [
    {
      "school": "University of Wisconsin–Milwaukee",
      "degree": "M.S., Information Technology",
      "end": "May 2025",
      "href": "https://uwm.edu",
      "logoUrl": "/uwm.png"
    },
    {
      "school": "NBKR Institute of Science and Technology (JNTU-Anantapur)",
      "degree": "B.E., Computer Science",
      "end": "May 2022",
      "href": "https://www.nbkrist.org",
      "logoUrl": "/nbkrist.jpg"
    }
  ],
  "projects": [
    {
      "title": "RAG Document Q&A System",
      "href": "https://github.com/gvemuru1/animated-octo-disco",
      "technologies": [
        "Python",
        "FastAPI",
        "LangGraph",
        "ChromaDB",
        "pgvector"
      ],
      "description": "Document Q&A with cited answers, hybrid keyword and vector search, and prompt-injection guardrails. Built with FastAPI and LangGraph; retrieval benchmarked on BEIR SciDocs.",
      "dates": "",
      "image": "",
      "video": ""
    },
    {
      "title": "Doodle Recognition Web App",
      "href": "https://github.com/gvemuru1/quickdraw-cnn",
      "technologies": [
        "TensorFlow",
        "TensorFlow Lite",
        "FastAPI"
      ],
      "description": "Recognizes browser sketches using a seven-layer CNN trained on 414,000+ Quick, Draw! images. TensorFlow Lite and FastAPI power the predictions.",
      "dates": "",
      "image": "",
      "video": ""
    }
  ]
};

export const DATA = {
 ...resume,
 avatarUrl: assetPath(resume.avatarUrl),
 work: resume.work.map(work => ({ ...work, logoUrl: assetPath(work.logoUrl) })),
 education: resume.education.map(education => ({ ...education, logoUrl: assetPath(education.logoUrl) })),
 skills: ["Python", "JavaScript", "TypeScript", "Go", "React", "Next.js", "AWS", "Docker", "Kubernetes", "PostgreSQL", "Node.js"],
 navbar: [{ href: assetPath("/"), icon: HomeIcon, label: "Home" }],
 contact: {
 email: "gurucharanvemuru@gmail.com",
 tel: "+14146291607",
 phoneLabel: "(414) 629-1607",
 social: {
 GitHub: {name: "GitHub", url: "https://github.com/gvemuru1", icon: Icons.github, navbar: true},
 LinkedIn: {name: "LinkedIn", url: "https://www.linkedin.com/in/gurucharanvem/", icon: Icons.linkedin, navbar: true},
 email: {name: "Email", url: "mailto:gurucharanvemuru@gmail.com", icon: Icons.email, navbar: true},
 },
 },
 projects: resume.projects.map(project => ({...project, links: [{type: "Source", href: project.href, icon: <Icons.github className="size-3" />}]})),
};
