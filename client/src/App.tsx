import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OmniPublisher } from './pages/OmniPublisher';
import { LandingPage } from './pages/LandingPage';
import { AdSenseScript } from './components/AdSenseScript';

export default function App() {
  return (
    <BrowserRouter>
      <AdSenseScript />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/omni-publisher" element={<OmniPublisher />} />
      </Routes>
    </BrowserRouter>
  );
}
