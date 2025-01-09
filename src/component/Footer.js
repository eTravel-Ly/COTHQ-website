import React from 'react'
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logo from '../assets/images/logo.svg'
import { LocationOn, Phone, MailOutline } from "@mui/icons-material";
import { Copyright } from "@mui/icons-material";
export default function Footer() {
  return (
    <>
<div 
id="contact"
  dir='rtl' 
  className={`bg-[#006b80bc] text-white py-10`} 
  style={{ 
    fontFamily: "Tajwal, sans-serif", 
    borderRadius: "50px 50px 0 0" // الحواف مدورة على اليمين واليسار
  }}>      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center ">
          {/* Logo and Description */}
          <div className="w-full sm:w-1/3 text-center mb-8">
  <div className="flex flex-col items-center justify-center">
    <img src={logo} alt="Logo" className="max-w-[150px]" />
    <h4 className="text-2xl font-bold mt-1">مجمع القرآن الكريم</h4>
    <p className="text-sm mt-2 mx-4">
      مَجْمَعُ يُعني بالإشراف على تعليم القرآن الكريم، ودراسة علومه،
      وإقامة الدراسات المُعمَقة عنه، إظهارا لمقاصده، وتحقيقا لأهدافه، وإبرازا
      لمعارفه وهداياته.
    </p>
  </div>
</div>


          {/* Footer Links */}
          <div className="w-full sm:w-1/2 md:w-1/3 text-center mb-8">
          <h4 className="text-2xl font-bold mt-1">خدماتنا الالكترونية  </h4>
            <div className="space-y-2 mt-4">
              <p className="text-sm">تعليم التلاوة والتجويد</p>
              <p className="text-sm">تعليم الحفظ</p>
              <p className="text-sm">تعليم التفسير</p>
              <p className="text-sm">تعليم الاعراب </p>
              <p className="text-sm">تعليم القراءات</p>
              <p className="text-sm">تعليم المتشابهات</p>

            </div>
          </div>

          {/* Social Media Icons */}
          <div className="w-full sm:w-1/3 text-center mb-8">
          <h4 className="text-2xl font-bold mt-1"> تواصل معنا!  </h4>
            <div className="flex justify-center gap-6 mt-4">
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

            <div className="flex justify-center gap-6 mt-4">
              <a href="#" className="text-white">
                <LocationOn size={24} />
              </a>
              <p>
                زليتن، ليبيا
              </p>
             
            </div>
            <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-white">
                <Phone size={24} />
              </a>
              <p>
                218-2100000+
              </p>
             
            </div>
            <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-white">
                <MailOutline size={24} />
              </a>
              <p>
                info@hqcl.gov.ly
              </p>
             
            </div>
            
          
            
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white my-6"></div>

        {/* Privacy Policy and Copyright */}
        <div className="text-center font-bold">
          <div className="flex justify-center space-x-6 mb-2">
            <p className="text-sm"> جميع الحقوق محفوظة | <Copyright className='ml-2 '/> </p>
            <p className="text-sm"> مجمع القرآن الكريم </p>
          </div>
          <p className="text-sm">2025</p>
        </div>
      </div>
    </div> 
    </>
  )
}
