import React, {Component} from 'react';
import {Card, CardTitle, CardBody, FormGroup, Form} from 'reactstrap';
class UserList extends Component{
    render(){
        return(
            
            <React.Fragment > 
                <Card className='UserBox'>
                <CardTitle className='UserTitle'>User List</CardTitle>
                <Form>
                <FormGroup className='UserInfo UserListBorder'>
                <input className='col' type='text' name='Username' placeholder='Username' />
                <input className='col' type='text' name='Email' placeholder='Email' />
                <input className='col' type='text' name='Status' placeholder='Status' /> 
                </FormGroup>
                </Form>
                </Card>
                // User info box
                <Card className='UserBox'>
                <CardTitle className='UserTitle'>User Info</CardTitle>
                <CardBody>
                <Form > 
                <FormGroup className='UserInfo'>
                <input className='col' type='text' name='UserName' placeholder='User Name' />
                <input className='col' type='text' name='FirstName' placeholder='First Name' />
                <input className='col' type='text' name='MiddleName' placeholder='Middle Name' />
                <input className='col' type='text' name='LastName' placeholder='Last Name' />
                <input className='col' type='text' name='Email' placeholder='Email' />
                <select>
                 <option disabled>User Authorization</option>
                 <option value='User'>User</option>
                 <option value='Admin'>Admin</option>
                 <option value="Auth Admin">Auth Admin</option>   
                </select>
                <select>
                 <option disabled>User Status</option>
                 <option value='ActiveUser'>Active</option>
                 <option value='TempBan'>Temp Ban</option>
                 <option value="PermaBan">Perma Ban</option>   
                </select>
                <div >
                    <button className='UserButtons formRegButton'>Save</button>
                    <button className='UserButtons formRegButton'>Cancel</button>
                </div>
                </FormGroup> 
                </Form>    
                </CardBody>    
                </Card>
            </React.Fragment>
        )
    }
}

export default UserList;