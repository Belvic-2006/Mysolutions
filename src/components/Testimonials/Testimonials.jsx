import React from 'react'
import image1 from '../../assets/shirt/shirt.png'
import image2 from '../../assets/website/orange-pattern.jpg'
import image3 from '../../assets/website/footer-pattern.jpg'
import Slider from 'react-slick'

const ImageList = [
  {
    id: 1,
    img: image1,
    name: "Victor",
    review:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: image2,
    name: "Satya Nadella",
    review:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: image3,
    name: "Virat Kohli",
    review:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    img: image2,
    name: "Sachin Tendulkar",
    review:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  }
]

const Testimonials = () => {
   var settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  //slidesToShow: 3, // <— Show 3 cards per slide
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: "linear",
  pauseOnHover: true,
  pauseOnFocus: true,
  responsive: [
    {
      breakpoint: 10000, // small screens
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 1024, // small screens
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },

    }
  , {
      breakpoint: 640, // medium screens
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

  return (
    <div>
        {/* Header Section*/}
            <div className='text-center mb-10
                            max-w-[600px] mx-auto'>
                <p className='text-sm text-primary'>
                    What our customers say</p>
                <h1 data-aos="fade-up"
                className='text-3xl font-bold'>Testimonials</h1>
                <p data-aos="fade-up"
                className='text-xs text-gray-400 '>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam deleniti modi.
                </p>
            </div>
        {/* Card Section */}
        <div data-aos="zoom-in">
            
            <Slider {...settings}>
                {ImageList.map((data) => (
                  <div className='my-6'>
                <div key={data.id} 
                className='flex flex-col gap-4 
                           shadow-lg py-8 px-6 mx-4 rounded-xl
                           dark:bg-gray-800 bg-primary/10 relative'>
                  <div>                             {/* The image section */}
                      <img src={data.img} alt={data.name}
                        className='h-20 w-20 rounded-full mb-4' />
                  </div>
                  <div className='flex flex-col items-center gap-4'>{/* The text section */}
                    <div className='space-y-3'>
                      <p className='text-xs text-gray-400'
                      >{data.review}</p>
                      <h1 className='text-xl font-bold text-black/80 dark:text-light'
                      >{data.name}</h1>
                    </div>
                  </div>{/* The background mark */}
                  <p className='text-black/20 text-9xl font-serif
                                 absolute top-0 right-0'>
                                  ,,
                  </p>
                </div>
                </div>
                )
             )}
                
            </Slider>
            
        </div>
    </div>
  )
}

export default Testimonials