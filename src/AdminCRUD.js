import React, { useState, useEffect } from "react";
import { AllUsers, DeleteUser, UpdateUser, GetUser, AddUser } from "./settings";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Table,
  Form
} from "react-bootstrap";

function AdminCrud() {
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    zipcode: ""
  };

  const [allPerson, setAllPerson] = useState([]);
  const [person, setPerson] = useState(initialValues);

  const handleSubmit = (event) => {
    //   alert('A name was submitted: ' + person.firstName);
    event.preventDefault();
    updateForm(person);
    console.log("from submit " + person);
  };

  const handleChange = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setPerson({ ...person, [id]: value });
    console.log("from change " + id);
  };

  const fetchPerson = () => {
    fetch(AllUsers)
      .then((res) => res.json())
      .then((data) => {
        setAllPerson(data);
      });
  };

  const deletePerson = (email) => {
    const options = makeOptions("DELETE");

    fetch(DeleteUser + email, options)
      .then((res) => res.json())
      .then((data) => {
        setAllPerson(data);
        fetchPerson();
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const updateForm = (person) => {
    const options = makeOptions("PUT", person);

    fetch(UpdateUser, options)
      .then((res) => fetchPerson())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error" + err);
        }
      });
  };

  const getPerson = (email) => {
    fetch(GetUser + email)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data);
        console.log(data);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const addPerson = () => {
    const options = makeOptions("POST", person);

    fetch(AddUser, options)
      .then((res) => res.json())
      .then((res) => fetchPerson())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const userForm = () => {
    return (
      <div>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              value={person.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              value={person.password}
              onChange={handleChange}
            />
          </Form.Group>          
          <Form.Group controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              value={person.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              value={person.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone"
              value={person.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Street"
              value={person.street}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              value={person.city}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="zipcode">
            <Form.Label>Zipcode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zipcode"
              value={person.zipcode}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p>{JSON.stringify(person)}</p>
      </div>
    );
  };

  /*
  Function for POST, PUT and DELETE
  */
  function makeOptions(method, body) {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }

  /* function fetchWithErrorCheck(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  } */

  useEffect(() => {
    fetchPerson();
  }, []);

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
                  <th colSpan="2">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {allPerson.all &&
                  allPerson.all.map((element) => {
                    return (
                      <tr key={element.email}>
                        <td>{element.firstName}</td>
                        <td>{element.lastName}</td>
                        <td>{element.email}</td>
                        <td>{element.phone}</td>
                        <td>{element.street}</td>
                        <td>{element.city}</td>
                        <td>{element.zipcode}</td>
                        <td>{element.hobbyList.map((el) => el + ", ")}</td>
                        <td>
                          <Button onClick={() => getPerson(element.email)}>
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button onClick={() => deletePerson(element.email)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <Button onClick={() => addPerson()}>Add</Button>
          </Col>
        </Row>

        {userForm()}
      </Container>
    </div>
  );
}

export default AdminCrud;
