import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { URLJokes, dogBreeds, GetdogBreed } from "./settings";




function ByBreed(){
    const [breed, setBreed] = useState("");

    const handleSubmit = (event) => {
        //   alert('A name was submitted: ' + dog.name);
        const options = makeOptions("GET");
        event.preventDefault();
        fetchBreed(breed)
        console.log("from submit ");
      };

      const handleChange = (event) => {
        const target = event.target;
        setBreed(breed);
        console.log("from change " + breed);
      };


      const fetchBreed= () => {
        const options = makeOptions("GET", breed);
        fetch(GetdogBreed+"boxer")
          .then((res) => res.json())
          .then((data) => {
            setBreed(data);
            console.log(data)
          });
      };

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

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    
                    <Form.Group controlId="breed">
                    <Form.Label>Breed</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of breed?"
                        value={breed.breed}
                        onChange={handleChange}
                    />
                    </Form.Group>
                    
                
                    <Button variant="primary" type="submit">
                    Update
                    </Button> &nbsp;
                    
                </Form>
            </div>
    
        );

}
    
    

export default ByBreed;