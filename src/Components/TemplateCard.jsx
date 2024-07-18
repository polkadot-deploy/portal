import React from 'react';
import { Card, Badge } from 'antd';

const TemplateCard = ({ handleCardClick, clickedCard, id, name, audited, use }) => {

  return (
    <>
      {
        audited || !use ?
        <Badge.Ribbon text={!use ? "Soon" : "Audited"} color={!use ? '': 'green'}>
          <Card 
            onClick={use ? () => handleCardClick(id) : null} 
            className={clickedCard === id ? 'clicked-card' : ''}
            style={{ height: '80px', overflow: 'hidden' }}
          >
            <div style={{ height: 'calc(100% - 5px)', overflow: 'auto' }}>
              {name}
            </div>
          </Card>
        </Badge.Ribbon>
        :
        <Card 
          onClick={use ? () => handleCardClick(id) : null}
          className={clickedCard === id ? 'clicked-card' : ''}
          style={{ height: '80px', overflow: 'hidden' }}
        >
          <div style={{ height: 'calc(100% - 5px)', overflow: 'auto' }}>
              {name}
          </div>
        </Card>
      }
    </>
  );
};

export default TemplateCard;