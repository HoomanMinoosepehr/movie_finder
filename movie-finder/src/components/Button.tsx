
interface ButtonProps {
    title: string;
    style?: string;
    onClick?: () => void;
}

export default function Button({ title, onClick, style }: ButtonProps) {
    const defaultStyle = "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    return (
        <button
            className={style || defaultStyle}
            onClick={onClick}
        >
            {title}
        </button>
    );
}