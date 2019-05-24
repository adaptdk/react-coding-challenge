import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import PropTypes from 'prop-types'

class CategorySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [{ text: '', value: '' }]
        }
    }

    componentWillMount() {
        this.fetchCategoryData()
    }

    fetchCategoryData() {
        fetch('http://localhost:3010/subjects')
            .then(response => response.json())
            .then(data => {
                let newOptions = []
                for (let i = 0; i < data.length; i++) {
                    newOptions.push({ text: data[i], value: data[i] })
                }
                this.setState({ options: newOptions })
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12 text-right">
                    <Dropdown placeholder="Select a Category" selection options={this.state.options} onChange={(event, data) => this.props.setCategory(data.value)} />
                </div>
            </div>);

    }
}

CategorySelector.propTypes = {
    setCategory: PropTypes.func
}

export default CategorySelector