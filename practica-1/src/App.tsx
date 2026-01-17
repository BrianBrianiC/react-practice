import { useState } from "react";
import Celda from "./components/Celda";


type ValorCelda = 'X' | 'O' | null;

function App() {

  const [tablero, setTablero] = useState<ValorCelda[]>(Array(9).fill(null));
  
  const [esTurnoX, setEsTurnoX] = useState<boolean>(true);

  const ganador = calcularGanador(tablero);
  function calcularGanador(tablero: ValorCelda[]) {
    const lineasGanadoras = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
      [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    for (let i = 0; i < lineasGanadoras.length; i++) {
      const [a, b, c] = lineasGanadoras[i];
      if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
        return tablero[a]; // Retorna 'X' o 'O'
      }
    }
    return null;
  }
  const handleClick = (indice: number) => {
    if (tablero[indice] || ganador) return;

    const nuevoTablero = [...tablero];
    nuevoTablero[indice] = esTurnoX ? 'X' : 'O';

    setTablero(nuevoTablero);
    setEsTurnoX(!esTurnoX);
  };

  const reiniciarJuego = () => {
    setTablero(Array(9).fill(null));
    setEsTurnoX(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-sans">
      <h1 className="text-3xl font-bold mb-5 text-gray-800">Tic Tac Toe</h1>
      
      <div className="mb-4 text-xl font-semibold">
        {ganador 
          ? `¡Ganador: ${ganador}!` 
          : tablero.every((c) => c !== null) 
            ? '¡Empate!' 
            : `Turno de: ${esTurnoX ? 'X' : 'O'}`}
      </div>

      <div className="grid grid-cols-3 gap-1 bg-gray-300 border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg">
        {tablero.map((celda, index) => (
          <Celda 
            key={index} 
            valor={celda} 
            onClick={() => handleClick(index)} 
          />
        ))}
      </div>

      <button 
        onClick={reiniciarJuego}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Reiniciar Juego
      </button>
    </div>
  );
}

export default App;