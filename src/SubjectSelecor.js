import React, {useState, useEffect} from "react"
import Books from "./Books"

function SubjectSelecor(props) {
    const [selectedSubject, setSelectedSubject] = useState()
    const [isFirstTime, setFirstTime] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [subjects, setSubjects] = useState([])
    const [err, setErr] = useState(null)
    const SUBJECTS_URL = "http://localhost:3010/subjects"

    const getSubjects = ()=> {
        setIsLoading(true)
        fetch(SUBJECTS_URL)
            .then(res => res.json())
            .then(json => {
                setSubjects(json)
                setIsLoading(false)
            })
            .catch(err => setErr(()=> err))
    }

    useEffect(()=> {
        getSubjects()
    },[])

    const handleSubjectChange = ({target}) => {
        const {value} = target
        setSelectedSubject(value)
        setFirstTime(false)
    }

    const displayOptions = subjects.map((subject, idx) => {
        if (!idx && isFirstTime) {
        return (
            <React.Fragment key={idx-1}>
                <option className="option-subject" key={idx-1} value={null}>Select subject</option>
                <option className="option-subject"key={idx} value={subject}>{subject}</option>
            </React.Fragment>
        )
        } else {
            return (
                    <option className="option-subject" key={idx} value={subject}>{subject}</option>
            )

        }
    })
    return (
        <>
            <h2>Subject</h2>
            <div className="select">
                <select 
                    className="select-subject"
                    value={selectedSubject}
                    name="subject" 
                    onChange={handleSubjectChange}
                >
                    {displayOptions}
                </select>
            </div>
            <Books subject={selectedSubject} />
        </>
    )
}

export default SubjectSelecor