
export function getTime(): string {
    const date = new Date(Date.now())
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; 
}