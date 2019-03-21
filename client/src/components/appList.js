import React, { Component, Fragment } from 'react';
import App from './appComp.js';

import AppEditForm from './appEditForm';

import { getAppsList } from '../actions/app';

import { connect } from 'react-redux';


import { Modal, ModalHeader, ModalBody } from 'reactstrap';


class AppList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apps: [],
            styles: {
                containerStyles: {
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

    componentDidMount() {
        this.props.getAppsList();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            apps: nextProps.apps,
        });
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

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    render() {
        let appsList;
        if (typeof this.state.apps !== 'undefined') {
            appsList = this.state.apps.map(a => {
                return <App
                    key={a.id}
                    id={a.id}
                    banner={a.appBanner}
                    icon={a.appIcon}
                    name={a.appName}
                    description={a.appDescription}
                    users={a.users}
                    owner={a.appOwner}
                    admins={a.ownerDelegates}
                    bans={a.permBannedUsers + a.tempBannedUsers}
                    onButton={this.onButton} />
            });
        } else {
            appsList = <div style={this.state.styles.headerStyles}><h1>Sorry No Apps. :(</h1></div>
        }
        return (
            <Fragment>
                <div style={this.state.styles.containerStyles}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottom: '5px solid white', }}>
                        <h1 style={this.state.styles.headerStyles}>Your Apps</h1><i className='fa fa-plus-circle'></i>
                    </div>
                    {appsList}
                </div>
                <Modal isOpen={this.state.modal} size='lg' style={{

                }}>
                    <ModalHeader style={{
                        background: 'black',
                        borderSize: '2px',
                        borderStyle: 'solid',
                        borderColor: '#dc304b',
                        borderRadius: '5px',
                        color: '#dc304b',
                    }} toggle={this.toggle}>Manage Application</ModalHeader>
                    <ModalBody style={{
                        background: 'black',
                        borderSize: '2px',
                        borderStyle: 'solid',
                        borderColor: '#dc304b',
                        borderRadius: '5px',
                        color: '#dc304b',
                    }}
                    ><AppEditForm id={this.state.selectedApp}></AppEditForm></ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

const mapState = state => ({
    apps: state.apps.appList,
});

export default connect(mapState, { getAppsList })(AppList);