
interface ButtonProps {
    title: string
    onClick?: () => void;
}

export default function Button({ title, onClick }: ButtonProps) {
    return (
        <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={onClick}
        >
            {title}
        </button>
    );
}