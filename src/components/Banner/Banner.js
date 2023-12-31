import { Box } from '@mui/material';

import React from 'react';
import GradientTextAnimation from '../Animetion/Animetion';
import ScrollBackgroundAnimation from '../scrollDown/ScrollDown';
import NoSsr from '../NoSsrc/NoSsr';

const Banner = () => {

    return (
        <div className='  '>
            <div className="hero min-h-screen backdrop-blur-xl  bg-fixed  py-3 bg-black " >
                <div className="container mx-auto px-2 backdrop-blur-xl ">
                    <div className="text-white w-full flex flex-col-reverse md:flex-row justify-between items-center gap-10 ">
                        <Box  >
                            <GradientTextAnimation />
                        </Box>
                        <Box className="  w-full flex md:w-3/5 flex-col justify-end md:justify-end items-center  pt-5 text-center ">
                            <Box className=" border-4 py-10 border-white w-full flex justify-center items-center  z-10 relative rounded-full overflow-hidden  bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500">
                                <NoSsr>
                                    <ScrollBackgroundAnimation></ScrollBackgroundAnimation>
                                </NoSsr>
                            </Box>
                            <p className='text-sm mt-4'> &quot;Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.&quot;- Patrick mckenzie
                            </p>

                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;