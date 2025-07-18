import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { icons } from '../assets/icons';
import { useVariantContext } from '../contexts';

export default function FAQpage() {
    const { textVariants, iconVariants } = useVariantContext();
    const [expanded, setExpanded] = useState(null);

    const toggleExpand = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    // fetch faqs
    const faqs = [
        {
            question: 'What is AYUSH?',
            answer: 'AYUSH stands for Ayurveda, Yoga and Naturopathy, Unani, Siddha, and Homeopathy—traditional systems of medicine practiced in India.',
        },
        {
            question: 'What does your AYUSH startup focus on?',
            answer: 'We aim to [insert your startup’s mission, e.g., promote traditional medicine, provide holistic health solutions, support AYUSH practitioners, etc.].',
        },
        {
            question: 'Why is a dedicated portal for AYUSH startups needed?',
            answer: 'The AYUSH sector has unique challenges and opportunities. Our platform provides tailored resources, mentorship, and networking opportunities specifically for AYUSH-focused businesses.',
        },
        {
            question: 'Is this portal endorsed by the Ministry of AYUSH?',
            answer: 'Yes, our portal aligns with the Ministry of AYUSH’s vision to promote traditional medicine and wellness through innovation and entrepreneurship.',
        },
        {
            question: 'Does the portal itself provide funding?',
            answer: 'No, we act as a facilitator by connecting startups with funding opportunities from third-party organizations.',
        },
    ];

    return (
        <div className="h-full w-full py-8 px-[5%] text-[#040606]">
            <motion.h1
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl font-bold text-center mb-10"
            >
                Frequently Asked Questions
            </motion.h1>

            <div className="flex flex-col gap-4">
                {faqs.map((faq, index) => (
                    <motion.div
                        variants={iconVariants}
                        initial="hidden"
                        whileInView="visible"
                        custom={index}
                        viewport={{ once: true, amount: 0.2 }}
                        key={index}
                        className="bg-[#fffcf9] p-6 rounded-lg shadow-md cursor-pointer"
                        onClick={() => toggleExpand(index)}
                    >
                        <div className="flex items-center justify-between gap-2">
                            <h2 className="text-xl font-semibold line-clamp-2">
                                {faq.question}
                            </h2>
                            <motion.div
                                animate={{
                                    rotate: expanded === index ? 45 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-center"
                            >
                                <div className="bg-white p-2 rounded-full w-fit drop-shadow-md hover:brightness-90">
                                    <div className="size-[16px]">
                                        {icons.plus}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <AnimatePresence initial={false}>
                            {expanded === index && (
                                <motion.div
                                    className="overflow-hidden"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{
                                        opacity: { duration: 0.2 },
                                        height: { duration: 0.2 },
                                    }}
                                >
                                    <p className="mt-2 text-gray-600">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
