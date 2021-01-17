import React, { useState, useEffect } from "react";
import { AllUsers, DeleteUser, UpdateUser, GetUser, AddUser, GetDogs, GetDog,AddDog, AddDogToOwner, DeleteDog, UpdateDog } from "./settings";
import facade from "./apiFacade";
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

  function parseJwtName(name) {
    let tokenName = JSON.parse(atob(name.split('.')[1]));
    return tokenName.username;
  }
  
  const initialValues = {
    userName: "",
    dogid: "",
    breed: "",
    dateOfBirth: "",
    info: "",
    name: ""
  };

  const [allDogs, setAllDogs] = useState([]);
  const [dog, setDog] = useState(initialValues);
  const [dogID,setDogId] = useState([]);

  

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

  const fetchDogs = () => {
    fetch(GetDogs )
      .then((res) => res.json())
      .then((data) => {
        setAllDogs(data);
        console.log(data)
      });
  };

  const deleteDog = (id) => {
    const options = makeOptions("DELETE");

    fetch(DeleteDog + id, options)
      .then((res) => res.json())
      .then((data) => {
        setAllDogs(data);
        fetchDogs();
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const updateForm = (dog) => {
    const options = makeOptions("PUT", dog);

    fetch(UpdateDog, options)
      .then((res) => fetchDogs())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error" + err);
        }
      });
  };

  const getDog = (id) => {
    fetch(GetDog + id)
      .then((res) => res.json())
      .then((data) => {
        setDog(data);
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
    const options2 = makeOptions("PUT", dog);
    
    fetch(AddDog, options)
      .then((res) => res.json())
      .then((data)=> {setDogId(data.id);
      console.log(data.id)})

      .then((res) => fetchDogs())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
       
      })
       fetch(AddDogToOwner+parseJwtName(facade.getToken())+"/"+dogID, options2)
        .then((res) => res.json())
        .then((res) => fetchDogs())
        .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      })
      
      
      
      ;
  };

  const userForm = () => {
    return (
      <div>
        <Form onSubmit={handleSubmit}>
        
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
              value={dog.info}
              onChange={handleChange}
            />
          </Form.Group>
          
          
          <Button onClick={() => addDog()}>Add</Button>
          <Button variant="primary" type="submit">
            Submit
          </Button> &nbsp;
          
        </Form>
        
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


  // Tabel!
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
                  
                  <th colSpan="2">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {allDogs.dogList &&
                  allDogs.dogList.map((element) => {
                    return (
                      <tr key={element.id}>
                        <td>{element.id}</td>
                        <td>{element.name}</td>
                        <td>{element.dateOfBirth}</td>
                        <td>{element.breed}</td>
                        <td>{element.info}</td>
                       
                        <td>
                          <Button onClick={() => getDog(element.id)}>
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button onClick={() => deleteDog(element.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            
          </Col>
        </Row>
        {userForm()}
      </Container>
    </div>
  );
}


export default MyDog;