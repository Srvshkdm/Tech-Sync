export default function StartupCard({
    image,
    title,
    description,
    showButton = false,
}) {
    return (
        <div
            className="bg-white border border-gray-300 rounded-lg shadow-md p-6 transform transition duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:scale-105 hover:cursor-pointer"
            style={{
                perspective: '1000px',
            }}
        >
            <div className="">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                    style={{
                        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                    }}
                />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-600 mt-2">{description}</p>
            {showButton && (
                <button className="mt-4 bg-orange-500 text-white py-1 px-3 rounded hover:bg-orange-300 flex items-center justify-center mx-auto">
                    View Details
                </button>
            )}
        </div>
    );
}
