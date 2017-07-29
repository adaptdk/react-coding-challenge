import React, { PropTypes } from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

const Subjects = ({subjects, fetched, fetching, value, select}) => {
    const subjectList = subjects.map((s, i) => {
        return <MenuItem onClick={ () => {
            select(s)
        }} key={'subjects' + i} value={s} primaryText={s} />
    })
    const field = fetched ?
    <SelectField floatingLabelText="Subjects" value={value}>
        {subjectList}
    </SelectField> : <div></div>
    return(
        <div>
            {field}
            {fetching && !fetched &&
            <div style={{marginTop: '35px'}}>
                <span style={{fontSize: '1.2em'}}>Loading subjects...</span><CircularProgress size={24} thickness={2} />
            </div>}
        </div>
    )
}

Subjects.propTypes = {
    subjects: PropTypes.array,
    fetched: PropTypes.bool,
    fetched: PropTypes.bool,
    value: PropTypes.string,
    select: PropTypes.func,
}

export default Subjects
