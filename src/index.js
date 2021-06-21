import React from 'react';
import mqtt from 'mqtt';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { HashRouter } from 'react-router-dom';

const renderReactDom = () => {
    ReactDOM.render(<React.StrictMode><HashRouter> <App /></HashRouter> </React.StrictMode>,
        document.getElementById('root')
    )
}

const workerMQTT = () => {
    const mqtt = require('mqtt');
    const fs = require('fs');
    //const mqtt_server = "mqtt://rangecomp.com.br"; //ip do servidor mqtt
    //const mqtt_server = "rangecomp.com.br"; //ip do servidor mqtt

    const mqtt_server = "broker.emqx.io";
    const mqtt_topic = "IE309X_GERESTOQ"; //topico a ser ouvido
    const mqtt_port = 8083; // porta do servidor mqtt
    const mqtt_user = "Client"; //nome de usuario do servidor mqtt
    const mqtt_password = "IoT@954#"; // senha do servidor mqtt (client)
    const mqtt_output = "IoTDevice"; // topico no qual o dispositivo irá enviar os dados
    const mqtt_name = "IoTDevice"; //nome do dispositivo mqtt seguindo tabela IPS To P2L
    const options = {
        keepalive: 60,
        clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
            topic: mqtt_topic
        },
        //username: mqtt_user,
        host: mqtt_server,

        port: mqtt_port,
        rejectUnauthorized: false,
        //password: mqtt_password,

    };
    return mqtt.connect(`ws://${mqtt_server}:${mqtt_port}/mqtt`, options);

}


if (window.cordova) {
    document.addEventListener('deviceready', () => {

        renderReactDom();
        //handle incoming messages
        workerMQTT().on('message',function(topic, message, packet){
            window.cordova.plugins.notification.local.schedule({
                title: 'Gerestoq - ' + topic,
                text: message,
                foreground: true
            });
        });
        
    }, false);
} else {
    renderReactDom();
    workerMQTT().on('message',function(topic, message, packet){
       alert(`
            Gerestoq - ${topic},
             ${message}
            `
       );
    });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();