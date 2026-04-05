export function TrustedByMarquee() {
  // Placeholder array of client names/logos
  const CLIENTS = [
    "TechCorp Global", "EduSystem", "HealthFirst", 
    "FinSecure", "RetailPrime", "StartupX",
    "TechCorp Global", "EduSystem", "HealthFirst", 
    "FinSecure", "RetailPrime", "StartupX"
  ];

  return (
    <section className="py-12 border-y border-border-dim bg-obsidian overflow-hidden">
      <div className="w-full relative flex items-center">
        {/* Gradients masks to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-obsidian to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-obsidian to-transparent z-10" />
        
        {/* Track */}
        <div className="flex w-fit whitespace-nowrap animate-marquee gap-16 px-8 items-center">
          {CLIENTS.map((client, idx) => (
            <div key={`${client}-${idx}`} className="text-xl font-display font-medium text-text-low opacity-50 flex-shrink-0">
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
