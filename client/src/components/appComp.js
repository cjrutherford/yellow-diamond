import React, {Component, Fragment} from 'react';

class App extends Component{
    render(){
        const {name, users, owner, admins, bans} = this.props;
        const metaStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)'
        }
        return(
            <Fragment>
                <h1>{name}</h1>
                <div style={metaStyle}>
                    <h4>Users: {users.length}</h4>
                    <h4>Owner: {owner}</h4>
                    <h4>Admins: {admins.length}</h4>
                    <h4>Banned Users: {bans.length}</h4>
                </div>
            </Fragment>
        )
    }
}

export default App;