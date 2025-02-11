import { useState, useEffect } from "react";

export function useImgLoad(imgUrl: string): [url: string, isLoaded: boolean] {
    const [url, setUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(imgUrl)
        .then(response => response.blob())
        .then((image) => {
            setUrl(URL.createObjectURL(image))
        })
        .finally( () => { setIsLoading(false) } )
    }, [])
    return [url, isLoading];
}