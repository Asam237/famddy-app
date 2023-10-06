export const cleanText = (text: any, size: number) => {
    return text.slice(0, size) + (text.length > size ? ' ...' : '')
}
