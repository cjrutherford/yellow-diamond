import React, { Component, Fragment } from 'react';
import { Card, CardTitle, CardBody, Button } from 'reactstrap';

class App extends Component {
  render() {
    console.log(this.props);
    const {
      id,
      app,
      name,
      users,
      owner,
      admins,
      bans,
      icon,
      banner,
      onButton,
    } = this.props;
    const metaStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridSpacing: '2em',
    };
    const headerStyle = {
      boxShadow: '2px 2px 4px 4px rgba(206,245,253,0.6)',
      //border: 'solid 4 white' , 
      margin: '0.5em',
      padding: '0.5em',
      textAlign: 'center',
    };

    const editMe = () => {
      console.log(this.props.app._id);
      onButton(this.props.app._id);
    };

    return (
      <Card
        style={{
          marginTop: '2em',
          padding: '1.5em',
          background: 'rgba(6,157,191,0.8)',
          //background: 'rgba(28,25,25,0.8)',
          
        }}>
        <CardTitle
          style={{
            fontSize: '4em',
          }}>
          <div
            style={{
              background: `url(${banner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}>
            {icon ? (
              <image
                src={icon}
                alt="icon"
                className="img-thumbnail"
                width="5vw"
              />
            ) : (
              ''
            )}
            <span
              style={{ background: 'rgba(15,50,64, 0.8)', padding: '0.5em', borderRadius: '0 0 .2em .2em' }}>
              {name}
            </span>
          </div>
        </CardTitle>
        <CardBody style={metaStyle}>
          <h4 style={headerStyle}>Users: {users.length}</h4>
          <h4 style={headerStyle}>Owner: {owner}</h4>
          <h4 style={headerStyle}>Admins: {admins.length}</h4>
          <h4 style={headerStyle}>Banned Users: {bans.length}</h4>
          <span />
          <span />
          <span />
          <Button className="YourAppsButton" onClick={editMe}>Manage</Button>
        </CardBody>
      </Card>
    );
  }
}

export default App;
