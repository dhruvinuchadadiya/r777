import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import PromoCards from "@/components/PromoCards";
import TopGames from "@/components/TopGames";
import BettingTables from "@/components/BettingTables";
import GameProviders from "@/components/GameProviders";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { AuthProvider } from './context/AuthContext';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0f0f1e]">
      <Header />
      <HeroCarousel />
      <PromoCards />
      <TopGames />
      <BettingTables />
      <GameProviders />
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

const PlaceholderPage = ({ title }) => {
  return (
    <div className="min-h-screen bg-[#0f0f1e]">
      <Header />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-white text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-400">This page is under construction</p>
      </div>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/in-play" element={<PlaceholderPage title="In-Play" />} />
          <Route path="/hundred-cup" element={<PlaceholderPage title="Hundred Cup" />} />
          <Route path="/cricket" element={<PlaceholderPage title="Cricket" />} />
          <Route path="/soccer" element={<PlaceholderPage title="Soccer" />} />
          <Route path="/tennis" element={<PlaceholderPage title="Tennis" />} />
          <Route path="/indian-poker" element={<PlaceholderPage title="Indian Poker" />} />
          <Route path="/indian-poker-2" element={<PlaceholderPage title="Indian Poker II" />} />
          <Route path="/rv-games" element={<PlaceholderPage title="RV Games" />} />
          <Route path="/aviator" element={<PlaceholderPage title="Aviator" />} />
          <Route path="/chicken-road" element={<PlaceholderPage title="Chicken Road" />} />
          <Route path="/ezugi" element={<PlaceholderPage title="Ezugi" />} />
          <Route path="/evolution" element={<PlaceholderPage title="Evolution" />} />
          <Route path="/live-casino" element={<PlaceholderPage title="Live Casino" />} />
          <Route path="/vivo" element={<PlaceholderPage title="Vivo" />} />
          <Route path="/betgames" element={<PlaceholderPage title="Betgames" />} />
          <Route path="/casino-3" element={<PlaceholderPage title="Casino III" />} />
          <Route path="/mini-game" element={<PlaceholderPage title="Mini Games" />} />
          <Route path="/menu" element={<PlaceholderPage title="Menu" />} />
          <Route path="/about" element={<PlaceholderPage title="About Us" />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms and Conditions" />} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
          <Route path="/betting-rules" element={<PlaceholderPage title="Betting Rules" />} />
          <Route path="/payment-rules" element={<PlaceholderPage title="Deposits and Withdrawals Rules" />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
