export default function Button({
    onClick,
    btnText,
    className = '',
    type = 'button',
    disabled = false,
    height = '',
    width = '',
    ...props
}) {
    return (
        <button
            style={{ height, width }}
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...props}
            className={`disabled:cursor-not-allowed hover:scale-105 transition-all ease-in duration-100 flex items-center justify-center overflow-hidden drop-shadow-md text-[#040606] px-5 py-2 text-md font-semibold rounded-full ${className}`}
        >
            {btnText}
        </button>
    );
}
