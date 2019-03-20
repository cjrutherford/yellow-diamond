import React, {Component, Fragment} from 'react';
import {Card, CardTitle, CardBody} from 'reactstrap';

class App extends Component{
    render(){
        const {name, users, owner, admins, bans, icon} = this.props;
        const metaStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)'
        }
        return(
            <Card style={{
                    marginTop: '2em',
                    padding: '2em',
                    background: 'rgba(33,33,33,0.8)',
                }}>
                <CardTitle 
                    style={{
                        fontSize: '4em'
                    }}
                >{icon ? <image src={icon} alt='icon'></image>: ''}{name}</CardTitle>
                <CardBody style={metaStyle}>
                    <h4>Users: {users.length}</h4>
                    <h4>Owner: {owner}</h4>
                    <h4>Admins: {admins.length}</h4>
                    <h4>Banned Users: {bans.length}</h4>
                </CardBody>
            </Card>
        )
    }
}

export default App;