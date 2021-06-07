import React, {useState, useReducer} from 'react'
import QRCode from "react-qr-code";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt';
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import formReducer from '../utils/forms';

registerLocale('pt', pt)

const Cadastro = () => {

    const [startDate, setstartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
    }

    const converteData = (date) => {
       return `${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getFullYear()}`
       

    }
    return (
        !submitted?
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="nome">Nome </Label>            
                <Input required type="text" id="nome" name="nome" onChange={setFormData}/>
            </FormGroup>
            <FormGroup>
                <Label for="nome">Tipo </Label>            
                <Input required type="text" id="tipo" name="tipo" onChange={setFormData}/>
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
      <QRCode value = {JSON.stringify(formData)} />
    )
}

export default Cadastro;