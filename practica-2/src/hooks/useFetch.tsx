import { useState, useEffect } from 'react';

// 1. Usamos Genéricos <T> para que sea reutilizable
export const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 2. Instanciamos el AbortController
    const controller = new AbortController();
    // 3. Extraemos la señal (es como el "freno de mano")
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      
      try {
        // 4. Pasamos la señal al fetch. Si controller.abort() se llama,
        // este fetch fallará intencionalmente.
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const json: T = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        // 5. IMPORTANTE: Diferenciar un error real de una cancelación
        if (err instanceof Error) {
            if (err.name === 'AbortError') {
                console.log('Petición cancelada correctamente');
                // No actualizamos estado aquí (evita memory leaks)
            } else {
                setError(err.message);
            }
        }
      } finally {
        // 6. Solo quitamos loading si NO fue abortado
        if (!signal.aborted) {
            setLoading(false);
        }
      }
    };

    fetchData();

    // 7. CLEANUP FUNCTION (Lo que evalúan en la entrevista)
    // Se ejecuta si el componente muere o si la URL cambia antes de terminar
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};