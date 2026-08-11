import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import HeroCarousel from "./components/pages/home/HeroCarousel";
import PromoCards from "./components/pages/home/PromoCards";
import TopGames from "./components/pages/home/TopGames";
import BettingTables from "./components/pages/home/BettingTables";
import GameProviders from "./components/pages/home/GameProviders";
import Footer from "./components/layout/Footer";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import { AuthProvider } from "./context/AuthContext";
import InPlay from "./components/pages/InPlay";
import Cricket from "./components/pages/Cricket";
import Soccer from "./components/pages/Soccer";
import Tennis from "./components/pages/Tennis";
import ScrollToTop from "./components/shared/ScrollToTop";

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

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0f0f1e] text-white flex flex-col justify-between">
      <Header />
      <main className="flex-1">{children}</main>
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
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/in-play"
              element={
                <PageLayout>
                  <InPlay />
                </PageLayout>
              }
            />
            <Route
              path="/hundred-cup"
              element={<PlaceholderPage title="Hundred Cup" />}
            />
            <Route
              path="/cricket"
              element={
                <PageLayout>
                  <Cricket />
                </PageLayout>
              }
            />
            <Route
              path="/soccer"
              element={
                <PageLayout>
                  <Soccer />
                </PageLayout>
              }
            />
            <Route
              path="/tennis"
              element={
                <PageLayout>
                  <Tennis />
                </PageLayout>
              }
            />
            <Route
              path="/indian-poker"
              element={<PlaceholderPage title="Indian Poker" />}
            />
            <Route
              path="/indian-poker-2"
              element={<PlaceholderPage title="Indian Poker II" />}
            />
            <Route
              path="/rv-games"
              element={<PlaceholderPage title="RV Games" />}
            />
            <Route
              path="/aviator"
              element={<PlaceholderPage title="Aviator" />}
            />
            <Route
              path="/chicken-road"
              element={<PlaceholderPage title="Chicken Road" />}
            />
            <Route path="/ezugi" element={<PlaceholderPage title="Ezugi" />} />
            <Route
              path="/evolution"
              element={<PlaceholderPage title="Evolution" />}
            />
            <Route
              path="/live-casino"
              element={<PlaceholderPage title="Live Casino" />}
            />
            <Route path="/vivo" element={<PlaceholderPage title="Vivo" />} />
            <Route
              path="/betgames"
              element={<PlaceholderPage title="Betgames" />}
            />
            <Route
              path="/casino-3"
              element={<PlaceholderPage title="Casino III" />}
            />
            <Route
              path="/mini-game"
              element={<PlaceholderPage title="Mini Games" />}
            />
            <Route path="/menu" element={<PlaceholderPage title="Menu" />} />
            <Route
              path="/about"
              element={<PlaceholderPage title="About Us" />}
            />
            <Route
              path="/terms"
              element={<PlaceholderPage title="Terms and Conditions" />}
            />
            <Route
              path="/privacy"
              element={<PlaceholderPage title="Privacy Policy" />}
            />
            <Route
              path="/betting-rules"
              element={<PlaceholderPage title="Betting Rules" />}
            />
            <Route
              path="/payment-rules"
              element={
                <PlaceholderPage title="Deposits and Withdrawals Rules" />
              }
            />
            <Route
              path="/account-statement"
              element={<PlaceholderPage title="Account Statement" />}
            />
            <Route
              path="/profit-loss-report"
              element={<PlaceholderPage title="Profit Loss Report" />}
            />
            <Route
              path="/bet-history"
              element={<PlaceholderPage title="Bet History" />}
            />
            <Route
              path="/unsettled-bet"
              element={<PlaceholderPage title="Unsettled Bet" />}
            />
            <Route
              path="/set-stake"
              element={<PlaceholderPage title="Set Stake" />}
            />
            <Route
              path="/change-password"
              element={<PlaceholderPage title="Change Password" />}
            />
            <Route
              path="/results"
              element={<PlaceholderPage title="Results" />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
