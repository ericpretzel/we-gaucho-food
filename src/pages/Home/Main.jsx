import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const Main = () => {
    return (
        <div id='main'>
            <img className='w-full h-screen object-cover object-left scale-x-[-1]' src="https://www.geog.ucsb.edu/sites/default/files/styles/featured/public/2021-01/storke-sunrise-01.jpg?h=d49448bb&itok=w3SkNoR9" alt="/" />
            <div className='w-full h-screen absolute top-0 left-0 bg-white/50'>
                <div className='max-w-[700px] m-auto h-full w-full flex flex-col justify-center lg:items-start items-center'>
                    <h1 className='sm:text-5xl text-4xl font-bold text-gray-800'>We Gaucho Food</h1>
                    <h2 className='flex sm:text-3xl text-2xl pt-4 text-gray-800'>
                        
                        UCSB <TypeAnimation
                        sequence={[
                            'Carrillo',
                            1000, 
                            'De La Guerra',
                            1000,
                            'Portola',
                            1000
                        ]}
                        wrapper='div'
                        cursor={true}
                        style={{ fontSize: '1em', paddingLeft: '5px'}}
                        repeat={Infinity}
                        /> Review
                        
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Main