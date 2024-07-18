import React, { useState, useEffect, useContext } from 'react';
import { Input, Form, Select, Row, Col, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

//Context
import RelayDataContext from './../Context/RelayData'

const GeneralInfo = () => {
    const { nextFreeParaId } = useContext(RelayDataContext)
    const [paraId, setParaId] = useState("")

    useEffect(()=>{
        setParaId(nextFreeParaId)
    },[nextFreeParaId])

    const createLabel = (text, tooltip) => (
        <span>
          {text}&nbsp;
          <Tooltip title={tooltip}>
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        </span>
      );
    
    return (
      <Row gutter={[16, 16]} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Col>
              <Form.Item label="Parachain Name" name="name" rules={[{ required: true, message: 'A project name, choose you must.' }]}>
                  <Input />
              </Form.Item>
          </Col>
          <Col>
              <Form.Item label="Token Name" name='token' rules={[{ required: true, message: 'A project token, choose you must.' }]}>
                  <Input />
              </Form.Item>
          </Col>
          <Col>
              <Form.Item label={createLabel("Para ID", "Next available paraID on the relay chain. Self-populated value.")}>
                <Input readOnly value={nextFreeParaId ? nextFreeParaId : "Fetching"} />
              </Form.Item>
          </Col>
      </Row>
    );
};

export default GeneralInfo;