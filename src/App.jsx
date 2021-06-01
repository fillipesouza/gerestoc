import QRCode from "react-qr-code";
import { Redirect, Route, Switch } from "react-router";
import { Col, Container, Row } from "reactstrap";
import Cadastro from "./pages/Cadastro";
import CadastroMultiplo from "./pages/CadastroMultiplo";
import Header from "./pages/Header";
import Leitor from "./pages/Leitor";

const App = () => {
    
    return (
        <div>
            <Header />
    <Container >
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
            <Redirect to="/leitor" />
        </Switch>

        </Container>
        </div>

    )
}

export default App;