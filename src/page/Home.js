import React from 'react';
import Navbar from '../component/Navbar';
import HeroSection from '../component/HeroSection';
import SecondSection from '../component/SecondSection';
import ThirdSection from '../component/ThirdSection';
import PromoSection from '../component/PromoSection'
import PartnerSection from '../component/PartnerSection'
import ContactForm from '../component/ContactForm'


function Home() {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className="p-20 flex flex-col items-center">
        <HeroSection/>
        <div> </div>
        <SecondSection/>
        <ThirdSection/>
        <PromoSection/>
        <PartnerSection/>
        <ContactForm/>
      </main>
    </>
  );
}

export default Home;
