import React, {useState, useReducer, useCallback, useDispatch} from 'react'
import { Form, FormGroup, Input, Label, Button, ButtonDropdown } from 'reactstrap';
import formReducer from '../utils/forms';
import Cadastro from './Cadastro';
import Login from './Login';
import Registrar from './Registrar';



function Inicial(props) {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [isCadastro, setIsCadastro] = useState(false);

    const logar  =() => {        
        props.log(true);
    }

    return (
        <div>
           {isCadastro? <Login logar={logar} /> : <Registrar />}
           
           <Button onClick={() => setIsCadastro(isCadastro => !isCadastro)}>{!isCadastro? 'Ir para Login': 'Ir para Cadastro'}</Button>
        </div>
    )
}

export default Inicial;
