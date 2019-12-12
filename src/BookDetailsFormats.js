import React, {useEffect, useState} from "react"

function BookDetailsFormats({itemsKey, formats, setNewFormats}) {
    
    const formatsToArray = (formats) => {
        const arr = []
        for (const format in formats) {
            if (formats.hasOwnProperty(format)) {
                arr.push({name: format, url:formats[format]})
            }
        }
        return arr
    }
    
    const [localFormats, setLocalFormats] = useState(formatsToArray(formats))

    useEffect(() => {
        setLocalFormats(formatsToArray(formats))
    }, [formats])

    const formatsFromArray = (formats) => {
        let formatsObj = {}
        formats.forEach(({name, url}) => formatsObj[name] = url)
        return formatsObj
    }
    const handleFormatChange = (idx, key, value) => {      
          setLocalFormats(prev => {
            let formatsCopyArray = [...prev]
            formatsCopyArray[idx][key] = value
            setNewFormats(itemsKey, formatsFromArray(formatsCopyArray))
            return formatsCopyArray
        })
    }

    const addMore = (e) => {
        e.preventDefault()
        setLocalFormats(prev => {
            const newFormat = { name:"", url:"" }
            const formatsCopyArray = [...prev, newFormat]
            setNewFormats(itemsKey, formatsFromArray(formatsCopyArray))
            return formatsCopyArray
        })
    }

    const displayFormats = localFormats.map((format, idx) => (
        <li key={idx} className="item item-format">
            <div className="format-element">
                <label 
                    htmlFor={`format-name-${idx}`}
                    className="lbl lbl-format lbl-right"
                >Format name</label>
                <input
                    className="input input-format input-format-name"
                    type="text" 
                    name={`format-name-${idx}`}  
                    value={format.name}
                    onChange={e => handleFormatChange(idx, "name", e.target.value)}
                />
            </div>
            <div className="format-element">
                <label 
                    className="lbl lbl-format lbl-left" 
                    htmlFor={`format-url-${idx}`}>
                    <a target="_blank" className="btn btn-location"href={format.url}>URL</a>
                </label>
                <input
                    className="input input-format input-format-url"
                    type="text" 
                    name={`format-url-${idx}`}  
                    value={format.url} 
                    onChange={e => handleFormatChange(idx, "url", e.target.value)}
                />
            </div>
        </li>
    ))

    return (
        <div className="formats">
            <h3>Formats</h3>
        <ul>{displayFormats}</ul>
        <a  className={`btn btn-formats btn-add`} 
            onClick={addMore} 
            href="#"
        >
            Add format
        </a>
        </div>
    )

}

export default BookDetailsFormats