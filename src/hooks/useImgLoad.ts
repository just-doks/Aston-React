import { useState, useEffect } from "react";

// type TypeImageURL = {src: string, local: Promise<string>};
type TypeImageURL = {src: string, local?: string};

type TypeImageBuffer = {
    insertionIndex: number,
    URLs: Array<TypeImageURL>
}

declare global {
    interface Window { imageBuffer?: TypeImageBuffer }
}

const MAX_BUFFER_SIZE: number = 60;

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
        console.log("useImg: " + imgSrc)
        if (!imgSrc || !!found) 
            return;
        console.log("fetching")

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

        // second version    
        // if (!imgSrc) 
        //     return;
        // if (!window?.imageBuffer) window.imageBuffer = initialImageBuffer;
        // const { imageBuffer } = window;
        // const { URLs } = imageBuffer;
        // const found = URLs.find((el) => el.src === imgSrc);
        // if (found) {
        //     console.log("found")
        //     found.local
        //     .then(value => setUrl(value))
        //     .finally(() => { setIsLoading(false)})
        // } else {
        //     const localURL = new Promise(fetchImageExecutor(imgSrc));
        //     if (URLs.length === MAX_BUFFER_SIZE) {
        //         let index = imageBuffer.insertionIndex;
        //         const imageURL = URLs[index++];
        //         imageURL.src = imgSrc;
        //         imageURL.local.then(value => URL.revokeObjectURL(value));
        //         imageURL.local = localURL;
        //         imageBuffer.insertionIndex = (
        //             index === MAX_BUFFER_SIZE ? 0 : index);
        //     } else {
        //         URLs.push({src: imgSrc, local: localURL})
        //     }
        //     localURL
        //     .then(value => setUrl(value))
        //     .finally(() => { setIsLoading(false) })
        // }
        // function fetchImageExecutor(imgSrc: string) {
        //     return function(
        //         resolve: (value: string) => void, 
        //         reject: (reason?: any) => void
        //     ) {
        //         fetch(imgSrc)
        //         .then(response => response.blob())
        //         .then((image) => {
        //             resolve(URL.createObjectURL(image))
        //         })
        //     }
        // }

        // first version
        // fetch(imgUrl)
        // .then(response => response.blob())
        // .then((image) => {
        //     setUrl(URL.createObjectURL(image));
        //     return image.text();
        // })
        // .then(text => {
        //     fetch(imgUrl)
        //     .then(res => res.blob())
        //     .then(blob => blob.text())
        //     .then(imgtext => {
        //         console.log("are equal: " + text.includes(imgtext))
        //     })
        // })
        // .catch(() => {})
        // .finally( () => { setIsLoading(false) } )
    }, [imgSrc])



    return [url, isLoading];
}