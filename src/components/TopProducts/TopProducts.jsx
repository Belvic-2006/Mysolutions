import React from 'react'
import image1 from '../../assets/shirt/shirt.png'
import image2 from '../../assets/shirt/shirt2.png'
import image3 from '../../assets/shirt/shirt3.png'
import { FaStar } from 'react-icons/fa6'

const ProductsData =[
    {
        index: 1,
        image: image1,
        title: "Casual wear",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam deleniti modi.",
        rating: 5.0,
        color: "white",
        aosDelay: "0"
      },
      {
        index: 2,
        image: image2,
        title: "Printed shirt",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam deleniti modi.",
        rating: 4.5,
        color: "red",
        aosDelay: "200"
      },
      {
        index: 3,
        image: image3,
        title: "Wowen shirt",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam deleniti modi.",
        rating: 4.7,
        color: "brown",
        aosDelay: "400"
      }
]

const TopProducts = () => {
  return (
    <div>
        <div className='container'>
            {/*Header section*/}
                <div className='text-left mb-24'>
                <p className='text-sm text-primary'>
                    Top Rated products for you</p>
                <h1 data-aos="fade-up"
                className='text-3xl font-bold'>Best Products</h1>
                <p data-aos="fade-up"
                className='text-xs text-gray-400 '>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam deleniti modi.
                </p>
            </div>
            {/*Body section*/}
            <div className='grid grid-cols-1 sm:grid-cols-2 
                                md:grid-cols-3 lg:grid-cols-3 
                                place-items-center gap-20 md:gap-5'>
                {
                    ProductsData.map((data)=> (
                        <div data-aos="zoom-in"
                        className='rounded-2xl
                        bg-white dark:bg-gray-800
                        hover:bg-black/80 dark:hover:bg-primary
                        hover:text-white relative shadow-xl
                        duration-300 group max-w-[300px]
                        '
                        >
                            {/*Image Section*/}
                            <div className='h-[100px]'>
                                <img className='max-w-[140px] block
                                                mx-auto transform -translate-y-20
                                                group-hover:scale-105 duration-300
                                                drop-shadow-md'
                                src={data.image} alt="" />
                            </div>
                            {/*Details Section*/}
                            <div className='p-4 text-center'>
                                {/*Star Rating*/}
                                <div className='w-full flex
                                                items-center justify-center gap-1'>
                                    <FaStar className='text-yellow-500'/>
                                    <FaStar className='text-yellow-500'/>
                                    <FaStar className='text-yellow-500'/>
                                    <FaStar className='text-yellow-500'/>
                                </div>
                                <h1 className='text-xl font-bold'
                                >{data.title}</h1>
                                <p className='text-gray-500 
                                              group-hover:text-white
                                              duration-300 text-sm line-clamp-2'
                                >{data.description}</p>
                                <button className='bg-primary
                                                hover:scale-105 duration-300 text-white
                                                px-4 py-1 rounded-full mt-4
                                                group-hover:bg-white group-hover:text-primary'
                                   // onClick={HandleOrderPopup}
                                >Order Now</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default TopProducts