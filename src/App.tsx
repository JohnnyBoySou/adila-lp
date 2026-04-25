import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav.tsx";
import { Footer } from "./components/Footer.tsx";
import { ScrollToHash } from "./components/ScrollToHash.tsx";
import { Home } from "./pages/Home.tsx";
import { Roadmap } from "./pages/Roadmap.tsx";
import { Docs } from "./pages/Docs.tsx";
import { Cli } from "./pages/Cli.tsx";
import { About } from "./pages/About.tsx";
import { Privacy } from "./pages/Privacy.tsx";
import { License } from "./pages/License.tsx";
import { Contact } from "./pages/Contact.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="min-h-screen bg-bg text-ink">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/cli" element={<Cli />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/licenca" element={<License />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
