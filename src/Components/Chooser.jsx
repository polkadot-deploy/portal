import React, { useState, useEffect } from 'react';
import { Form, Select, Card, Col, Row } from 'antd';
import TemplateCard from './TemplateCard'

const Chooser = ({name, label, data, addToForm}) => {
  const [clickedCard, setClickedCard] = useState(null)
  
  const handleCardClick = (cardName) => {
    setClickedCard((prev) => (prev === cardName ? null : cardName));
    if (clickedCard === cardName){
      addToForm(name, null)
    }else {
      addToForm(name, cardName)
    }
  };

  return (
      <Form.Item label={label} name={name} rules={[{ required: true, message: "An option, you must choose, young Para-wan."}]}>
        <Card  style={{ backgroundColor: 'var(--component-background)' }}>
          <Row gutter={[16, 16]} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            {data.map(runtime => {
              return (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} key={runtime.id}>
                  <TemplateCard {...runtime} handleCardClick={handleCardClick} clickedCard={clickedCard} />
                </Col>
              )
            })}
          </Row>
        </Card>
      </Form.Item>
  );
};

export default Chooser;