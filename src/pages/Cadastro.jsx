import React, {useState, useReducer} from 'react'
import QRCode from "react-qr-code";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt';
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import formReducer from '../utils/forms';
import api from '../utils/api';

registerLocale('pt', pt)

const Cadastro = () => {

    const [startDate, setstartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
    }

    const enviaEstoque = async () => {
        await api.post('/api/estoque', formData)
        setSubmitted(false)
    }

    const converteData = (date) => {
       return `${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getFullYear()}`     

    }
    return (
        <div>
            <h2>Cadastrando Estoque</h2>
            <hr />
        {!submitted?
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="nome">Nome </Label>            
                <Input required type="text" id="nome" name="nome" onChange={setFormData}/>
            </FormGroup>
            <FormGroup>
                <Label for="nome">Lote </Label>            
                <Input required type="number" id="lote" name="lote" onChange={setFormData}/>
            </FormGroup>
            <FormGroup>
                <Label for="quantidade">Quantidade </Label>            
                <Input required type="text" id="quantidade" name="quantidade" onChange={setFormData}/>
            </FormGroup>
            <FormGroup>
                <Label for="fab"> Data de Fabricação/Entrada  </Label>   
                <div id="fab">      
                <DatePicker id="fab" dateFormat="dd/MM/yyyy" locale="pt" selected={startDate} onChange={
                (date) => {
                    setFormData({target: {name:"fab", value: converteData(date)}})
                    setstartDate(date)
                }
            } />
            </div>
            </FormGroup>
            <FormGroup>
                <Label for="val"> Data de Validade  </Label>
                <div id="val">
                <DatePicker  dateFormat="dd/MM/yyyy" locale="pt" selected={endDate} onChange={
                (date) => {
                    setFormData({target: {name:"val", value: converteData(date)}})
                    setEndDate(date)
                }
                           
            } />
            </div> 
            </FormGroup>
            <Button>Submit</Button>
      </Form>:
      <div>
        <div>
        <QRCode value = {JSON.stringify(formData)} />
        </div>
        <Button onClick={enviaEstoque}>Confirmar Estoque</Button>
    </div>
    }
    </div>
    )
}

export default Cadastro;