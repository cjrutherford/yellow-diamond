import React, {Component, Fragment} from 'react';
import App from './appComp.js';


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
            }
        }
    }
    render(){
        const appsList = this.state.apps.map(a => {
            return <App key={a.id} name={a.appName} users={a.users} owner={a.appOwner} admins={a.ownerDelegates} bans={a.bannedUsers} />
        })
        return(
            <Fragment>
                <div style={this.state.styles.containerStyles}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottom: '5px solid white',}}>
                    <h1 style={this.state.styles.headerStyles}>Your Apps</h1><i className='fa fa-plus-circle'></i>
                    </div>
                    {appsList}
                </div>
            </Fragment>
        )
    }
}

export default AppList;