import React from 'react';
import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import DataTable from "react-data-table-component";
import '../App.css';
import { useStyles } from './style';

export default function Header() {
  const classes = useStyles();
  const [inputText, setInputText] = React.useState("");
  const [cols, setCols] = React.useState([]);
  const [data, setData] = React.useState([]);


  const handleTextChange = ({target}) => {
    setInputText(target.value)
  }

  const handleClick = () => {
    axios.post('http://localhost:8000/api/get_result/', {
      headers: {'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      text: inputText
    })
      .then(function (response) {
        const columns = []
        for (let val in response.data) {
          columns.push({'name': val, 'selector': val });
        }

        const values = {};
        for (let data_elem in response.data) {
          values[data_elem] = response.data[data_elem];
        }

        setCols(columns);
        setData([values]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <div className={classes.grow}>

      <center><h1>Language Detector</h1></center>
      <center><Container id="inputForm">
        <TextareaAutosize
          name="textArea"
          rowsMax={20}
          rowsMin={10}
          aria-label="maximum height"
          placeholder="Write your text here"
          value={inputText}
          onChange={handleTextChange}
        />
      </Container></center>
      <center>
        <Button style={{ background: "#25465f", color:"#fff"}} onClick={handleClick} >Check language</Button>
      </center>
      <center>
        <h3><p>-------------------------------------------------------------------</p></h3>
        <h2>Results</h2>
        <Container>
          <DataTable
            columns={cols}
            data={data}
          />
        </Container>
      </center>
    </div>
  );
}