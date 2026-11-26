import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-gradient"></div>
                    <div className="hero-pattern"></div>
                </div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <div className="hero-badge">
                                <span className="badge-icon">✓</span>
                                <span>Peer-Reviewed Firm | ICAI Certified</span>
                            </div>
                            <h1 className="hero-title">
                                Empowering Businesses with
                                <span className="gradient-text"> Strategic Financial Insight</span>
                            </h1>
                            <p className="hero-subtitle">
                                Since 2026, Aionion Advisory has been a premier partner for businesses
                                seeking clarity in taxation, auditing, and corporate growth. We bridge the gap
                                between complex regulations and your commercial success.
                            </p>
                            <div className="hero-cta">
                                <Link to="/itr-filing" className="btn btn-primary btn-lg">
                                    <span>File ITR</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                                <Link to="/services" className="btn btn-secondary btn-lg">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M3 6H21M3 12H21M3 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span>Explore Our Services</span>
                                </Link>
                            </div>
                            <div className="trust-badges">
                                <TrustBadge
                                    icon={<PrecisionIcon />}
                                    title="Precision in Compliance"
                                    subtitle="Meticulous Regulatory Navigation"
                                />
                                <TrustBadge
                                    icon={<GrowthIcon />}
                                    title="Strategic Growth"
                                    subtitle="Data-Driven Insights"
                                />
                                <TrustBadge
                                    icon={<ModernIcon />}
                                    title="Modern Expertise"
                                    subtitle="Digital Financial Solutions"
                                />
                            </div>
                        </div>
                        <div className="hero-image">
                            <div className="hero-card floating">
                                <div className="card-header">
                                    <div className="status-indicator success"></div>
                                    <span>Your Trusted Advisory Partner</span>
                                </div>
                                <div className="card-stats">
                                    <div className="stat-item">
                                        <span className="stat-label">Established</span>
                                        <span className="stat-value">2026</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Expertise</span>
                                        <span className="stat-value success">Tax, Audit & Advisory</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Pillars Section */}
            <section className="key-pillars">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">The Advisory Advantage</h2>
                        <p className="section-subtitle">Why Partner with Aionion Advisory?</p>
                    </div>
                    <div className="pillars-grid">
                        <PillarCard
                            icon={<HolisticIcon />}
                            title="A Holistic Approach"
                            description="We see the big picture. Our one-stop solution approach means we handle everything from payroll and bookkeeping to high-level financial modeling."
                        />
                        <PillarCard
                            icon={<ClientCentricIcon />}
                            title="Client-Centric Philosophy"
                            description="Every client is assigned a dedicated manager to ensure proactive communication and personalized service."
                        />
                        <PillarCard
                            icon={<IntegrityIcon />}
                            title="Integrity & Excellence"
                            description="As a Peer-Reviewed firm, our quality controls meet the highest standards set by the ICAEW/MIA and ICAI."
                        />
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="services-overview">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Core Advisory Services</h2>
                        <p className="section-subtitle">Focus on value and breadth of expertise</p>
                    </div>
                    <div className="services-grid">
                        <ServiceCard
                            title="Taxation & Strategic Planning"
                            description="We don't just file returns; we architect tax strategies. Our advisory team ensures you remain compliant while optimizing your tax position."
                            features={["Direct & Indirect Tax (ITR & GST)", "International Taxation", "Representation & Appeals"]}
                            link="/services"
                            bgColor="#EEF2FF"
                            iconColor="#0066FF"
                        />
                        <ServiceCard
                            title="Audit & Assurance"
                            description="Enhance the credibility of your financial standing. Our audits are designed to provide stakeholders with absolute confidence."
                            features={["Statutory Audits", "Internal & Management Audits", "Due Diligence"]}
                            link="/services"
                            bgColor="#F0FDF4"
                            iconColor="#10B981"
                        />
                        <ServiceCard
                            title="Corporate Advisory & Registration"
                            description="From 'Idea to Incorporation,' we manage the lifecycle of your business entity: HUF creation, partnership registration, and corporate compliance."
                            features={["HUF Creation & Constitution Deed", "Partnership Registration (1932 Act)", "Pvt Ltd & LLP Incorporation"]}
                            link="/services"
                            bgColor="#FEF3F2"
                            iconColor="#F97316"
                        />
                        <Link to="/services" className="service-card service-card-cta">
                            <div className="service-icon">
                                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                                    <rect width="56" height="56" rx="16" fill="#E0F2FE" />
                                    <path d="M28 22V34M22 28H34" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 className="service-title">View All Services</h3>
                            <p className="service-description">Explore our complete range of advisory services.</p>
                            <div className="service-link">Browse Services →</div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sector-Specific Solutions */}
            <section className="sector-solutions">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Sector-Specific Solutions</h2>
                        <p className="section-subtitle">Our expertise is as diverse as our clientele. We provide specialized financial roadmaps for:</p>
                    </div>
                    <div className="sectors-grid">
                        <SectorCard
                            title="Manufacturing"
                            description="Optimizing cost structures and supply chain compliance."
                            color="#8B5CF6"
                        />
                        <SectorCard
                            title="Technology & Startups"
                            description="Fundraising advisory, ESOP structuring, and virtual CFO services."
                            color="#0066FF"
                        />
                        <SectorCard
                            title="Real Estate & Healthcare"
                            description="Navigating specific GST nuances and industry-specific regulations."
                            color="#10B981"
                        />
                        <SectorCard
                            title="Banking & Finance"
                            description="Expert audit and risk management services."
                            color="#F59E0B"
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">About Aionion Advisory</h2>
                    </div>
                    <div className="about-content">
                        <div className="vision-mission">
                            <div className="vm-card">
                                <h3>Our Vision</h3>
                                <p>To be the first-choice advisory firm for businesses seeking to turn financial challenges into growth opportunities.</p>
                            </div>
                            <div className="vm-card">
                                <h3>Our Mission</h3>
                                <p>To deliver value-added services that exceed expectations, rooted in transparency, courage, and continuous excellence.</p>
                            </div>
                        </div>
                        <div className="features-grid">
                            <FeatureCard
                                title="Cloud-Based Accounting"
                                description="Modern digital financial solutions for the tech-savvy client."
                            />
                            <FeatureCard
                                title="Paperless Environment"
                                description="Efficient, eco-friendly processes with secure digital documentation."
                            />
                            <FeatureCard
                                title="Dedicated Support"
                                description="Your personal manager is always available for proactive communication."
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-content">
                            <h2 className="cta-title">Ready to Elevate Your Financial Strategy?</h2>
                            <p className="cta-subtitle">Start your tax filing journey with our expert guidance.</p>
                            <div className="cta-buttons">
                                <Link to="/itr-filing" className="btn btn-white btn-lg" target="_blank" rel="noopener noreferrer">File ITR</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Helper Components
