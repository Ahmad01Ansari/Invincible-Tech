import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

export function CTABanner() {
  return (
    <section className="section-padding">
      <Container size="narrow">
        <div className="relative group overflow-hidden p-12 text-center flex flex-col items-center border border-border-dim bg-obsidian transition-colors duration-500 hover:border-border-dim/0">
          
          {/* Ambient Glow background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-neon/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Full Circle Border Animation - Two lines meeting */}
          {/* Line 1: Top-Left -> Top-Right -> Bottom-Right */}
          <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-neon group-hover:w-full transition-all duration-500 ease-in-out z-20" />
          <div className="absolute top-0 right-0 w-[2px] h-0 bg-gradient-to-b from-accent-neon to-accent-orange group-hover:h-full transition-all duration-500 delay-500 ease-in-out z-20" />

          {/* Line 2: Top-Left -> Bottom-Left -> Bottom-Right */}
          <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-accent-orange to-accent-neon group-hover:h-full transition-all duration-500 ease-in-out z-20" />
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-neon group-hover:w-full transition-all duration-500 delay-500 ease-in-out z-20" />

          <div className="relative z-10">
            <h2 className="text-h1 font-display font-medium text-text-high mb-6 tracking-tight">
               Let&apos;s Build the <span className="text-gradient-orange">Inconceivable.</span>
            </h2>
            <p className="text-body-lg text-text-low mb-10 max-w-xl mx-auto font-mono text-sm uppercase tracking-widest leading-relaxed">
              We are engineers without limits. Partner with us to architect your next enterprise product.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" href="/contact" className="group/btn relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Start Engineering
                  <span className="ml-2 w-2 h-4 bg-accent-orange animate-pulse opacity-0 group-hover/btn:opacity-100" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
