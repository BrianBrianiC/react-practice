
type Props = {valor: 'X' | 'O' | null, onClick: () => void};


const Celda = ({valor, onClick}: Props) => {
    return (
        <button
        onClick={onClick}
        className="h-24 w-24 border-2 border-gray-400 text-4xl font-bold flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
            <span className={valor === 'X' ? 'text-blue-500' : 'text-red-500'}>
                {valor}
            </span>
        </button>
    )
}

export default Celda