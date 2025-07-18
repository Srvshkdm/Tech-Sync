import { Statistics } from '..';
import { useVariantContext } from '../../contexts';
import { motion } from 'framer-motion';
import { landingPageGif } from '../../assets/images';

export default function FirstHalf() {
    const { textVariants } = useVariantContext();

    return (
        <div className="h-[calc(100vh-110px)] w-screen relative overflow-hidden">
            {/* Background Image */}
            <div
                className="h-[calc(100vh-110px)] w-full bg-cover bg-center bg-no-repeat"
                style={{
                    // backgroundImage: `url(${RajBhavan})`,
                    opacity: 0.84,
                }}
            />

            {/* Overlay Content */}
            <div className="h-full w-full absolute z-1 top-0">
                <div className="h-[calc(100vh-190px)] md:h-[calc(100vh-210px)] flex flex-col md:flex-row justify-center items-center py-6 md:py-14 px-4 sm:px-8">
                    {/* Heading and Text Section */}
                    <div className="flex flex-col items-center lg:items-start justify-center gap-4 mb-24 md:gap-6">
                        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl mb-2 xl:text-5xl font-extrabold bg-clip-text bg-gradient-to-r text-orange-400 typing-effect text-center lg:text-left">
                            <span className="text-center block typing-line">
                                AYUSH STARTUP
                            </span>
                            <span className="text-center block typing-line delay-4s">
                                REGISTRATION PORTAL
                            </span>
                        </h1>

                        <p className="text-center px-4 sm:px-8 text-lg md:text-2xl text-[#5a5a5a]">
                            Streamlining AYUSH Startup Registration with
                            Transparency, Support and Growth opportunities.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="w-full max-w-xs mt-4 min-w-[350px] sm:max-w-md md:max-w-lg lg:max-w-2xl flex justify-center items-center">
                        <img
                            className="w-full h-auto object-contain"
                            src={landingPageGif}
                            alt="Example GIF"
                        />
                    </div>
                </div>

                {/* Statistics Section */}
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="drop-shadow-md px-4 sm:px-8"
                >
                    <Statistics />
                </motion.div>
            </div>
        </div>
    );
}
