import React from 'react';
import logo from '../img/logo.png';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import { TextareaAutosize } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import '../App.css';
import DataTable from "react-data-table-component";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  divapp: {
    color : '#25465f',
    background : '#fff',
  },
  titleapp : {
    textAlign: 'center', 
    background: 'f9f9f9',
  },
  bggrey : {
    backgroundColor: "#f8f8f !important",
  }

}));

export default function Header() {
  const classes = useStyles();
  const [inputText, setInputText] = React.useState("");
  // const [result, setResult] = React.useState({});
  const [cols, setCols] = React.useState([]);
  const [data, setData] = React.useState([]);


  const handleTextChange = ({target}) => {
    setInputText(target.value)
  }

  const handleClick = () => {
    console.log("-----> " + inputText)
    axios.post('http://localhost:8000/api/get_result/', {
      headers: {'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      text: inputText
    })
      .then(function (response) {
        const columns = []
        console.log(Object.keys(response.data))
        for (let i = 0; i < Object.keys(response.data).length; i++) {
          //console.log(Object.keys(response.data)[i])
          const col_name = Object.keys(response.data)[i];
          columns[i] = {'name': col_name, 'selector': col_name };
        }

        console.log(columns)
        console.log(response.data['english_words'])
        console.log(response.data['spanish_words'])
        console.log(response.data['language'])
        console.log(response.data['text'])


        const values = []
        // Object.keys(response.data).forEach(key => {values.push({
        //   name: key,
        //   value: response.data[key]
        // });
        //   console.log("=====> " + key + " " + response.data[key]);
        // }
        // );
        for (var i = 0; i < Object.keys(response.data).length; i++) {
          values.push(response.data[Object.keys(response.data)[i]])
          console.log(response.data[Object.keys(response.data)[i]])
        }
        console.log("values ----> " +values)

        setCols(columns)
        setData(values)
        
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