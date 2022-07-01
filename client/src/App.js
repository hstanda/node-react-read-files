import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from 'react';
var axios = require('axios');
 function App() {
  const [data, setData] = useState([]);


  const readHomeDir = async () => {
  
    const response = await axios.get('http://localhost:4000/readHomeDir');
    setData(response.data.returnFiles);
   };

   useEffect(() => {
    readHomeDir();
   }, []);
  

 

  // const { data } = await axios(config)

  // const fileData = data.returnFiles

  // console.log('fileData', fileData)
  // console.log('fileDatax', fileDatax)

  const listItems = (fileMeta) => {
    return Object.keys(fileMeta).map((key, index) => (
      <li key={index}>
        {key} - {fileMeta[key]}
      </li>
    ));
  };

  return (
    <div className="App">
      <Container>
        <br />
        <h1 align="center">Home Directory FIles</h1>
        <Table striped bordered hover className="center">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>File Name</th>
              <th>Created File </th>
            </tr>
          </thead>
          <tbody>
            { data && data.map((file) => {
              return (
                <tr key={file.id}>
                  <>
                    <td>{file.id}</td>
                    <td>
                      {" "}
                      <div className="fileOuter">
                        <button className="fileName"> {file.name}</button>
                        <Col className="fileItems">
                          <ul>{listItems(file.allMeta)}</ul>
                        </Col>
                      </div>
                    </td>
                    <td>{file.createdDate}</td>
                  </>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
