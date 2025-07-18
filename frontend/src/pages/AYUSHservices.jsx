import {
    AYUSHIMAGE1,
    AYUSHIMAGE2,
    AYUSHIMAGE3,
    AYUSHIMAGE4,
    AYUSHIMAGE5,
} from '../assets/images';
import { useVariantContext } from '../contexts';
import { motion } from 'framer-motion';

export default function AyushServicesPage() {
    const { textVariants, iconVariants } = useVariantContext();

    // Services Data
    const services = [
        {
            title: 'Ayurveda',
            description:
                'Explore the traditional science of Ayurveda with remedies, lifestyle practices, and treatments to achieve holistic well-being.',
            icon: AYUSHIMAGE1,
        },
        {
            title: 'Yoga & Naturopathy',
            description:
                'Learn and practice yoga for mental and physical balance, complemented by natural healing methods for rejuvenation.',
            icon: AYUSHIMAGE2,
        },
        {
            title: 'Unani Medicine',
            description:
                'Discover Unani practices, focusing on natural healing techniques rooted in ancient wisdom for holistic health.',
            icon: AYUSHIMAGE4,
        },
        {
            title: 'Siddha Medicine',
            description:
                'Experience Siddha medicine, one of the oldest medical systems, offering herbal and natural remedies for a balanced lifestyle.',
            icon: AYUSHIMAGE5,
        },
        {
            title: 'Homeopathy',
            description:
                'Access homeopathic resources and treatments for safe and natural healing, focusing on personalized healthcare.',
            icon: AYUSHIMAGE3,
        },
    ];

    const serviceElements = services.map((service, index) => (
        <motion.div
            key={index}
            className="flex flex-col items-center text-center gap-4 p-6 shadow-md border border-gray-200 rounded-lg bg-white"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.img
                src={service.icon}
                alt={`${service.title} icon`}
                className="h-20 w-20 object-contain"
                initial="hidden"
                whileInView="visible"
                variants={iconVariants}
                viewport={{ once: true, amount: 0.2 }}
            />
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="text-md text-gray-600">{service.description}</p>
        </motion.div>
    ));

    return (
        <div className="w-full px-[5%] py-8">
            <motion.h1
                className="w-full font-bold text-3xl text-center mb-6"
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                AYUSH Services
            </motion.h1>
            <motion.p
                className="text-md text-center text-gray-600 mb-6"
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                Discover a wide range of healthcare and wellness services
                offered by AYUSH, empowering individuals through traditional and
                holistic health practices.
            </motion.p>
            <hr className="my-6" />
            <motion.section
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                {serviceElements}
            </motion.section>
            <hr className="m-8" />
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="w-full text-center my-6 text-2xl font-semibold">
                    Get Started with AYUSH Services
                </h2>
                <p className="text-md text-center text-gray-600 mb-4">
                    Whether you're new to AYUSH or a healthcare professional,
                    our services are designed to help you explore holistic
                    health practices and improve your well-being.
                </p>
                <div className="flex justify-center">
                    <motion.button
                        className="px-6 py-3 bg-orange-400 text-white font-medium rounded-lg shadow hover:bg-orange-500 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore Services
                    </motion.button>
                </div>
            </motion.section>
        </div>
    );
}
