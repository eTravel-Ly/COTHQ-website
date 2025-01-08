import React from 'react';
import Navbar from '../component/Navbar';
import HeroSection from '../component/HeroSection';
import SecondSection from '../component/SecondSection';
import ThirdSection from '../component/ThirdSection';
import PromoSection from '../component/PromoSection';
import ContactForm from '../component/ContactForm';
import PromoSectionWithMap from '../component/PromoSectionWithMap';
import ShiekSection from '../component/ShiekSection'
import SectionFive from '../component/SectionFive';
import Footer from '../component/Footer';
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
        
       <Footer/>


      </main>
    </>
  );
}

export default Home;
