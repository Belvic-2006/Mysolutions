import React from 'react'
import footer from '../../assets/website/footer-pattern.jpg'
import logo from '../../assets/logo.png'
import{
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt
} from "react-icons/fa" ;

const footerImg = {
    backgroundImage: `url(${footer})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
   width: "100%",
    Height: "100%",
};
const footerLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About Us",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const Footer = () => {
  return (
    <div style={footerImg} className='text-white mt-10 mb-0'>
        <div data-aos="zoom-in"
        className='container'>
          <div className='grid md:grid-cols-3 pb-44 pt-5'>
            {/* Company Details */}
            <div className='py-8 px-4'>
              <h1 className='sm:text-3xl text-xl font-bold
                            text-justify sm:text-left gap-3
                            mb-3 flex items-center'
              >
                <img src={logo} alt="" 
                className='max-w-[50px] '/>
                Shopsy</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores perspiciatis impedit facilis consequuntur, accusamus saepe.</p>
            </div>
            {/* Footer links */}
            <div className='grid grid-cols-2 sm:grid-cols3
                            col-span-2 md:pl-10'>
              <div>
                  <div className='py-8 px-4'>
                    <h1 className='sm:text-3xl text-xl font-bold
                            text-justify sm:text-left mb-3'
                            >Important Links</h1>
                  <ul className='flex flex-col gap-3'>
                    {
                    footerLinks.map((link) => (
                      <li className='cursor-pointer hover:text-primary
                                    hover:translate-x-1 duration-300 text-gray-200'
                      key={link.title}>
                        <span>{link.title}</span>
                      </li>
                    ))
                  }
                  </ul>
                  </div>
              </div>
              <div>
                  <div className='py-8 px-4'>
                    <h1 className='sm:text-3xl text-xl font-bold
                            text-justify sm:text-left mb-3'
                            >Important Links</h1>
                  <ul className='flex flex-col gap-3'>
                    {
                    footerLinks.map((link) => (
                      <li className='cursor-pointer hover:text-primary
                                    hover:translate-x-1 duration-300 text-gray-200'
                      key={link.title}>
                        <span>{link.title}</span>
                      </li>
                    ))
                  }
                  </ul>
                  </div>
              </div>
              </div>
              {/* Social links */}
              <div className='mb-0'>
                  <div className="flex items-center gap-10 mt-6 ">
                    <a href="#">
                       <FaFacebook className='text-3xl hover:scale-125 duration-200' />
                    </a>
                    <a href="#">
                       <FaInstagram className='text-3xl hover:scale-125 duration-200' />
                    </a>
                    <a href="#">
                       <FaLinkedin className='text-3xl hover:scale-125 duration-200' />
                    </a>                      
                    
                  </div>
                  <div className="mt-6">
                    <div className='flex items-center gap-3'>
                      <FaLocationArrow/>
                      <p>Tsona Belvic</p>
                    </div>
                    <div className='flex items-center gap-3 mt-4'>
                      <FaMobileAlt/>
                      <p>+237 670016296</p>
                    </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Footer