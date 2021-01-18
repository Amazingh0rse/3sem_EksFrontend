import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { URLJokes, dogBreeds } from "./settings";
import ByBreed from "./ByBreed";


const DogBreeds = () => {

    const [breeds, setBreeds] = useState("");
    const fetchAllBreeds = () => {
        const options = makeOptions("GET")

        fetch(dogBreeds, options).then(res => res.json()).then(data => {
            setBreeds(data);
        })
    }

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
    //loads joke first time
    useEffect(() => {
        fetchAllBreeds();

    }, []);

    return (
        <div>
          
                
            <Container>
            <ByBreed />
                <h2>List of all Breeds</h2>
                <Row className="mt-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  
                 
                </tr>
              </thead>
              <tbody>
                {breeds.dogs &&
                  breeds.dogs.map((element) => {
                    return (
                      <tr key={element.dogs}>
                        <td>{element.breed}</td>
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

export default DogBreeds;