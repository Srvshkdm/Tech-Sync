import { Button } from '..';

export default function Popup({
    header = '',
    description = '',
    btnText = 'Close',
    className = '',
    onClick,
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55">
            <div className="drop-shadow-md bg-[#f9f9f9] text-center rounded-lg flex flex-col gap-4 items-center w-[90%] max-w-md p-6">
                {header && (
                    <h2 className="text-xl font-bold text-[#040606]">
                        {header}
                    </h2>
                )}
                {description && (
                    <div className="text-gray-600 text-[15px]">
                        {description}
                    </div>
                )}
                <Button
                    className={className}
                    btnText={btnText}
                    onClick={onClick}
                />
            </div>
        </div>
    );
}
