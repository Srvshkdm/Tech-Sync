import { motion } from 'framer-motion';
import { useVariantContext } from '../contexts';

export default function PrivacyPolicyPage() {
    // variants
    const { textVariants } = useVariantContext();

    return (
        <div className="w-full px-[5%] py-8">
            <motion.h1
                className="w-full font-bold text-3xl text-center mb-6"
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                Privacy Policy
            </motion.h1>
            <motion.section
                className="text-md"
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <p>
                    At <strong>AYUSH Portal</strong>, we value your privacy and
                    are committed to protecting your personal data. This Privacy
                    Policy outlines the types of data we collect, how we use
                    them, and the measures we take to ensure your information is
                    secure.
                </p>
            </motion.section>
            <hr className="my-6" />
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="w-full text-center my-6 text-2xl font-semibold">
                    Information We Collect
                </h2>
                <ul className="list-disc ml-6">
                    <motion.li
                        className="mb-4"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Personal Information:</strong> This includes
                        your name, email address, and any other details you
                        provide when signing up or interacting with our portal.
                    </motion.li>
                    <motion.li
                        className="mb-4"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Usage Data:</strong> We may collect information
                        about how you interact with our platform, including
                        pages visited, time spent, and technical data like IP
                        addresses and browser details.
                    </motion.li>
                    <motion.li
                        className="mb-4"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Cookies:</strong> Our platform uses cookies to
                        improve your experience. These files help us understand
                        user behavior and preferences.
                    </motion.li>
                </ul>
            </motion.section>
            <hr className="my-6" />
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="w-full text-center my-6 text-2xl font-semibold">
                    How We Use Your Information
                </h2>
                <ul className="list-disc ml-6">
                    <motion.li
                        className="mb-4"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Service Improvement:</strong> To enhance your
                        experience by personalizing content and optimizing
                        portal functionality.
                    </motion.li>
                    <motion.li
                        className="mb-4"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Communication:</strong> To send updates, respond
                        to your inquiries, and share relevant information
                        regarding our services.
                    </motion.li>
                    <motion.li
                        className="mb-4"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Data Analysis:</strong> To understand user
                        behavior and improve our platform through insights and
                        analytics.
                    </motion.li>
                </ul>
            </motion.section>
            <hr className="my-6" />
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="w-full text-center my-6 text-2xl font-semibold">
                    Data Security
                </h2>
                <p className="text-md">
                    We implement industry-standard measures to safeguard your
                    personal data from unauthorized access, disclosure, or
                    misuse. While no system is completely secure, we strive to
                    use commercially acceptable means to protect your
                    information.
                </p>
            </motion.section>
            <hr className="my-6" />
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="w-full text-center my-6 text-2xl font-semibold">
                    Your Rights
                </h2>
                <ul className="list-disc ml-6">
                    <motion.li
                        className="mb-4"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Access:</strong> You can request access to the
                        personal data we hold about you at any time.
                    </motion.li>
                    <motion.li
                        className="mb-4"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Correction:</strong> If you believe your
                        information is inaccurate or incomplete, you can request
                        a correction.
                    </motion.li>
                    <motion.li
                        className="mb-4"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <strong>Deletion:</strong> You have the right to request
                        that we delete your personal data, subject to certain
                        conditions.
                    </motion.li>
                </ul>
            </motion.section>
            <hr className="my-6" />
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
                    If you have any questions or concerns about our Privacy
                    Policy, please{' '}
                    <a
                        href="/contact-us"
                        className="text-[#f68533] font-medium hover:underline"
                    >
                        contact us
                    </a>
                    . We are here to address your queries and ensure your
                    experience with <strong>AYUSH Portal</strong> is safe and
                    secure.
                </p>
            </motion.section>
        </div>
    );
}
