import { FiPlus, FiRss } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NewsChannelsBentoSection() {
  return (
    <section className="bento-channels-section">
      <div className="bento-channels-container">

        {/* Section Heading */}
        <div className="bento-heading-wrap">
          <h2 className="bento-main-title">
            Every Book You Choose, Your Contribution Counts
          </h2>
        </div>

        {/* Outer Glassmorphism Container */}
        <div className="bento-glass-frame">
          <div className="bento-grid-layout">

            {/* Left: Tall Feature Card (Powering The Future) */}
            <div className="bento-card bento-card-tall">
              <img
                src="/images/bento/bento_tree_meadow.jpg"
                alt="Powering The Future"
                className="bento-card-bg"
              />
              <div className="bento-card-overlay-tall" />

              <div className="bento-tall-content">
                <div className="bento-tall-top">
                  <h3 className="bento-tall-title">

                  </h3>
                </div>

                <div className="bento-tall-bottom">

                  <h3 className="bento-item-title">
                    <span className="bento-item-number">17</span><br></br> FULL GROWN TREES.
                  </h3>

                </div>
              </div>
            </div>

            {/* Right: Two Separate Asymmetric Bento Rows */}
            <div className="bento-right-column">

              {/* ROW 1: 60% / 40% Split (Green Infrastructure & Human Impact) */}
              <div className="bento-row bento-row-top">

                {/* 60% Card: Landfill */}
                <div className="bento-card bento-card-medium bento-card-green-infra">
                  <img
                    src="/images/bento/bento_landfill.jpg"
                    alt="Cubic Feet of Landfill"
                    className="bento-card-bg"
                  />
                  <div className="bento-card-overlay" />

                  <div className="bento-card-inner">

                    <div className="bento-card-bottom">
                      <h3 className="bento-item-title">
                        <span className="bento-item-number">81</span><br></br> CUBIC FEET OF LANDFILL
                      </h3>
                    </div>
                  </div>
                </div>

                {/* 40% Card: Oil */}
                <div className="bento-card bento-card-medium bento-card-human-impact">
                  <img
                    src="/images/bento/bento_oil.jpg"
                    alt="Liters of Oil"
                    className="bento-card-bg"
                  />
                  <div className="bento-card-overlay" />

                  <div className="bento-card-inner">

                    <div className="bento-card-bottom">
                      <h3 className="bento-item-title">
                        <span className="bento-item-number">1500</span><br></br> LITERS OF OIL.
                      </h3>
                    </div>
                  </div>
                </div>

              </div>

              {/* ROW 2: 40% / 60% Split (Eco Inovation & 32 Channels) */}
              <div className="bento-row bento-row-bottom">

                {/* 40% Card: Water */}
                <div className="bento-card bento-card-medium bento-card-eco-inovation">
                  <img
                    src="/images/bento/bento_water.jpg"
                    alt="Liters of Water"
                    className="bento-card-bg"
                  />
                  <div className="bento-card-overlay" />

                  <div className="bento-card-inner">

                    <div className="bento-card-bottom">
                      <h3 className="bento-item-title">
                        <span className="bento-item-number">7000</span><br></br> LITERS OF WATER.
                      </h3>
                    </div>
                  </div>
                </div>

                {/* 60% Card: Energy */}
                <div className="bento-card bento-card-medium bento-card-eco-inovation">
                  <img
                    src="/images/bento/bento_energy.jpg"
                    alt="Kilowatts of Energy"
                    className="bento-card-bg"
                  />
                  <div className="bento-card-overlay" />
                  <div className="bento-card-inner">

                    <div className="bento-card-bottom">
                      <h3 className="bento-item-title">
                        <span className="bento-item-number">4000</span><br></br> KILOWATTS OF ENERGY.
                      </h3>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Footnote Impact Caption */}
        <p className="bento-footer-caption">
          These figures show the environmental impact of every tonne of books saved.
        </p>

      </div>
    </section>
  );
}
