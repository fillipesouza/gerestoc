import React, {useState, useEffect} from 'react';
import { Redirect, Route, Switch } from "react-router";
import { Button, Container } from "reactstrap";
import Cadastro from "./pages/Cadastro";
import CadastroMultiplo from "./pages/CadastroMultiplo";
import Dispositivos from './pages/Dispositivos';
import Header from "./pages/Header";
import Inicial from './pages/Inicial';
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
            <Route path="/dispositivos" exact >
                <Dispositivos />
            </Route>
        
            
        </Switch>
        :
        <Switch>
            <Route path="/inicio" exact >
                <Inicial />
            </Route>
            <Redirect to="/inicio" />
        </Switch>
    }

        </Container>
       
        </div>

    )
}

export default App;