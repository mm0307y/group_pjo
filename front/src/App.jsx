import React from "react";
import GlideCarousel from "./page/GlideCarousel";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">My Website</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-gray-700 hover:text-gray-900">Home</a></li>
          <li><a href="#" className="text-gray-700 hover:text-gray-900">About</a></li>
          <li><a href="#" className="text-gray-700 hover:text-gray-900">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

const HeroSection = () => {
  return (
    <section className="text-center py-20 bg-blue-500 text-white">
      <h2 className="text-4xl font-bold mb-4">Welcome to My Website</h2>
      <p className="text-lg mb-4">Explore our amazing content and features.</p>
      <button className="bg-white text-blue-500 px-6 py-2 rounded-md font-semibold hover:bg-gray-200">
        Get Started
      </button>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 mt-10">
      <p>&copy; 2025 My Website. All rights reserved.</p>
    </footer>
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <GlideCarousel />
      <Footer />
    </div>
  );
};

export default App;
