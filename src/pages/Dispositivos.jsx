import React, { useState, useReducer, useEffect } from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Dropdown, Table } from 'reactstrap';
import api from '../utils/api';
import formReducer from '../utils/forms';

const mapValues = (val) => {
    return {
        "hum": "Humidade",
        "tmp": "Temperatura",
        "gas": "Gas",
        "pot": "Generico"
    }[val]

}

const MeuModal = (props) => {
    const [dispositivo, setDispositivo] = useReducer(formReducer, {...props.dispositivo});
    return (
        <Modal isOpen={props.modal} toggle={props.toggle} >
                <ModalHeader toggle={props.toggle}>Modal title</ModalHeader>
                <ModalBody>
                <Form>
                    <FormGroup>
                    <Label for="pin" >Pino</Label>
                    <Input id="pin" type="number" onChange={setDispositivo} name="pin" value={dispositivo?.pin || ""} />
                    </FormGroup>
                    <FormGroup>
                    <Label for="alias" >Nome</Label>
                    <Input id="alias" onChange={setDispositivo} name="alias" value={dispositivo?.alias || ""} />
                    </FormGroup>

                    <FormGroup>
                    <Label for="tipo" >Tipo</Label>
                    <Dropdown></Dropdown>
                    <Input id="tipo" type="select" onChange={setDispositivo} name="tipo" value={dispositivo?.tipo || "hum"} >
                        <option value="hum">Humidade</option>
                        <option value="tmp">Temperatura</option>
                        <option value="gas">Gas</option>
                        <option value="pot">Generico</option>                    
                    </Input>
                    </FormGroup>

                    <FormGroup>
                    <Label for="conversao" >Conversao</Label>
                    <Input id="conversao" onChange={setDispositivo} name="conversao" value={dispositivo?.conversao || ""} />
                    </FormGroup>
                </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => props.alterar(dispositivo)}>{props.texto}</Button>
                    <Button color="secondary" onClick={props.toggle}>Cancela</Button>
                </ModalFooter>
            </Modal>
    )
}

const Dispositivo = (props) => {
    const [modal, setModal] = useState(false);
    const disp = { ...props.dispositivo}
    const toggle = () => {
        setModal(!modal);
    } 
    const [dispositivo, setDispositivo] = useReducer(formReducer, {...props.dispositivo});

    const alterar = (disp) => {
        props.alteraDispositivo(disp);
        toggle();
    }

    return (

        <tr>
            <td >
                {disp.pin}
            </td>
            <td >
               {disp.alias}
            </td>
            <td >
                {mapValues(disp.tipo)}
            </td>
            <td >
                {disp.conversao}
            </td>
            <td >
                <Button onClick={toggle} >Editar</Button>
            </td>
            <td >
                <Button onClick={() => props.deletar(disp.id)} >Deletar</Button>
            </td> 
                       
            <MeuModal dispositivo={dispositivo} alterar={alterar} toggle={toggle} setDispositivo={setDispositivo} modal={modal} texto="Alterar"/>
        </tr>
    )
}

const Dispositivos = () => {
    //const [dispositivos, setDispositivos] = useReducer(multipleReducer, []);
    const defaultDevice={pin: 0, noSensor: 'sensor1', alias: '', tipo: 'hum', conversao: 1.00}
    const [dispositivos, setDispositivos] = useState([])
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }

    const criar = async (dispositivo) => {
        await api.post('/api/sensors', dispositivo)
        reload();
    }

    const alteraDispositivo = async (dispositivo) => {
        await api.put('/api/sensors', dispositivo)
        reload();
    }

    const deletarDispositivo = async (index) => {
        await api.delete('/api/sensors/'+index)
        reload();
    }

    const reload = () => {
        api.get("/api/sensors/sensor1")
        .then(res => {
            console.log(res.data);
            setDispositivos(res.data)
        })
    }


    useEffect(() => {
        reload();
    }, [])

    

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                    <th>Pino</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Conversao</th>
                    <th>Editar</th>
                    <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {dispositivos.map((dispositivo) =>
                        <Dispositivo key={dispositivo.id} dispositivo={dispositivo} alteraDispositivo={alteraDispositivo} deletar={deletarDispositivo}/>
                    )}
                </tbody>
                <tfoot>
                <tr><td colSpan="5">
                <Button onClick={setModal} >Criar</Button>
                     </td><td>
                     
                     </td>
               </tr>
                </tfoot>
            </Table>
            <MeuModal dispositivo={defaultDevice}  modal={modal} toggle={toggle} alterar={criar} texto="Criar" />
            
        </div>
    )


}

export default Dispositivos