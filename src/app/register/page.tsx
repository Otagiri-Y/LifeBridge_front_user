import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      {/*ここにページのコード記述する*/}
      <Footer />
    </div>
  );
}
