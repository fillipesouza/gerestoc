import React, {useState, useEffect} from 'react';
import { Redirect, Route, Switch } from "react-router";
import { Col, Container, Row } from "reactstrap";
import Cadastro from "./pages/Cadastro";
import CadastroMultiplo from "./pages/CadastroMultiplo";
import Header from "./pages/Header";
import Leitor from "./pages/Leitor";
import Login from "./pages/Login";

const App = () => {

    const [isLogged, setLogged] = useState(true);
    const [date, setdate] = useState(new Date());

    useEffect(() => {
        setInterval(() => setdate(new Date()), 1000)
    }, [])
    
    return (
        <div>
            <Header isLogged={isLogged} logout={() => setLogged(false)}/>
            <br />
            
    <Container >
    <h2> Horário: {date.toLocaleString()}</h2>
            <br />
    {isLogged?
        <Switch >
            <Route path="/cadastro" exact >
                <Cadastro />
            </Route>
            <Route path="/multiplo" exact >
                <CadastroMultiplo />
            </Route>
            <Route path="/leitor" exact >
                <Leitor />
            </Route>
            <Route path="/login" exact >
                <Login />
            </Route>
            
        </Switch>
        :
        <Switch>
            <Route path="/login" exact >
                <Login />
            </Route>
            <Redirect to="/login" />
        </Switch>
    }

        </Container>
        </div>

    )
}

export default App;