import { useState, useEffect } from "react";

type TypeImageURL = {src: string, local?: string};

type TypeImageBuffer = {
    insertionIndex: number,
    URLs: Array<TypeImageURL>
}

declare global {
    interface Window { imageBuffer?: TypeImageBuffer }
}

const MAX_BUFFER_SIZE: number = 40;

export function useImgLoad(imgSrc?: string): [url: string | null, isLoading: boolean] {
    const initialImageBuffer: TypeImageBuffer = {
        insertionIndex: 0, URLs: new Array<TypeImageURL>()
    }
    if (!window?.imageBuffer) window.imageBuffer = initialImageBuffer;

    const { imageBuffer } = window;
    const { URLs } = imageBuffer;
    const found = imgSrc && URLs.find((el) => el.src === imgSrc);

    const [url, setUrl] = useState<string | null>(found?.local ?? null);
    const [isLoading, setIsLoading] = useState(found?.local ? false : true);

    useEffect(() => {
        if (!imgSrc || !!found) 
            return;

        let imageURL: TypeImageURL;
        if (URLs.length === MAX_BUFFER_SIZE) {
            let index = imageBuffer.insertionIndex;
            imageURL = URLs[index++];
            imageURL.src = imgSrc;
            URL.revokeObjectURL(imageURL.local)
            delete imageURL.local;
            imageBuffer.insertionIndex = (
                index === MAX_BUFFER_SIZE ? 0 : index);
        } else {
            imageURL = {src: imgSrc};
            URLs.push(imageURL)
        }
        fetch(imgSrc)
            .then(response => response.blob())
            .then((image) => {
                imageURL.local = URL.createObjectURL(image);
                setUrl(imageURL.local);
            })
            .finally(() => { setIsLoading(false) })
    }, [imgSrc])



    return [url, isLoading];
}