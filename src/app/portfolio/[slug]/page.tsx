import { PORTFOLIO_PROJECTS } from "@/constants/portfolio";
import { notFound } from "next/navigation";
import { 
  CaseStudyHero, 
  CaseStudyChallenge, 
  CaseStudyProcess, 
  ResultsDashboard, 
  CaseStudyTestimonial,
  PortfolioCTA
} from "@/components/portfolio/CaseStudyDeepDive";
import { ProjectNav } from "@/components/sections/CaseStudyComponents";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Invinsible Tech Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = PORTFOLIO_PROJECTS.findIndex((p) => p.slug === slug);
  const project = PORTFOLIO_PROJECTS[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? PORTFOLIO_PROJECTS[projectIndex - 1] : null;
  const nextProject = projectIndex < PORTFOLIO_PROJECTS.length - 1 ? PORTFOLIO_PROJECTS[projectIndex + 1] : null;

  return (
    <main className="bg-obsidian">
      {/* 1. Cinema Hero */}
      <CaseStudyHero data={project} />

      {/* 2. Challenge & Goals */}
      <CaseStudyChallenge data={project} />

      {/* 3. Engineering Process Protocol */}
      <CaseStudyProcess process={project.process} />

      {/* 4. Results Dashboard */}
      <ResultsDashboard 
        metrics={project.metrics} 
        detailedResults={project.detailedResults} 
      />

      {/* 5. Client Impact (Testimonial) */}
      <CaseStudyTestimonial testimonial={project.testimonial} />

      {/* 6. Navigation */}
      <ProjectNav 
        prevSlug={prevProject?.slug} 
        nextSlug={nextProject?.slug} 
      />

      {/* 7. Final Case Study CTA */}
      <PortfolioCTA />
    </main>
  );
}
