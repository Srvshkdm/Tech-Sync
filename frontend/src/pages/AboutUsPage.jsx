import { ASHOKAPILLAR, ASHOKACHAKAR, AYUSHLOGO } from '../assets/images';
import { useVariantContext } from '../contexts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AboutUsPage() {
    // variants
    const { textVariants, iconVariants } = useVariantContext();
    // logos
    const logos = [
        { image: AYUSHLOGO, className: '' },
        { image: ASHOKACHAKAR, className: 'slow-spin' },
        { image: ASHOKAPILLAR, className: '' },
    ];
    const logoElements = logos.map((logo, index) => (
        <motion.div
            key={index}
            className={`drop-shadow-md size-[80px] sm:size-[100px] md:size-[120px] lg:size-[130px] ${logo.className}`}
            custom={index}
            variants={iconVariants}
        >
            <img
                src={logo.image}
                alt="ayush and india logos"
                className="object-contain size-full"
            />
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
                About Us
            </motion.h1>
            <motion.p
                className="text-md"
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                Welcome to <strong>AYUSH Portal</strong>, a platform dedicated
                to enhancing the healthcare and wellness experience for
                students, professionals, and the broader community. Our mission
                is to provide a comprehensive space for accessing health
                resources, promoting wellness, and fostering collaboration in
                the field of AYUSH (Ayurveda, Yoga, Unani, Siddha, and
                Homeopathy).
            </motion.p>
            <hr className="my-6" />
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="w-full text-center my-6 text-2xl font-semibold">
                    Our Mission
                </h2>
                <p className="text-md">
                    Our mission is to create a digital space that encourages
                    knowledge sharing, promotes holistic health, and facilitates
                    collaboration within the AYUSH ecosystem. Whether it's
                    through access to trusted resources, promoting wellness
                    practices, or offering support for healthcare professionals,
                    AYUSH Portal aims to empower individuals to lead healthier,
                    balanced lives.
                </p>
            </motion.section>
            <hr className="m-8" />
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="w-full text-center my-6 text-2xl font-semibold">
                    Why We Started?
                </h2>
                <p className="text-md">
                    As health enthusiasts and professionals, we recognized the
                    need for a centralized platform that connects individuals
                    interested in holistic health practices. AYUSH has a rich
                    tradition of promoting natural healing methods, but there
                    hasn't always been a platform to facilitate knowledge
                    exchange and provide resources. That’s why we decided to
                    create AYUSH Portal — to bridge the gap and support people
                    in improving their overall well-being through trusted AYUSH
                    practices.
                </p>
            </motion.section>
            <hr className="m-8" />
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="w-full text-center my-6 text-2xl font-semibold">
                    What We Do
                </h2>
                <ul>
                    <motion.li
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Health Resources:</strong> Providing access to a
                        wealth of information on AYUSH practices including
                        Ayurveda, Yoga, Homeopathy, Siddha, and Unani to guide
                        users toward better health.
                    </motion.li>
                    <motion.li
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Community Engagement:</strong> A platform where
                        healthcare professionals, students, and wellness
                        advocates can connect, share ideas, and collaborate on
                        health initiatives.
                    </motion.li>
                    <motion.li
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Educational Content:</strong> Offering articles,
                        blog posts, and webinars about holistic health and
                        wellness, helping users stay informed and motivated.
                    </motion.li>
                </ul>
            </motion.section>
            <hr className="m-8" />
            <motion.div
                className="flex items-center justify-evenly flex-wrap gap-4 mb-10"
                initial="hidden"
                whileInView="visible"
                variants={iconVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                {logoElements}
            </motion.div>
            <hr className="m-8" />
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="w-full text-center my-6 text-2xl font-semibold">
                    Privacy Policy
                </h2>
                <p className="text-md">
                    Your privacy is important to us. Below is our Privacy Policy
                    outlining how we handle your data:
                </p>
                <ul>
                    <motion.li
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Data Collection:</strong> We collect personal
                        information such as your name, email address, and other
                        details you provide when registering or interacting with
                        the portal.
                    </motion.li>
                    <motion.li
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Data Use:</strong> Your personal data is used
                        solely to provide you with relevant health resources,
                        newsletter subscriptions, and other portal
                        functionalities.
                    </motion.li>
                    <motion.li
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Third-Party Services:</strong> We may use
                        third-party services like Google Analytics to better
                        understand how users engage with our portal and improve
                        our services.
                    </motion.li>
                    <motion.li
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Cookies:</strong> Our website uses cookies to
                        enhance your experience. By using the site, you agree to
                        our use of cookies.
                    </motion.li>
                    <motion.li
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Security:</strong> We take the security of your
                        personal information seriously and employ standard
                        industry practices to protect your data.
                    </motion.li>
                    <motion.li
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Opt-Out:</strong> If you no longer wish to
                        receive communications from us, you can opt out at any
                        time by unsubscribing from our emails.
                    </motion.li>
                </ul>
            </motion.section>
            <hr className="m-8" />
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="w-full text-center my-6 text-2xl font-semibold">
                    Contact Us
                </h2>
                <p className="text-md">
                    If you have any questions, suggestions, or feedback, or if
                    you'd like to support us, feel free to{' '}
                    <Link
                        className="text-[#f68533] font-medium hover:underline"
                        to={'/contact-us'}
                    >
                        Contact Us
                    </Link>
                    . We’d love to hear from you and work together to promote
                    holistic health and wellness!
                </p>
            </motion.section>
        </div>
    );
}
