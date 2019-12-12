import React, {useState, useEffect, useRef} from "react"

function BookDetailsArray({itemsName, itemsKey, inputArray, setNewArray}) {
    const lastField = useRef(null)
    const [localArrayState, setlocalArrayState] = useState(inputArray)
    const [isNewFieldAdded, setIsNewFieldAdded] = useState(false)

    useEffect(()=> {
        setlocalArrayState(inputArray)
    },[inputArray])

    useEffect(()=> {
        setNewArray(itemsKey, localArrayState)
        if (isNewFieldAdded) {
            lastField.current.focus()
            setIsNewFieldAdded(false)
        }
    },[localArrayState])

    const handleLanguageChange = (newLanguage, idx) => {
        setlocalArrayState(prev => {
            const arrayCopy = [...prev]
            arrayCopy[idx] = newLanguage
            return arrayCopy
        })
    }

    const handleEmpty = value => {
        if (value === "") {
            setlocalArrayState(prev => [...prev].filter(language => language !== ""))
        }
    }

    const addMore = (fromLink) => { 
        if (fromLink) {
            fromLink.preventDefault()
        }
        setIsNewFieldAdded(true)
        setlocalArrayState([
            ...localArrayState.filter(language => language !== ""), 
            ""
        ])
    }

    const lastInputIndex =  localArrayState.length-1
    const displayLoacalArray = localArrayState.map((item, idx) => {
            return (
            <li key={idx}>
                <input
                    className={`input-${itemsKey}`}
                    ref={idx === lastInputIndex ? lastField: null}
                    onBlur={({target}) => handleEmpty(target.value)}
                    onKeyPress={({key}) => key === "Enter" && addMore()}
                    type="text"
                    name={`${itemsKey}-${idx}`}
                    value={item}
                    onChange={e => handleLanguageChange(e.target.value, idx)}
                />
            </li>
        )
    })

    return (
            <div className={`${itemsKey}`}>
                <div className={`${itemsKey}-lbl`}>
                <h3>{itemsName}</h3>
                </div>
                <ul>{displayLoacalArray}</ul>
                <a  className={`btn btn-${itemsKey} btn-add`} 
                    onClick={addMore} 
                    href="#"
                >
                    Add more
                </a>
            </div>
    )
}
export default BookDetailsArray