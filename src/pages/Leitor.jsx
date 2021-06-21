import React, {useState} from 'react';
import useSound from 'use-sound';
import QrReader from 'react-qr-reader'
import boopSfx from '../resources/stories_sounds_boop.mp3';
import { Modal, ModalBody } from 'reactstrap';
import api from '../utils/api';
 
const Leitor = () => {
  const [result, setResult] = useState()
  const [modal, setModal] = useState(false);
  const [play] = useSound(boopSfx);

  
  const handleScan = async data => {
    if (data) {
      play();
      setResult(data);
      setModal(true);
      await api.post('/api/qrcode', data)
    }
  }
  const handleError = err => {
    console.error(err)
  }

  const toggle = () => {
      setResult(null);
      setModal(!modal);

  }

    return (
      <div>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '20%' }}
        />
        <p>{ !result? "Tentando Ler": ""}</p>
        <Modal isOpen={modal} toggle={toggle}><ModalBody>
          <div>
          {result}
            </div>
          </ModalBody></Modal>
      </div>
    )
  
}

export default Leitor;