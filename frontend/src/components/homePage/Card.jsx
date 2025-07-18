import { Button } from '..';
import { useNavigate } from 'react-router-dom';
import { icons } from '../../assets/icons';
import { motion } from 'framer-motion';

export default function Card({ card }) {
    const navigate = useNavigate();
    return (
        <motion.div
            whileHover={{
                y: -5,
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.05)', // increase shadow on hover
            }}
            transition={{
                type: 'tween',
            }}
            className={`relative text-[#040606] ${card.className} rounded-3xl p-8 m-2 drop-shadow-md max-w-[400px] min-w-[300px]`}
        >
            <div className="bg-[#f9f9f9] drop-shadow-md p-2 size-fit overflow-hidden rounded-full">
                <img
                    src={card.icon}
                    alt={`${card.heading} card icon`}
                    className="size-[50px] object-cover"
                />
            </div>
            <h4 className="text-3xl font-semibold my-4 line-clamp-1">
                {card.heading}
            </h4>
            <p className="text-lg line-clamp-3 mb-7">{card.description}</p>
            <Button
                btnText={
                    <div className="flex items-center justify-center gap-3">
                        <p>Read more</p>
                        <div className="size-[20px] fill-[#040606]">
                            {icons.arrow}
                        </div>
                    </div>
                }
                className="bg-gradient-to-r from-[#f9f9f9] to-[#e1e1e1] hover:to-[#cbcbcb]"
                onClick={() => navigate(card.path)}
            />
        </motion.div>
    );
}
