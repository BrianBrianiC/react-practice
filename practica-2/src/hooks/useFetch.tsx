import { useEffect, useState } from 'react'

const useFetch = <T,>(url:string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string| null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const {signal} = controller;

    const fetchData = async() =>{

      try{
        const response = await fetch(url,{signal});
        if(!response.ok)
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        const json: T = await response.json();
        setData(json);
        setError(null);
      }
      catch(err){
        if (err instanceof Error) {
          if(err.name === 'AbortError'){
            console.log('Peticion cancelada correctamente'
            )
          }else{
            setError(err.message)
          }
        }
      }
      finally{
        if(!signal.aborted) {
          setLoading(false);
        }
      }

    }
    fetchData();

    return () => {
      controller.abort();
    }
  },[url]) 

  return {data, loading, error}
}

export default useFetch