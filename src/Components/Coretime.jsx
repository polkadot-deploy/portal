import React, { useState, useEffect } from 'react';
import { Form, Select, Card, Col, Row } from 'antd';

const { Option } = Select;

const Coretime = () => {
  const [clickedCard, setClickedCard] = useState(null)
  
  const handleCardClick = (cardName) => {
    console.log("CLICKED", cardName)
    setClickedCard((prev) => (prev === cardName ? null : cardName)); // Toggle click state
  };

  return (
      <Form.Item label="Get a Core">
        <Card  style={{ backgroundColor: 'var(--component-background)' }}>
          <Row gutter={[16, 16]} style={{ width: '100%', display: 'flex', justifyContent: 'left' }}>
            <Col>
              <Card onClick={() => handleCardClick('OnDemand')} className={clickedCard === 'OnDemand' ? 'clicked-card' : ''}>
                OnDemand Deployment
              </Card>
            </Col>
            <Col>
              <Card onClick={() => handleCardClick('bulk')} className={clickedCard === 'bulk' ? 'clicked-card' : ''}>
                Bulk
              </Card>
            </Col>
            <Col>
              <Card onClick={() => handleCardClick('lastic')} className={clickedCard === 'lastic' ? 'clicked-card' : ''}>
                Lastic
              </Card>
            </Col>
            <Col>
              <Card onClick={() => handleCardClick('regionx')} className={clickedCard === 'regionx' ? 'clicked-card' : ''}>
                RegionX
              </Card>
            </Col>
          </Row>
        </Card>
      </Form.Item>
  );
};

export default Coretime;