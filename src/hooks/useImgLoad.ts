import { useState, useEffect } from "react";

export function useImgLoad(imgUrl?: string): [url: string | null, isLoading: boolean] {
    const [url, setUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!imgUrl) 
            return;

        fetch(imgUrl)
        .then(response => response.blob())
        .then((image) => {
            setUrl(URL.createObjectURL(image))
        })
        .catch(() => {})
        .finally( () => { setIsLoading(false) } )
    }, [imgUrl])

    return [url, isLoading];
}