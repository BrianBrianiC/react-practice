import { useState } from 'react'
import Celda from './Celda';

type ValorCelda = 'X' | 'O' | null;
const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
const TicTacToe = () => {
    const [tabla , setTabla] = useState<ValorCelda[]>(Array(9).fill(null));
    const [turno, setTurno] = useState<'X' | 'O'>('X')  ;

    const checkWinner = () =>{
        for (const line of lines) {
            const [a, b, c] = line;
            if (tabla[a] && tabla[a] === tabla[b] && tabla[a] === tabla[c]) {
                return tabla[a];
            }
        }
    }
    const winner = checkWinner();

    const handlerClick = (index: number) => {
        if (tabla[index] || winner) return;
        const nuevaTabla = [...tabla];
        nuevaTabla[index] = turno;
        setTabla(nuevaTabla);
        setTurno(turno === 'X' ? 'O' : 'X');
        
    }
    const resetearTablero = () =>{
        setTabla(Array(9).fill(null));
        setTurno('X')
    }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-sans p-4">
        <h1>TIC TAC TOE</h1>
        <section className="grid grid-cols-3 gap-1 bg-gray-300 border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg">
            {tabla.map((value, index) => (
                <Celda 
                    key={index}
                    valor={value} 
                    onClick={() => handlerClick(index)}
                />))}
        </section>
        <button onClick={() => resetearTablero()}>Restart</button>
        {winner && (
            <div className="mt-4 text-xl font-semibold">
                ¡Ganador: {winner}! 
            </div>
        )}
        {!winner && tabla.every(a => a!== null) &&
            ( 
            <div className="mt-4 text-xl font-semibold">
                ¡EMPATE! 
            </div>
            )
        }
    </div>
  )
}

export default TicTacToe    



