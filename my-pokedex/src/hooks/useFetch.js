import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(!url) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if(!response.ok) {
                    throw new Error('Could not fetch data');
                }
                const data = await response.json();
                setData(data);
                setError(false);
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { data, loading, error }
}