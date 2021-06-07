import React, {useState, useReducer, useCallback, useDispatch} from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import formReducer from '../utils/forms';


const Login = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setsubmitting] = useState(false);

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
                <Button >Logar</Button>
            </Form>
        </div>
    )
}

export default Login;
