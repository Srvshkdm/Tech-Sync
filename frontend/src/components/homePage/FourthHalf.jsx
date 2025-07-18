import {
    AYUSHIMAGE1,
    AYUSHIMAGE2,
    AYUSHIMAGE3,
    AYUSHIMAGE4,
    AYUSHIMAGE5,
} from '../../assets/images';
import { motion } from 'framer-motion';
import { useVariantContext } from '../../contexts';

export default function FourthHalf() {
    // variants
    const { iconVariants, textVariants } = useVariantContext();

    // logos array
    const logos = [
        AYUSHIMAGE1,
        AYUSHIMAGE2,
        AYUSHIMAGE3,
        AYUSHIMAGE4,
        AYUSHIMAGE5,
    ];

    const logoElements = logos.map((logo, index) => (
        <motion.div
            key={index}
            className="drop-shadow-md size-[80px] sm:size-[100px] md:size-[120px] lg:size-[130px]"
            custom={index}
            variants={iconVariants}
        >
            <img
                src={logo}
                alt="ayush and india logos"
                className="object-contain size-full"
            />
        </motion.div>
    ));

    // HTML
    return (
        <div className="px-[6%]">
            {/* logo section */}
            <motion.div
                className="flex items-center justify-evenly flex-wrap gap-4 mb-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {logoElements}
            </motion.div>

            {/* text section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={textVariants}
            >
                <h2 className="text-3xl font-bold mb-4">
                    The Core Principles of AYUSH: Foundations of Holistic
                    Wellness
                </h2>
                <p className="text-lg leading-8 text-justify">
                    The AYUSH system, encompassing Ayurveda, Yoga, Naturopathy,
                    Unani, Siddha, and Homeopathy, is built on timeless
                    principles that promote balance, health, and harmony in
                    mind, body, and spirit. Each discipline offers unique
                    perspectives and practices, rooted in ancient wisdom, to
                    address modern health challenges naturally and effectively.
                    Together, these principles form the cornerstone of a
                    holistic approach to wellness, emphasizing prevention,
                    personalized care, and sustainable living.Discover the five
                    foundational principles that guide the AYUSH philosophy and
                    unlock the potential for transformative well-being.
                </p>
            </motion.div>
        </div>
    );
}
