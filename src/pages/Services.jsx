import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
    return (
        <div className="services-page">
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1 className="page-title">Core Advisory Services</h1>
                        <p className="page-subtitle">
                            Focus on the value and breadth of expertise rather than costs.
                            We deliver comprehensive solutions tailored to your business needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* 11 Online Client Intake & Advisory Services */}
            <section className="service-section catalog-highlight-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="badge-highlight">Online Service Intake</span>
                        <h2 className="section-title">Corporate & Financial Services Catalog</h2>
                        <p className="section-subtitle">
                            Direct CA-assisted registration, compliance, and tax advisory for trading firms and businesses.
                        </p>
                    </div>

                    <div className="catalog-cards-grid">
                        {/* 1. ITR Filing */}
                        <div className="catalog-action-card featured">
                            <div className="card-top-tag">Most Popular</div>
                            <div className="catalog-icon">📊</div>
                            <h3>Income Tax Filing (ITR)</h3>
                            <p>End-to-end ITR preparation (ITR-1 to 7) with capital gains, F&O trading audit, and NRI tax exemptions.</p>
                            <Link to="/itr-filing" className="btn-catalog-action primary">
                                File ITR Online →
                            </Link>
                        </div>

                        {/* 2. HUF Creation */}
                        <div className="catalog-action-card highlighted">
                            <div className="card-top-tag new-tag">New Service</div>
                            <div className="catalog-icon">👨‍👩‍👧‍👦</div>
                            <h3>HUF Creation</h3>
                            <p>Establish a Hindu Undivided Family tax entity. Includes constitution deed drafting, PAN application, and Karta advisory.</p>
                            <Link to="/services/huf-creation" className="btn-catalog-action accent">
                                Apply for HUF Creation →
                            </Link>
                        </div>

                        {/* 3. Partnership Registration */}
                        <div className="catalog-action-card highlighted">
                            <div className="card-top-tag new-tag">New Service</div>
                            <div className="catalog-icon">🤝</div>
                            <h3>Partnership Registration</h3>
                            <p>Register your firm under Indian Partnership Act, 1932. Custom partnership deed drafting and registrar compliance.</p>
                            <Link to="/services/partnership-registration" className="btn-catalog-action accent">
                                Register Partnership Firm →
                            </Link>
                        </div>

                        {/* 4. GST Registration */}
                        <div className="catalog-action-card">
                            <div className="catalog-icon">📑</div>
                            <h3>GST Registration</h3>
                            <p>New GST registration for proprietorship, partnership, and corporate entities with fast jurisdictional approval.</p>
                            <a href="https://wa.me/919446416175?text=Hi%2C%20I%20am%20interested%20in%20GST%20Registration" target="_blank" rel="noopener noreferrer" className="btn-catalog-action secondary">
                                Inquire on WhatsApp →
                            </a>
                        </div>

                        {/* 5. GST Filing */}
                        <div className="catalog-action-card">
                            <div className="catalog-icon">📈</div>
                            <h3>GST Monthly & Annual Filing</h3>
                            <p>Monthly GSTR-1, GSTR-3B filings, input tax credit reconciliation, and GSTR-9 annual compliance.</p>
                            <a href="https://wa.me/919446416175?text=Hi%2C%20I%20am%20interested%20in%20GST%20Filing" target="_blank" rel="noopener noreferrer" className="btn-catalog-action secondary">
                                Inquire on WhatsApp →
                            </a>
                        </div>

                        {/* 6. Tax Advisory */}
                        <div className="catalog-action-card">
                            <div className="catalog-icon">💡</div>
                            <h3>Strategic Tax Advisory</h3>
                            <p>Advanced tax planning for high-net-worth individuals, business restructuring, capital gains, and trust taxation.</p>
                            <a href="https://wa.me/919446416175?text=Hi%2C%20I%20am%20interested%20in%20Tax%20Advisory" target="_blank" rel="noopener noreferrer" className="btn-catalog-action secondary">
                                Inquire on WhatsApp →
                            </a>
                        </div>

                        {/* 7. Company Registration */}
                        <div className="catalog-action-card">
                            <div className="catalog-icon">🏢</div>
                            <h3>Company Registration (Pvt Ltd / LLP)</h3>
                            <p>Incorporate a Private Limited, LLP, or One Person Company with MCA, DIN, DSC, and MOA/AOA filing.</p>
                            <a href="https://wa.me/919446416175?text=Hi%2C%20I%20am%20interested%20in%20Company%20Registration" target="_blank" rel="noopener noreferrer" className="btn-catalog-action secondary">
                                Inquire on WhatsApp →
                            </a>
                        </div>

                        {/* 8. Book Keeping Services */}
                        <div className="catalog-action-card">
                            <div className="catalog-icon">📚</div>
                            <h3>Book Keeping & Accounting</h3>
                            <p>Day-to-day transaction ledger entry, bank reconciliations, accounts payable/receivable, and P&L reporting.</p>
                            <a href="https://wa.me/919446416175?text=Hi%2C%20I%20am%20interested%20in%20Book%20Keeping" target="_blank" rel="noopener noreferrer" className="btn-catalog-action secondary">
                                Inquire on WhatsApp →
                            </a>
                        </div>

                        {/* 9. Litigation Support */}
                        <div className="catalog-action-card">
                            <div className="catalog-icon">⚖️</div>
                            <h3>Litigation & Scrutiny Support</h3>
                            <p>Handling Income Tax notices (Section 143, 148), faceless assessment representations, and CIT appeals.</p>
                            <a href="https://wa.me/919446416175?text=Hi%2C%20I%20am%20interested%20in%20Litigation%20Support" target="_blank" rel="noopener noreferrer" className="btn-catalog-action secondary">
                                Inquire on WhatsApp →
                            </a>
                        </div>

                        {/* 10. Statutory Compliance */}
                        <div className="catalog-action-card">
                            <div className="catalog-icon">🛡️</div>
                            <h3>Statutory & ROC Compliance</h3>
                            <p>Annual ROC filings (MGT-7, AOC-4), director KYC, board resolutions, and mandatory statutory registrations.</p>
                            <a href="https://wa.me/919446416175?text=Hi%2C%20I%20am%20interested%20in%20Statutory%20Compliance" target="_blank" rel="noopener noreferrer" className="btn-catalog-action secondary">
                                Inquire on WhatsApp →
                            </a>
                        </div>

                        {/* 11. Other Services */}
                        <div className="catalog-action-card">
                            <div className="catalog-icon">✨</div>
                            <h3>Other Financial Services</h3>
                            <p>Custom advisory, financial modeling, MSME/Udyam registration, and specialized certification services.</p>
                            <a href="https://wa.me/919446416175?text=Hi%2C%20I%20am%20interested%20in%20Other%20Services" target="_blank" rel="noopener noreferrer" className="btn-catalog-action secondary">
                                Inquire on WhatsApp →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Taxation & Strategic Planning */}
            <section className="service-section">
                <div className="container">
                    <div className="service-section-header">
                        <div className="service-section-icon taxation">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                                <path d="M16 24H32M16 30H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M16 18H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="service-section-title">Taxation & Strategic Planning</h2>
                            <p className="service-section-desc">
                                We don't just file returns; we architect tax strategies. Our advisory team ensures
                                you remain compliant while optimizing your tax position under current regulatory frameworks.
                            </p>
                        </div>
                    </div>
                    <div className="services-detailed-grid">
                        <ServiceDetailCard
                            title="Direct & Indirect Tax"
                            description="Comprehensive planning for ITR and GST. We analyze your financial structure to minimize tax liability while maintaining full compliance."
                            features={[
                                "Income Tax Return (ITR-1 to ITR-7)",
                                "GST Registration & Monthly Filing",
                                "Tax Planning & Optimization",
                                "Advance Tax Calculations"
                            ]}
                        />
                        <ServiceDetailCard
                            title="International Taxation"
                            description="Navigating cross-border complexities for global operations. Expert guidance on transfer pricing, DTAA benefits, and international compliance."
                            features={[
                                "Cross-border Transaction Advisory",
                                "Transfer Pricing Documentation",
                                "DTAA Benefits Optimization",
                                "Foreign Income Reporting"
                            ]}
                        />
                        <ServiceDetailCard
                            title="Representation & Appeals"
                            description="Expert handling of assessments and appeals before regulatory authorities. We represent your interests effectively."
                            features={[
                                "Assessment Proceedings",
                                "Appeal Preparation & Filing",
                                "Dispute Resolution",
                                "Tribunal Representation"
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Audit & Assurance */}
            <section className="service-section alt-bg">
                <div className="container">
                    <div className="service-section-header">
                        <div className="service-section-icon audit">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
                                <path d="M18 24L22 28L30 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="service-section-title">Audit & Assurance</h2>
                            <p className="service-section-desc">
                                Enhance the credibility of your financial standing. Our audits are designed
                                to provide stakeholders with absolute confidence in your financial reporting.
                            </p>
                        </div>
                    </div>
                    <div className="services-detailed-grid">
                        <ServiceDetailCard
                            title="Statutory Audits"
                            description="Compliance with the Companies Act and other regulatory mandates. Thorough examination ensuring accuracy and adherence to standards."
                            features={[
                                "Companies Act Compliance",
                                "Financial Statement Audit",
                                "Regulatory Compliance Review",
                                "Audit Report Preparation"
                            ]}
                        />
                        <ServiceDetailCard
                            title="Internal & Management Audits"
                            description="Identifying operational leaks and strengthening internal controls. Enhance efficiency and mitigate risks effectively."
                            features={[
                                "Process Efficiency Review",
                                "Internal Control Assessment",
                                "Risk Management Evaluation",
                                "Operational Improvement"
                            ]}
                        />
                        <ServiceDetailCard
                            title="Due Diligence"
                            description="Critical financial analysis for mergers, acquisitions, and investments. Make informed decisions with comprehensive insights."
                            features={[
                                "M&A Financial Analysis",
                                "Investment Due Diligence",
                                "Risk Assessment Reports",
                                "Valuation Support"
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Corporate Advisory & Secretarial */}
            <section className="service-section">
                <div className="container">
                    <div className="service-section-header">
                        <div className="service-section-icon corporate">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M24 4L42 14V34L24 44L6 34V14L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                <path d="M24 20V28M24 32H24.02" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="service-section-title">Corporate Advisory & Secretarial</h2>
                            <p className="service-section-desc">
                                From "Idea to Incorporation," we manage the lifecycle of your business entity
                                with strategic guidance and comprehensive secretarial support.
                            </p>
                        </div>
                    </div>
                    <div className="services-detailed-grid">
                        <ServiceDetailCard
                            title="Entity Registration"
                            description="Strategic advice on choosing the right structure. We guide you through Private Limited, LLP, Partnership, and other business formations."
                            features={[
                                "Private Limited Company",
                                "Limited Liability Partnership",
                                "One Person Company (OPC)",
                                "Partnership & Proprietorship"
                            ]}
                        />
                        <ServiceDetailCard
                            title="Corporate Governance"
                            description="Ensuring your Board and management adhere to the highest standards of corporate law and governance practices."
                            features={[
                                "Board Meeting Compliance",
                                "Annual Filing & Returns",
                                "Director Appointments",
                                "Shareholder Agreements"
                            ]}
                        />
                        <ServiceDetailCard
                            title="FEMA & RBI Compliance"
                            description="Specialized advisory for foreign investments and regulatory reporting. Navigate complex cross-border regulations with confidence."
                            features={[
                                "FDI Compliance",
                                "External Commercial Borrowings",
                                "ODI Reporting",
                                "LRS Transactions"
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Sector Solutions */}
            <section className="sector-solutions-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Sector-Specific Solutions</h2>
                        <p className="section-subtitle">
                            Our expertise is as diverse as our clientele. We provide specialized financial roadmaps for:
                        </p>
                    </div>
                    <div className="sector-grid">
                        <div className="sector-item">
                            <div className="sector-icon manufacturing">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M4 28H28M8 28V16L16 8L24 16V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Manufacturing</h3>
                            <p>Optimizing cost structures and supply chain compliance.</p>
                        </div>
                        <div className="sector-item">
                            <div className="sector-icon technology">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <rect x="6" y="8" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <path d="M12 26H20M16 22V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3>Technology & Startups</h3>
                            <p>Fundraising advisory, ESOP structuring, and virtual CFO services.</p>
                        </div>
                        <div className="sector-item">
                            <div className="sector-icon realestate">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M4 28H28M6 28V12L16 4L26 12V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <rect x="12" y="18" width="8" height="10" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <h3>Real Estate & Healthcare</h3>
                            <p>Navigating specific GST nuances and industry-specific regulations.</p>
                        </div>
                        <div className="sector-item">
                            <div className="sector-icon banking">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M4 12L16 4L28 12M6 14V26H26V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 18V22M16 18V22M22 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3>Banking & Finance</h3>
                            <p>Expert audit and risk management services.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ServiceDetailCard = ({ title, description, features, badge }) => (
    <div className="service-detail-card">
        {badge && <div className="service-badge">{badge}</div>}
        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-description">{description}</p>
        <ul className="service-features-list">
            {features.map((feature, index) => (
                <li key={index}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default Services;
