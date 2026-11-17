import { assetPath } from "@/lib/asset-path";
import type { ComponentType, SVGProps } from "react";
import { Accessibility, Braces, Cloud, Database, GitBranch, KeyRound, Network, Radio, ShieldCheck, TestTubeDiagonal, Workflow } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Python, TypeScript: Typescript, Go: Golang, React: ReactLight,
  "React Native": ReactLight, "Next.js": NextjsIconDark, "Node.js": Nodejs,
  PostgreSQL: Postgresql, Docker, Kubernetes,
  WCAG: Accessibility, ARIA: Accessibility, Git: GitBranch,
  "Test-Driven Development": TestTubeDiagonal, AWS: Cloud, "Cloudflare CDN": Cloud,
  Redis: Database, MongoDB: Database, REST: Network, GraphQL: Network,
  gRPC: Network, Kafka: Radio, RabbitMQ: Radio, "CI/CD": Workflow,
  "OAuth 2.0": KeyRound, JWT: KeyRound, RBAC: ShieldCheck,
};

export function SkillIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: string }) {
  if (name === "AWS") {
    return <svg viewBox="0 0 128 128" aria-hidden="true" {...props}><image href={assetPath("/aws.svg")} width="128" height="128" /></svg>;
  }
  if (name === "JavaScript") {
    return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><rect width="24" height="24" fill="#f7df1e" /><text x="22" y="20" textAnchor="end" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif" fill="#111">JS</text></svg>;
  }
  const Icon = icons[name] ?? Braces;
  return <Icon aria-hidden="true" {...props} />;
}
