import React, {useState, useReducer} from 'react'
import QRCode from "react-qr-code";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt';
import "react-datepicker/dist/react-datepicker.css";
import { Row, Table } from 'reactstrap';
import formReducer from '../utils/forms';

registerLocale('pt', pt)
const CadastroMultiplo = () => {

    const [startDate, setstartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [formData, setFormData] = useReducer(formReducer, {});
    const [productList, setProductList] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();
        const products = [ ...productList, { ...formData }]
        console.log(products)
        setProductList(products);
        
        // setFormData({})
    }

    const converteData = (date) => {
       return `${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getFullYear()}`
       

    }
    return (
        <div>
        <h2>Fracionamento</h2>
        <hr />
        <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input name="nome" onChange={setFormData}/>
          </label>
          <label>
            <p>Lote</p>
            <input name="lote" type="number" onChange={setFormData}/>
          </label>
          <label>
            <p>Quantidade</p>
            <input name="quantidade" onChange={setFormData}/>
          </label>
          <label>
            <p>Data de Fabricação/Entrada</p>
            <DatePicker dateFormat="dd/MM/yyyy" locale="pt" selected={startDate} onChange={
                (date) => {
                    setFormData({target: {name:"fab", value: converteData(date)}})
                    setstartDate(date)
                }
            } />
            </label>
            <label>
            <p>Data de Validade</p>
            <DatePicker dateFormat="dd/MM/yyyy" locale="pt" selected={endDate} onChange={
                (date) => {
                    setFormData({target: {name:"val", value: converteData(date)}})
                    setEndDate(date)
                }
            } />
          </label>
          
        </fieldset>
        <button type="submit" >Submit</button>
      </form>
      <Row>
      <Table bordered>
          <thead>
            <th>Indice</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Codigo</th>
          </thead>
          <tbody>
          {productList.map((product, index ) => (
            <tr>
                <td>{index+1}</td>
                <td>{product.nome}</td>
                <td>{product.tipo}</td>
                <td>{product.quantidade}</td>
                <td><div><QRCode size="80" value = {JSON.stringify(product)} /></div></td>
            </tr>  
          ))}
          </tbody>
      </Table>
      </Row>

      </div>
      
      
    )
}

export default CadastroMultiplo;