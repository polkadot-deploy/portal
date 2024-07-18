import React, { useState, useEffect } from 'react';
import { Form, Select, Card, Col, Row } from 'antd';

const { Option } = Select;

const DeploymentTargets = () => {
  const [clickedCard, setClickedCard] = useState(null)
  
  const handleCardClick = (cardName) => {
    console.log("CLICKED", cardName)
    setClickedCard((prev) => (prev === cardName ? null : cardName)); // Toggle click state
  };
  
  return (
    <Form.Item label="Deployment Targets">
      <Card  style={{ backgroundColor: 'var(--component-background)' }}>
        <Row gutter={[16, 16]} style={{ width: '100%', display: 'flex', justifyContent: 'left' }}>
          <Col>
            <Card onClick={() => handleCardClick('any')} className={clickedCard === 'any' ? 'clicked-card' : ''}>
              Any target
            </Card>
          </Col>
          <Col>
            <Card onClick={() => handleCardClick('ibp')} className={clickedCard === 'ibp' ? 'clicked-card' : ''}>
              IBP Consortia
            </Card>
          </Col>
          <Col>
            <Card onClick={() => handleCardClick('tanssi')} className={clickedCard === 'tanssi' ? 'clicked-card' : ''}>
              Tanssi
            </Card>
          </Col>
        </Row>
      </Card>
    </Form.Item>
  );
};

export default DeploymentTargets;