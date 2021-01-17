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

function MyDog() {

  const initialValues = {
    userName: "",
    dogID: "",
    breed: "",
    dateOfBirth: "",
    info: "",
    name: ""
  };

  const [allDogs, setAllDogs] = useState([]);
  const [dog, setDog] = useState(initialValues);

  const handleSubmit = (event) => {
    //   alert('A name was submitted: ' + dog.name);
    event.preventDefault();
    updateForm(dog);
    console.log("from submit " + dog);
  };

  const handleChange = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setDog({ ...dog, [id]: value });
    console.log("from change " + id);
  };

  const fetchDog = () => {
    fetch(AllDogs)
      .then((res) => res.json())
      .then((data) => {
        setAllUser(data);
      });
  };

  const DeleteDog = (id) => {
    const options = makeOptions("DELETE");

    fetch(DeleteDog + id, options)
      .then((res) => res.json())
      .then((data) => {
        setAllDogs(data);
        fetchDog();
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const updateForm = (user) => {
    const options = makeOptions("PUT", user);

    fetch(UpdateDog, options)
      .then((res) => fetchUser())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error" + err);
        }
      });
  };

  const getUser = (userName) => {
    fetch(GetUser + userName)
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

  const addDog = () => {
    const options = makeOptions("POST", dog);

    fetch(AddDog, options)
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
        <Form.Group controlId="id">
            <Form.Label>Dog ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Id"
              value={dog.id}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name of dog?"
              value={dog.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="dateOfBirth">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="text"
              placeholder="Date of Birth?"
              value={dog.dateOfBirth}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group controlId="breed">
            <Form.Label>Breed</Form.Label>
            <Form.Control
              type="text"
              placeholder="What breed is the dog?"
              value={dog.breed}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="info">
            <Form.Label>Info</Form.Label>
            <Form.Control
              type="text"
              placeholder="Info about dog"
              value={person.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="user">
            <Form.Label>User</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name of owner"
              value={dog.userName}
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





  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div>
      <Container>
        <h2>My Dogs</h2>
        <Row className="mt-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Breed</th>
                  <th>Info</th>
                  <th>Owner</th>
                  <th colSpan="2">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {allDogs.all &&
                  allDogs.all.map((element) => {
                    return (
                      <tr key={element.id}>
                        <td>{element.name}</td>
                        <td>d{element.dateOfBirth}</td>
                        <td>d{element.breed}</td>
                        <td>d{element.info}</td>
                        <td>d{element.userName}</td>
                        <td>edit</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default MyDog;