import React from 'react'
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logo from '../assets/images/logo.svg'
import { LocationOn, Phone, MailOutline } from "@mui/icons-material";
import { Copyright } from "@mui/icons-material";
import Footerlang from "../context/Footerlang";
import { useTranslation } from "../context/TranslationContext"; 
export default function Footer() {
  const { translations, language } = useTranslation();
  const isRtl = language === "ar";
  return (
    <>
 <div
      id="contact"
      dir={isRtl ? "rtl" : "ltr"} 
      className={`bg-[#006b80bc] text-white py-10`}
      style={{
        fontFamily: "Tajwal, sans-serif",
        borderRadius: "50px 50px 0 0",
      }}
    >
      <div className="container mx-auto px-4">
        <div className={`flex flex-wrap justify-center ${isRtl ? "text-right" : "text-left"}`}>
          {/* Logo Section */}
          <div className="w-full sm:w-1/3 text-center mb-8">
            <div className="flex flex-col items-center justify-center">
              <img src={logo} alt="Logo" className="max-w-[150px]" />
              <h4 className="text-2xl font-bold mt-1">{translations.logoTitle}</h4>
              <p className="text-sm mt-2 mx-4">{translations.logoDescription}</p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="w-full sm:w-1/2 md:w-1/3 mb-8">
            <h4 className="text-2xl font-bold mt-1">{translations.servicesTitle}</h4>
            <div className="space-y-2 mt-4">
              {translations.services1.map((service, index) => (
                <p className="text-sm" key={index}>
                  {service}
                </p>
              ))}
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="w-full sm:w-1/3 mb-8">
            <h4 className="text-2xl font-bold mt-1">{translations.contactTitle}</h4>
            <div className={`flex ${isRtl ? "justify-end" : "justify-start"} gap-6 mt-4`}>
              <a href="#" className="text-white">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white">
                <FaLinkedinIn size={24} />
              </a>
              <a href="#" className="text-white">
                <FaTwitter size={24} />
              </a>
            </div>

            <div className={`flex ${isRtl ? "justify-end" : "justify-start"} gap-6 mt-4`}>
              <a href="#" className="text-white">
                <LocationOn size={24} />
              </a>
              <p>{translations.location}</p>
            </div>

            <div className={`flex ${isRtl ? "justify-end" : "justify-start"} gap-6 mt-4`}>
              <a href="#" className="text-white">
                <Phone size={24} />
              </a>
              <p>{translations.phone}</p>
            </div>

            <div className={`flex ${isRtl ? "justify-end" : "justify-start"} gap-6 mt-4`}>
              <a href="#" className="text-white">
                <MailOutline size={24} />
              </a>
              <p>{translations.email}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white my-6"></div>

        {/* Privacy Policy and Copyright */}
        <div className="text-center font-bold">
        <div className="flex justify-center space-x-6 mb-2">
            <p className="text-sm">
              {translations.copyright} | <Copyright className="ml-2" />
            </p>
            <p className="text-sm">{translations.complexName}</p>
          </div>
          <p className="text-sm">{translations.year}</p>
        </div>
      </div>
    </div>
    </>
  )
}
