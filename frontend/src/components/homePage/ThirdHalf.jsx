import { Card } from '..';
import { CARDICON1, CARDICON2, CARDICON3 } from '../../assets/images';
import { motion } from 'framer-motion';
import { useVariantContext } from '../../contexts';

export default function ThirdHalf() {
    // variants
    const { iconVariants, textVariants } = useVariantContext();

    // cards
    const cards = [
        {
            icon: CARDICON1,
            heading: 'Funding & Support',
            path: 'readmore1',
            description:
                'Unlock a range of funding and investment options, to fuel the development and scaling of your AYUSH innovations.',
            className: 'bg-gradient-to-r from-[#cdffd8] to-[#94b9ff]',
        },
        {
            icon: CARDICON2,
            heading: 'Supportive Network',
            path: 'readmore2',
            description:
                'join a thriving community of entrepreneurs, fostering valuable partnerships to accelerate your startup’s success.',
            className: 'bg-gradient-to-r from-[#ffa8a8] to-[#a1a9f3]',
        },
        {
            icon: CARDICON3,
            heading: 'Incubation Centers',
            path: 'readmore3',
            description:
                'Access expert guidance and resources to nurture your AYUSH startup at every stage.',
            className: 'bg-gradient-to-r from-[#fff8b7] to-[#ffa25e]',
        },
    ];
    const cardElements = cards.map((card, index) => (
        <motion.div key={index} custom={index} variants={iconVariants}>
            <Card card={card} />
        </motion.div>
    ));

    // HTML
    return (
        <div className="px-[5%]">
            {/* text section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={textVariants}
            >
                <h2 className="text-center text-3xl font-bold mb-5">
                    Our Key Features and Highlights
                </h2>

                <p className="mx-[5%]  text-lg leading-8 text-center mb-10">
                    Explore the unique features and resources designed to
                    support, fund, and grow your AYUSH startup, empowering you
                    to transform innovative ideas into impactful solutions.
                </p>
            </motion.div>

            {/* cards */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center overflow-x-scroll gap-6"
            >
                {cardElements}
            </motion.div>
        </div>
    );
}
