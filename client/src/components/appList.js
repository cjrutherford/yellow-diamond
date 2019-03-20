import React, {Component, Fragment} from 'react';
import App from './appComp.js';

import EditForm from './editForm';

import {Modal, ModalHeader, ModalBody} from 'reactstrap';


class AppList extends Component{
    constructor(props){
        super(props);
        this.state = {
            apps: [
                {
                    id: 1298745901,
                    appName: 'Simple Test',
                    users: ['132857','1938274591','1923875','193745913'],
                    appOwner: '5c7efa437b97f557e0f47c25',
                    ownerDelegates: [],
                    bannedUsers: [],
                }
            ],
            styles:{
                containerStyles:{
                    width: '90vw',
                    marginLeft: '5em',
                    marginTop: '2em',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                },
            },
            modal: false,
            selectedApp: '',
        }
        this.onButton = this.onButton.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    onButton(id) {
        //this function is to open the modal for the selected application.
        //it would be preferable that this be an app update component that
        // has the option to delete the application. This should trigger 
        // an email to all users that use the app that it is going away.
        this.setState({
            modal: !this.state.modal,
            selectedApp: id,
        });
    }
    
    toggle(){
        this.setState({
            modal: !this.state.modal,
        });
    }

    render(){
        const appsList = this.state.apps.map(a => {
            return <App key={a.id} id={a.id} name={a.appName} users={a.users} owner={a.appOwner} admins={a.ownerDelegates} bans={a.bannedUsers} onButton={this.onButton}/>
        })
        return(
            <Fragment>
                <div style={this.state.styles.containerStyles}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottom: '5px solid white',}}>
                    <h1 style={this.state.styles.headerStyles}>Your Apps</h1><i className='fa fa-plus-circle'></i>
                    </div>
                    {appsList}
                </div>
                <Modal isOpen={this.state.modal} >
                    <ModalHeader toggle={this.toggle}>Manage Application</ModalHeader>
                    <ModalBody><EditForm id={this.state.selectedApp}></EditForm></ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

export default AppList;