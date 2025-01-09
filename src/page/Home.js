import React from 'react';
import Navbar from '../component/Navbar';
import HeroSection from '../component/HeroSection';
import SecondSection from '../component/SecondSection';
import ThirdSection from '../component/ThirdSection';
import PromoSection from '../component/PromoSection';
import ShiekSection from '../component/ShiekSection'
import SectionFive from '../component/SectionFive';
import Footer from '../component/Footer';
import FAQSection from '../component/FAQSection'
function Home() {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main >
        <HeroSection/>
        <SecondSection/>
         <ThirdSection/>
       <PromoSection/>
       <SectionFive/>
       <ShiekSection/>
        <FAQSection/>
       <Footer/>


      </main>
    </>
  );
}

export default Home;
