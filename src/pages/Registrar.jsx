import React, {useState, useReducer, useCallback, useDispatch} from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import keypair from 'keypair';
import Loader from "react-loader-spinner";
import formReducer from '../utils/forms';

const Registrar = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setsubmitting] = useState(false);

    const cadastro = async () => {
        setsubmitting(true);
        const kp = keypair();
        const pub = kp.public;
        const priv = kp.private;
        console.log(kp)
        formData['pubKey'] = pub;
        localStorage.setItem('app-key', priv);
        console.log(formData)
        
    }
    
    const screen = <div>            
        <Form>
            <FormGroup>
                <Label for="CNPJ/CPF" >CNPJ</Label>
                <Input id="cnpj" name="cnpj" type="text" onChange={setFormData} />
            </FormGroup>
            <FormGroup>
                <Label for="login" >Login</Label>
                <Input id="login" name="login" type="text" onChange={setFormData} />
            </FormGroup>
            <FormGroup>
                <Label for="senha" >Senha</Label>
                <Input id="senha" name="senha" type="password" onChange={setFormData} />
            </FormGroup>
            <FormGroup>
                <Label for="confirmaSenha" >Confirma Senha</Label>
                <Input id="confirmaSenha" name="confirmaSenha" type="password" onChange={setFormData} />
            </FormGroup>
            <Button onClick={cadastro} >Cadastrar Conta</Button>
        </Form>
    </div>
    const loader = <Loader  type="Puff"  color="#00BFFF"   height={100}  width={100}  timeout={3000} />
    return submitting? loader: screen;
}

export default Registrar;
