import React, { useState, useEffect } from 'react';
import { AllUsers, DeleteUser } from './settings'
import { Container, Row, Col, Button, InputGroup, FormControl, Table, Form } from "react-bootstrap";


function AdminCrud(){
    const [person, setPerson] = useState([]);
    const fetchPerson = () => { 
        fetch(AllUsers).then(res => res.json()).then(data => {
        setPerson(data);
    })
    
}

const deletePerson = (email) => { 
    const options = makeOptions("DELETE");
    fetch(DeleteUser + email, options).then(res => res.json()).then(data => {
    setPerson(data);
})


//INDSÆT BODY TIL EN PUT

}

/*
Function for POST, PUT and DELETE
*/
function makeOptions(method, body) {
    const opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}


useEffect(() => {
    fetchPerson();
}, []);
console.log(person);

    return (
        <div>
            <Container>
                <h2>CRUD for users</h2>
                <Row className="mt-4">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>Zip</th>
                                    <th>Hobby</th>
                                    <th colspan="2">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {person.all && person.all.map(element => {
                                        return (
                                            <tr key={element.email}>
                                                <td>{element.firstName}</td>
                                                <td>{element.lastName}</td>
                                                <td>{element.email}</td>
                                                <td>{element.phone}</td>
                                                <td>{element.street}</td>
                                                <td>{element.city}</td>
                                                <td>{element.zipcode}</td>
                                                <td>{element.hobbyList.map(el => el + ", ")
                                                }</td>
                                                <td>
                                                   <Button>Edit</Button>
                                                </td>
                                                <td>
                                                   <Button onClick={deletePerson(element.email)}>Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )}
                            </tbody>
                        </Table>
                        <Button>Add</Button>
                    </Col>
                </Row>
               

            </Container>
        </div>
    );
}

export default AdminCrud;