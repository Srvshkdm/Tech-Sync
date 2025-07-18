import { FirstHalf, SecondHalf, ThirdHalf, FourthHalf } from '../components';

export default function HomePage() {
    return (
        <div className="h-full w-[100vw] overflow-hidden flex flex-col gap-28 pb-28 bg-[#f9f9f9]">
            <FirstHalf />
            <SecondHalf />
            <ThirdHalf />
            <FourthHalf />
        </div>
    );
}
