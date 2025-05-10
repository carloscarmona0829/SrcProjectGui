import { axiosClient, AxiosResponse } from '../adapters';
import { useEffect, useState } from '../adapters/ReactAdapter';

interface UseGetResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const cache: { [key: string]: any } = {}; // Variable externa para el caché

interface UseGetProps<T> {
  url: string;
  onCompleted?: (data: T) => any;
}

function useGet<T>({ url, onCompleted }: UseGetProps<T>): UseGetResult<T> {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (loading) return;

        setLoading(true);
        setError(null);

        // Verificar si los datos están en caché
        if (cache[url]) {
          setLoading(false);
          return;
        }

        const response: AxiosResponse<T> = await axiosClient.get(url);

        const newData = response.data;
        // Almacenar en caché los datos
        cache[url] = newData;
        onCompleted?.(newData);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url, loading]);

  return {
    data: cache[url] || null,
    loading,
    error
  };
}

export default useGet;