const TrustBadge = ({ icon, title, subtitle }) => (
    <div className="badge-item">
        <div className="badge-icon-circle">{icon}</div>
        <div className="badge-text">
            <strong>{title}</strong>
            <span>{subtitle}</span>
        </div>
    </div>
);

const PillarCard = ({ icon, title, description }) => (
    <div className="pillar-card">
        <div className="pillar-icon">{icon}</div>
        <h3 className="pillar-title">{title}</h3>
        <p className="pillar-description">{description}</p>
    </div>
);

const ServiceCard = ({ title, description, features, link, bgColor, iconColor }) => (
    <Link to={link} className="service-card">
        <div className="service-icon" style={{ backgroundColor: bgColor }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <rect width="56" height="56" rx="16" fill={bgColor} />
                <path d="M28 18V38M18 28H38" stroke={iconColor} strokeWidth="3" strokeLinecap="round" />
            </svg>
        </div>
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
        <ul className="service-features">
            {features.map((feature, index) => (
                <li key={index}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 8L7 9L10 6M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feature}
                </li>
            ))}
        </ul>
        <div className="service-link-text">Learn More →</div>
    </Link>
);

const SectorCard = ({ title, description, color }) => (
    <div className="sector-card" style={{ borderColor: color }}>
        <div className="sector-indicator" style={{ backgroundColor: color }}></div>
        <h3 className="sector-title">{title}</h3>
        <p className="sector-description">{description}</p>
    </div>
);

const FeatureCard = ({ title, description }) => (
    <div className="feature-card">
        <div className="feature-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 5L25 15L35 17L27.5 24L30 35L20 29L10 35L12.5 24L5 17L15 15L20 5Z" fill="#FBBF24" />
            </svg>
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
    </div>
);

// Icon Components
const PrecisionIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const GrowthIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 17L9 11L13 15L21 7M21 7H15M21 7V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ModernIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const HolisticIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="#0066FF" strokeWidth="2" />
        <circle cx="24" cy="24" r="12" stroke="#0066FF" strokeWidth="2" />
        <circle cx="24" cy="24" r="4" fill="#0066FF" />
    </svg>
);

const ClientCentricIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="16" r="8" stroke="#10B981" strokeWidth="2" />
        <path d="M8 40C8 31.1634 15.1634 24 24 24C32.8366 24 40 31.1634 40 40" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IntegrityIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 4L6 12V22C6 33.04 13.68 43.24 24 46C34.32 43.24 42 33.04 42 22V12L24 4Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 24L22 28L30 20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default Home;
