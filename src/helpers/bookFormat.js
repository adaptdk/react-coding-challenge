export function bookFormatToSubmit(book) {
    const newFormat = {}
    book.formats.forEach((field) => {
        newFormat[field.type] = field.url
    })
    return {...book, formats: newFormat}
}

export function bookFormatToForm(book) {
    const newFormats = Object.entries(book.formats).map(([type, url]) => {return {type, url}})
    return {...book, formats: newFormats}
}