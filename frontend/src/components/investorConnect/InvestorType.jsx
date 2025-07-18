export default function InvestorType() {
    return (
        <>
            <div className="bg-[#07949B]  min-h-[100vh] max-h-screen flex flex-col  items-center ">
                <div className="fixed">
                    <div className="text-center   mt-24">
                        <h1 className="md:text-4xl text-2xl font-extrabold text-white mb-4">
                            Access to AYUSH Startups
                        </h1>
                        <h2 className="md:text-xl font-medium text-white">
                            Thank you for Becoming an Ayush Investor
                        </h2>
                    </div>

                    <div className="flex justify-center  items-center mt-14 m-5 space-x-10">
                        <button className="bg-blue-500 text-white font-semibold py-4 px-8 max-w-44 rounded-lg shadow-lg transform hover:scale-105 hover:bg-green-600 transition-all">
                            Register as an Individual
                        </button>
                        <button className="bg-blue-500 text-white font-semibold py-4 px-8 max-w-44 rounded-lg shadow-lg transform hover:scale-105 hover:bg-green-600 transition-all">
                            Register as an Institutional
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
