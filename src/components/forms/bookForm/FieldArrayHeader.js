import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const styleAddBtn = {
  marginTop: '10px',
  marginLeft: '30px'
}

const FieldArrayHeader = ({fields, error, title}) =>
    <li>
      {title &&
      <h2  style={{float: 'left'}}>{title}</h2>}
      <div style={{float: 'left'}}>
        <RaisedButton
          label={"Add"}
          labelPosition="before"
          icon={<i className="material-icons">add</i>}
          onTouchTap={ () => fields.push() }
          backgroundColor="#a4c639"
          style={styleAddBtn}
        />
        {error &&
        <span className="error">
          {error}
        </span>}
      </div>
      <div style={{clear: 'both'}}></div>
    </li>

export default FieldArrayHeader