import React, {Component} from 'react';

class EditForm extends Component{
    render(){
        console.log(this.props);
        const {id} = this.props;
        return(
            <div>App!: ({id})</div>
        );
    }
}

export default EditForm;