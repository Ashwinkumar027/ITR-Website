import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1 className="page-title">My Dashboard</h1>
                        <p className="page-subtitle">Manage your tax returns and documents</p>
                    </div>
                </div>
            </section>

            <section className="dashboard-content">
                <div className="container">
                    <div className="dashboard-grid">
                        {/* Welcome Card */}
                        <div className="dashboard-card welcome-card">
                            <h2>Welcome back!</h2>
                            <p>Track your ITR filing status and manage all your tax documents in one place.</p>
                            <Link to="/itr-filing" className="btn btn-primary">
                                File New ITR
                            </Link>
                        </div>

                        {/* Stats Cards */}
                        <div className="stats-card">
                            <div className="stat-icon">📄</div>
                            <div className="stat-details">
                                <div className="stat-value">3</div>
                                <div className="stat-label">Filed Returns</div>
                            </div>
                        </div>

                        <div className="stats-card">
                            <div className="stat-icon">⏳</div>
                            <div className="stat-details">
                                <div className="stat-value">1</div>
                                <div className="stat-label">Pending</div>
                            </div>
                        </div>

                        <div className="stats-card">
                            <div className="stat-icon">💰</div>
                            <div className="stat-details">
                                <div className="stat-value">₹45,000</div>
                                <div className="stat-label">Total Refund</div>
                            </div>
                        </div>
                    </div>

                    {/* Returns Table */}
                    <div className="returns-table-card">
                        <h3>My Returns</h3>
                        <div className="returns-table">
                            <div className="table-header">
                                <div>Year</div>
                                <div>Type</div>
                                <div>Status</div>
                                <div>Refund</div>
                                <div>Action</div>
                            </div>
                            <ReturnRow
                                year="2025-26"
                                type="ITR-1"
                                status="Filed"
                                statusColor="success"
                                refund="₹45,000"
                            />
                            <ReturnRow
                                year="2023-24"
                                type="ITR-1"
                                status="Processed"
                                statusColor="success"
                                refund="₹32,000"
                            />
                            <ReturnRow
                                year="2022-23"
                                type="ITR-2"
                                status="Completed"
                                statusColor="success"
                                refund="₹18,500"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ReturnRow = ({ year, type, status, statusColor, refund }) => (
    <div className="table-row">
        <div><strong>{year}</strong></div>
        <div>{type}</div>
        <div><span className={`status-badge status-${statusColor}`}>{status}</span></div>
        <div className="refund-amount">{refund}</div>
        <div>
            <button className="btn-download">Download</button>
        </div>
    </div>
);

export default Dashboard;
