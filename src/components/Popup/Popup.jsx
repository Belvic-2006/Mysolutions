import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const Popup = ({orderPopup, setOrderPopup}) => {
  return (
    <>
        {
            orderPopup &&  (
                <div className="popup">
                    <div className='h-screen w-screen fixed top-0
                                    left-0 bg-black/50 z-50 backdrop-blur-sm'>
                    <div className='flex justify-center mt-[220px] '>
                    <div className='p-5 shadow-md
                                    bg-white dark:bg-gray-900 rounded-md
                                    duration-200 min-w-[300px] max-w-[310px] flex flex-col'>
                        {/* Header section */}
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1>Oder Now</h1>
                            </div>
                            <div>
                                <IoCloseOutline className='text-2xl cursor-pointer'
                                 onClick={() => setOrderPopup(false)}/>
                            </div>
                        </div>
                        {/* Form */}
                        <div className='mt-4'>
                            <input type="text" placeholder='Name'
                            className='w-full rounded-full border
                                       border-gray-300 dark:border-gray-500
                                       dark:bg-gray-800 px-2 py-1 mb-4 hover:border-primary 
                                       dark:hover:border-primary duration-300'/>
                            <input type="email" placeholder='Email'
                            className='w-full rounded-full border
                                       border-gray-300 dark:border-gray-500
                                       dark:bg-gray-800 px-2 py-1 mb-4
                                       hover:border-primary dark:hover:border-primary duration-300'/>
                            <input type="text" placeholder='Address'
                            className='w-full rounded-full border
                                       border-gray-300 dark:border-gray-500
                                       dark:bg-gray-800 px-2 py-1 mb-4
                                       hover:border-primary dark:hover:border-primary duration-300'/>  
                            <div className='flex justify-center'>
                            <button className='bg-gradient-to-r from-primary to-secondary
                                               hover:scale-105 duration-200 text-white py-1 px-4
                                               rounded-full'
                            >
                                Order Now
                            </button>
                        </div>                               
                        </div>
                        
                    </div>
                    </div>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default Popup