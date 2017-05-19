import React from 'react'
import PropTypes from 'prop-types'

const Picker = ({value, onChange, options}) => (
    <div><label className='title' htmlFor="picker">Chooce subject or two: </label>
        <br/>
        <select
            multiple="multiple"
            id="picker"
            onChange={e => onChange(e.target.options)
            }
            value={value || []
            }>
            {
                options.map(option =>
                    <option value={option} key={option}>
                        {option}
                    </option>)
            }
        </select>
    </div>
)


Picker.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Picker;