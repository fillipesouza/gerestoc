import React, {useState, useReducer, useCallback, useDispatch} from 'react'
import { Form, FormGroup, Input, Label, Button, ButtonDropdown } from 'reactstrap';
import formReducer from '../utils/forms';
import Cadastro from './Cadastro';
import Login from './Login';
import Registrar from './Registrar';


const Inicial = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [isCadastro, setIsCadastro] = useState(false);

    return (
        <div>
           {isCadastro? <Login /> : <Registrar />}
           
           <Button onClick={() => setIsCadastro(isCadastro => !isCadastro)}>{isCadastro? 'Ir para Login': 'Ir para Cadastro'}</Button>
        </div>
    )
}

export default Inicial;
