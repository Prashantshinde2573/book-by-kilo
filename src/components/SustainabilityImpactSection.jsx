export default function SustainabilityImpactSection() {
  const impactItems = [
    {
      title: "17 Full Grown Trees",
      description: "Conserving mature forests, protecting natural wildlife habitats, and preventing virgin tree felling."
    },
    {
      title: "1500 Liters of Oil",
      description: "Drastically reducing heavy petroleum consumption required in virgin paper production."
    },
    {
      title: "81 Cu. Ft. of Landfill",
      description: "Diverting tons of high-grade paper and books away from overburdened city landfills."
    },
    {
      title: "4000 kWh of Energy",
      description: "Minimizing industrial electrical power and thermal energy across the publishing supply chain."
    },
    {
      title: "7000 Liters of Water",
      description: "Saving thousands of liters of clean freshwater by giving quality pre-loved books a second life."
    }
  ];

  return (
    <section className="sustainable-impact-section" aria-label="Sustainable Practices and Impact">
      <div className="sustainable-impact-container">
        
        {/* Left Column: Heading + 2-Column Metrics */}
        <div className="sustainable-impact-content">
          <div className="sustainable-header-block">
            <span className="sustainable-eyebrow">SUSTAINABLE PRACTICES &amp; IMPACT</span>
            <h2 className="sustainable-main-title">
              Every Ton of Books We Sold, We Saved:
            </h2>
          </div>

          <div className="sustainable-metrics-grid">
            {impactItems.map((item, index) => (
              <div key={index} className={`sustainable-metric-item ${index === 4 ? "span-full" : ""}`}>
                <h3 className="sustainable-metric-title">{item.title}</h3>
                <p className="sustainable-metric-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Angled Cutout Visual Collage */}
        <div className="sustainable-impact-visuals" aria-hidden="true">
          
          {/* Top Angled Photo (Globe in Hands) */}
          <div className="angled-photo-wrapper top-globe">
            <img 
              src="/images/eco_globe.jpg" 
              alt="Hands holding earth globe" 
              className="angled-img"
              loading="lazy" 
            />
          </div>

          {/* Decorative Mint Diagonal Stripe */}
          <div className="angled-mint-stripe" />

          {/* Main Angled Photo (Plant Sprout in Soil) */}
          <div className="angled-photo-wrapper main-sprout">
            <img 
              src="/images/eco_sprout.jpg" 
              alt="Hands holding growing plant in soil" 
              className="angled-img"
              loading="lazy" 
            />
          </div>

          {/* Bottom Geometric Forest Chevron Triangles */}
          <div className="geometric-forest-chevrons">
            <svg viewBox="0 0 160 120" className="chevrons-svg" fill="none">
              {/* Layer 1 Dark Forest */}
              <polygon points="40,120 80,40 120,120" fill="#2d5a3c" opacity="0.95" />
              {/* Layer 2 Medium Sage */}
              <polygon points="80,120 120,20 160,120" fill="#4a7c59" opacity="0.9" />
              {/* Layer 3 Light Mint Accent */}
              <polygon points="110,120 140,55 170,120" fill="#7ba385" opacity="0.75" />
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}
