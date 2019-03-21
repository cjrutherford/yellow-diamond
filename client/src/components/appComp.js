import React, {Component, Fragment} from 'react';
import {Card, CardTitle, CardBody, Button} from 'reactstrap';

class App extends Component{
    render(){
        const {id, name, users, owner, admins, bans, icon,banner, onButton} = this.props;
        const metaStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridSpacing: '2em',
        }
        const headerStyle = {
            boxShadow: '2px 2px 4px 4px rgba(88,88,88,0.6)',
            margin: '0.5em',
            padding: '0.5em',
            textAlign: 'center'
        }

        const editMe = () => {
            onButton(id);
        }

        return(
            <Card style={{
                    marginTop: '2em',
                    padding: '1.5em',
                    background: 'rgba(33,33,33,0.8)',
                }}>
                <CardTitle 
                    style={{
                        fontSize: '4em'
                    }}
                >
                    <div style={{
                        background: `url(${banner})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center center'
                        }}>
                        {icon ? <image src={icon} alt='icon' className='img-thumbnail' width='5vw'/>: ''}
                        <span style={{background: 'rgba(88,88,88,0.3)', padding: '0.5em'}}>{name}</span>
                    </div>
                </CardTitle>
                <CardBody style={metaStyle}>
                    <h4 style={headerStyle}>Users: {users.length}</h4>
                    <h4 style={headerStyle}>Owner: {owner}</h4>
                    <h4 style={headerStyle}>Admins: {admins.length}</h4>
                    <h4 style={headerStyle}>Banned Users: {bans.length}</h4>
                    <span></span><span></span><span></span><Button onClick={editMe}>Manage</Button>
                </CardBody>
            </Card>
        )
    }
}

export default App;