import React from 'react';
import logo from '../img/logo.png';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
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
  const [sanityData, setSanityData] = React.useState([]);
  const [sanityCols, setSanityCols] = React.useState([]);



  const handleVisualize = () => {
    axios.get('http://localhost:8000/api/get_sanity_check/')
      .then(function (response) {
        const columns = Object.keys(response.data[0]).map((c) => ({
          name: c,
          selector: c,
          sortable: true,
        }));

        const values = []
        console.log(response.data)
        for (var i = 0; i < Object.keys(response.data).length; i++) {
          values.push(response.data[i])
          console.log(response.data[i])
        }

        setSanityCols(columns)
        setSanityData(values)
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: '#fff', color: ' #25465f' }}>
        <Toolbar>
            <img src={logo} width="10%" className={logo}/>
          <Typography className={classes.title} variant="h6" noWrap>
            SANITY CHECK
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <PersonIcon />
            </div>
          </div>

          <div>
            <Button style={{ background: "#25465f", color:"#fff"}} variant="contained" onClick={handleVisualize}>Visualizer</Button>
          </div>    
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>

      <Container id="contentSanityCheck">
        <h3></h3>
        <DataTable pagination highlightOnHover columns={sanityCols} data={sanityData} />
      </Container>
    </div>
  );
}