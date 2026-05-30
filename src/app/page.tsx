import { TopNav } from "@/components/layout/top-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/shared/container";
import { HeroSection } from "@/components/landing/hero-section";
import { PipelineSection } from "@/components/landing/pipeline-section";
import { InsightsBentoSection } from "@/components/landing/insights-bento-section";
import { UploadDropzone } from "@/components/upload/upload-dropzone";

export default function LandingPage() {
  return (
    <>
      <TopNav />
      <main>
        <HeroSection />
        <Container as="section" section id="upload-section">
          <UploadDropzone />
        </Container>
        <PipelineSection />
        <InsightsBentoSection />
      </main>
      <SiteFooter />
    </>
  );
}
