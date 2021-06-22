import React, { useState, useReducer, useEffect } from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Dropdown, Table } from 'reactstrap';
import api from '../utils/api';
import formReducer from '../utils/forms';

const mapValues = (val) => {
    return {
        "hum": "Umidade",
        "tmp": "Temperatura",
        "gas": "Gas",
        "pot": "Generico"
    }[val]

}

const MeuModal = (props) => {
    const [dispositivo, setDispositivo] = useReducer(formReducer, { ...props.dispositivo });
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
                        <Input id="tipo" type="select" onChange={setDispositivo} name="tipo" value={dispositivo?.tipo || "hum"} >
                            <option value="hum">Umidade</option>
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
    const disp = { ...props.dispositivo }
    const toggle = () => {
        setModal(!modal);
    }
    const [dispositivo, setDispositivo] = useReducer(formReducer, { ...props.dispositivo });

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

            <MeuModal dispositivo={dispositivo} alterar={alterar} toggle={toggle} setDispositivo={setDispositivo} modal={modal} texto="Alterar" />
        </tr>
    )
}

const Dispositivos = () => {
    //const [dispositivos, setDispositivos] = useReducer(multipleReducer, []);
    const defaultDevice = { pin: 0, alias: '', tipo: 'hum', conversao: 1.00 }
    const [dispositivos, setDispositivos] = useState([])
    const [modal, setModal] = useState(false);
    const [sensorId, setSensorId] = useState(null);
    const [sensors, setSensors] = useState([]);
    const [newSensor, setNewSensor] = useState(null)
    const toggle = () => {
        setModal(!modal);
    }

    const criar = async (dispositivo) => {
        dispositivo.noSensor = sensorId;
        await api.post('/api/sensors', dispositivo)
        reload();
        toggle();
    }

    const alteraDispositivo = async (dispositivo) => {
        await api.put('/api/sensors', dispositivo)
        reload();
    }

    const deletarDispositivo = async (index) => {
        await api.delete('/api/sensors/' + index)
        reload();
    }

    const reload = (sensor) => {
        const sensorValue = sensor ? sensor : sensorId;
        api.get("/api/sensors/" + sensorValue)
            .then(res => {
                console.log(res.data);
                setDispositivos(res.data)
            })
    }

    const getSensors = () => {
        api.get("/api/registered/sensors")
            .then(res => {
                console.log(res.data)
                setSensors(res.data);
                setSensorId(res.data[0]?.no_sensor)
                reload(res.data[0]?.no_sensor)
            })
    }

    const changeSensorId = (event) => {
        console.log(event.target)
        setSensorId(event.target.value);
        reload(event.target.value);
    }

    const preencheSensor = event => {
        event.preventDefault();
        setNewSensor(event.target.value)
    }

    const criaSensor = async (event) => {
        event.preventDefault();
        await api.post('/api/registered/sensors', {newSensor})
        setNewSensor(null)
        getSensors();
    }


    useEffect(() => {
        getSensors();
    }, [])



    return (
        <div>
            <div>
                <FormGroup>
                    <label for="sensorId" >Escolha o sensor: </label>
                    <select style={{ padding: "10px", width: "60%", marginLeft: "30px"}} id="sensorId" name="sensorId" onChange={changeSensorId} >
                        {sensors.map(sens =>
                            <option key={sens.no_sensor} value={sens.no_sensor}>{sens.no_sensor}</option>
                        )}

                    </select>
                </FormGroup>
                <FormGroup>
                    <label for="new_sensor" >Adicione um sensor</label>
                    <input style={{ padding: "10px", width: "30%", marginLeft: "14px", marginRight: "14px"}} id="new_sensor" type="text" onChange={preencheSensor} value={newSensor} />
                    <Button onClick={criaSensor} >Cria Sensor</Button>
                </FormGroup>
            </div>
            <center>
                <br />
                <h2>Medidas para o {sensorId}</h2>
                <br />
                <hr />
            </center>
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
                        <Dispositivo key={dispositivo.id} dispositivo={dispositivo} alteraDispositivo={alteraDispositivo} deletar={deletarDispositivo} />
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
            <MeuModal dispositivo={defaultDevice} modal={modal} toggle={toggle} alterar={criar} texto="Criar" />

        </div>
    )


}

export default Dispositivos