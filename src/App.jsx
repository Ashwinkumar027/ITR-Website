import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import WhatsAppSupport from './components/WhatsAppSupport';
import { FormProvider } from './context/FormContext';
import './ITRForm.css';

// ITR Form Sections
import Section1 from './sections/Section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Section4 from './sections/Section4';
import Section5 from './sections/Section5';
import Section6 from './sections/Section6';
import Section7 from './sections/Section7';
import Section8 from './sections/Section8';
import Section9 from './sections/Section9';
import Section10 from './sections/Section10';
import Section11 from './sections/Section11';
import ITRSuccess from './pages/ITRSuccess';
import HUFForm from './pages/HUFForm';
import PartnershipForm from './pages/PartnershipForm';

/**
 * AppContent handles the conditional rendering of Navbar/Footer
 * based on the current route. We hide them for ITR filing sections.
 */
const AppContent = () => {
    const location = useLocation();

    // Paths where we want to hide the standard Navbar and Footer
    const isITRRoute = location.pathname.startsWith('/section-') ||
        location.pathname === '/itr-filing' ||
        location.pathname === '/success';

    return (
        <div className="App">
            {!isITRRoute && <Navbar />}

            <Routes>
                {/* Main Website Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />

                {/* Corporate & Entity Intake Forms */}
                <Route path="/services/huf-creation" element={<HUFForm />} />
                <Route path="/huf-creation" element={<HUFForm />} />
                <Route path="/services/partnership-registration" element={<PartnershipForm />} />
                <Route path="/partnership-registration" element={<PartnershipForm />} />

                {/* ITR Filing Routes - Integrated */}
                <Route path="/itr-filing" element={<Section1 />} />
                <Route path="/section-1" element={<Section1 />} />
                <Route path="/section-2" element={<Section2 />} />
                <Route path="/section-3" element={<Section3 />} />
                <Route path="/section-4" element={<Section4 />} />
                <Route path="/section-5" element={<Section5 />} />
                <Route path="/section-6" element={<Section6 />} />
                <Route path="/section-7" element={<Section7 />} />
                <Route path="/section-8" element={<Section8 />} />
                <Route path="/section-9" element={<Section9 />} />
                <Route path="/section-10" element={<Section10 />} />
                <Route path="/section-11" element={<Section11 />} />
                <Route path="/success/:submissionId?" element={<ITRSuccess />} />
            </Routes>

            {!isITRRoute && <WhatsAppSupport />}
            {!isITRRoute && <Footer />}
        </div>
    );
};

function App() {
    return (
        <FormProvider>
            <Router>
                <AppContent />
            </Router>
        </FormProvider>
    );
}

export default App;
