
import { useEffect, useRef } from "react";

export function useFuncOnUpdate<T>(func: () => void) {
    const ref = useRef<T>(null!);
    useEffect(() => {
        if (ref && ref.current) {
            window.addEventListener('beforeunload', func);
        }
        return () => {
            window.removeEventListener('beforeunload', func);
        }
    }, [ref])

    useEffect(() => {
        return func;
    }, [])

    return ref;
}