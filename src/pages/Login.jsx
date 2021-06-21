import React, {useState, useReducer, useCallback, useDispatch} from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import formReducer from '../utils/forms';


const Login = () => {
    const [formData, setFormData] = useReducer(formReducer, {ip: localStorage.getItem('ipServidor') || ''});
    const [submitting, setsubmitting] = useState(false);

    const logar = (event) => {
        event.preventDefault();
        localStorage.setItem('ipServidor', formData.ip) 
    }

    return (
        <div>
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
                <Button onClick={logar} >Logar</Button>
            </Form>
        </div>
    )
}

export default Login;
