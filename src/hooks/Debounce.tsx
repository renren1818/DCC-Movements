import { useEffect, useRef, useState } from "react";

function useDebounce(value: unknown, delay = 500) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setDebounced(value);
        }, delay);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [value, delay]);

    return debounced;
}

export default useDebounce;
