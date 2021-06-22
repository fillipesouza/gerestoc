import React, { useState, useReducer, useCallback, useDispatch } from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Loader from "react-loader-spinner";

import formReducer from '../utils/forms';


const Login = (props) => {
    const history = useHistory();
    const [formData, setFormData] = useReducer(formReducer, { ip: localStorage.getItem('ipServidor') || '' });
    const [submitting, setsubmitting] = useState(false);

    const logar = () => {
        setsubmitting(true);
        localStorage.setItem('ipServidor', formData.ip)
        setsubmitting(false);
        props.logar(true);     

    }


    const screen = <div>
        <Form>
            <FormGroup>
                <Label for="login" >Login</Label>
                <Input id="login" name="login" type="text" onChange={setFormData} />
            </FormGroup>
            <FormGroup>
                <Label for="senha" >Senha</Label>
                <Input id="senha" name="senha" type="password" onChange={setFormData} />
            </FormGroup>
            <FormGroup>
                <Label for="ip" >IP</Label>
                <Input id="ip" name="ip" type="text" onChange={setFormData} value={formData.ip} />
            </FormGroup>
            <Button onClick={() => { logar(); history.push("/") }} >Logar</Button>
        </Form>
    </div>

    const loader = <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000} />
    return submitting ? loader : screen;
}

export default Login;
