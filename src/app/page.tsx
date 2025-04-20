import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="flex-1 flex flex-col">
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}