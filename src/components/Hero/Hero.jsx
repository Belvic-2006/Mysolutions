import React from 'react'
import image1 from '../../assets/hero/women.png'
import image2 from '../../assets/hero/shopping.png'
import image3 from '../../assets/hero/sale.png'
import Slider from 'react-slick'

const ImageList = [
  {
    id: 1,
    img: image1,
    title: "Up to 50% off on Women's Wear",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: image2,
    title: "Up to 30% off on men's Wear",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: image3,
    title: "70% off on all products sale",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  }
]

const Hero = () => {

    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };

  return (
    <div className='relative overflow-hidden
                    min-h-[550px] sm:min-h-[650px]
                    bg-gray-100 flex items-center
                    justify-center dark:bg-gray-950
                    dark:text-white duration-200'>
        {/* Background Pattern */}
        <div className='h-[700px] w-[700px] bg-primary/40
                  absolute rounded-3xl rotate-45 -z-9
                  -top-1/2 right-0'>

        </div>
        {/* Hero Section */}
        <div className='container pb-8 sm:pb-0'>
            <Slider {...settings}>
                {ImageList.map((data) => (
                    <div>
                <div className='grid grid-cols-1 sm:grid-cols-2 '>
                    {/* Text content section */}
                    <div className='
                    flex flex-col justify-center gap-4
                    pt-12 sm:p-0 text-center sm:text-left
                    order-2 sm:order-1 relative z-10'>
                        <h1 data-aos="zoom-out"
                        data-duration="500"
                        data-aos-once="true"
                        className='text-5xl sm:text-6xl
                                       lg:text-7xl font-bold'>{data.title}</h1>
                        <p data-aos="fade-up"
                           data-duration="500"
                           data-aos-delay="100"
                        className='text-sm'>
                            {data.description}
                        </p>
                        <div data-aos="fade-up"
                           data-duration="500"
                           data-aos-delay="300"
                        >
                            <button className='bg-gradient-to-r from-primary to-secondary
                                                 hover:scale-105 duration-200 text-white
                                                 px-4 py-2 rounded-full'
                            >Order Now</button>
                        </div>
                    </div>
                    {/* Image section */}
                    <div className='order-1 sm:order-2
                                    relative z-10'>
                        <div>
                            <img src={data.img} alt="women"
                               className='h-[300px] w-[300px] 
                                          sm:h-[450px] sm:w-[450px]
                                          sm:scale-125 object-contain 
                                          mx-auto lg:scale-120' />
                        </div>
                    </div>
                </div>
            </div>
                )
             )}
                
            </Slider>
            
        </div>
    </div>
  )
}

export default Hero