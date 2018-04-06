import React from 'react';
import { Dropdown } from 'semantic-ui-react';


class DropdownSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: undefined,
        };
    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch('http://localhost:3010/subjects')
            .then(response => response.json())
            .then(data => {
                var array = [
                    {
                        text: data[0],
                        value: data[0]
                    },
                    {
                        text: data[1],
                        value: data[1]
                    }
                ];
                this.setState({subjects: array});

            })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    render() {
        return (
            <div>
                Choose subject:
                <br/>
                <Dropdown placeholder="Select subject" selection options={this.state.subjects} onChange={(e, data) => this.props.changeSub(data.value)}/>
            </div>
        );
    };
}

DropdownSelection.propTypes = {
    changeSub: React.PropTypes.func,
};


export default DropdownSelection;