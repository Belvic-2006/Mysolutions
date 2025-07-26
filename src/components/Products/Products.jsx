import React from 'react'
import image1 from '../../assets/women/women.png'
import image2 from '../../assets/women/women2.jpg'
import image3 from '../../assets/women/women3.jpg'
import image4 from '../../assets/women/women4.jpg'
import {FaStar} from 'react-icons/fa6'

const ProductsData = [
  {
    index: 1,
    image: image1,
    title: "Women Ethnic",
    rating: 5.0,
    color: "white",
    aosDelay: "0"
  },
  {
    index: 2,
    image: image2,
    title: "Women western",
    rating: 4.5,
    color: "red",
    aosDelay: "200"
  },
  {
    index: 3,
    image: image3,
    title: "Googgles",
    rating: 4.7,
    color: "brown",
    aosDelay: "400"
  },
   {
    index: 4,
    image: image4,
    title: "Printed T-shirt",
    rating: 4.4,
    color: "pink",
    aosDelay: "600"
  },
    {
        index: 5,
        image: image2,
        title: "Fashion T-shirt",
        rating: 4.5,
        color: "yellow",
        aosDelay: "800"
    }
]

const Products = () => {
  return (
    <div className='mt-14 mb-12 dark:bg-gray-900 dark:text-white'>
        <div className='container'>
            {/* Header Section*/}
            <div className='text-center mb-10
                            max-w-[600px] mx-auto'>
                <p className='text-sm text-primary'>
                    Top selling products for you</p>
                <h1 data-aos="fade-up"
                className='text-3xl font-bold'>Products</h1>
                <p data-aos="fade-up"
                className='text-xs text-gray-400 '>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam deleniti modi.
                </p>
            </div>
            {/* Body Section */}
            <div>
                <div className='grid grid-cols-1 sm:grid-cols-3 
                                md:grid-cols-4 lg:grid-cols-5 
                                place-items-center gap-5'>
                {/*Card section*/} 
                {
                    ProductsData.map((data) => (
                        <div data-aos="fade-up"
                             data-aos-delay={data.aosDelay}
                        key={data.index} className='space-y-3 '>
                            <img src={data.image} alt=""
                             className='h-[220px] w-[150px]
                                       object-cover rounded-md' />
                            <div>
                                <h3 className='font-semibold' 
                                >{data.title}</h3>
                            </div>           
                            <p className='text-sm text-gray-600'>
                                {data.color} 
                            </p>
                            <div className='flex items-center gap-1'>
                                <FaStar className='text-yellow-400'/>
                                <span>{data.rating}</span>
                            </div>
                        </div>
                        
                    ))
                }                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Products