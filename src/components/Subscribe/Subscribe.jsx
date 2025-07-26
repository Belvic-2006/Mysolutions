import React from 'react'
import Banner from '../../assets/website/orange-pattern.jpg'

const BannerImg = {
    backgroundImage: `url(${Banner})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
}

const Subscribe = () => {
  return (
    <div data-aos="zoom-in" data-aos-delay="0">
        <div style={{ ...BannerImg, width: "100vw", height: "200px" }}
              className='flex items-center justify-center text-center 
              text-black dark:text-white group mt-0'
             >
          <div data-aos="zoom-in" data-aos-delay="200">
            <input type="email" placeholder='Enter your email address' 
            className='p-2  group-hover:scale-110 min-w-[300px] sm-min-w-[400px]
                      border hover:border-blue-600 duration-200
                      ' />
          </div>
        </div>
    </div>
  )
}

export default Subscribe