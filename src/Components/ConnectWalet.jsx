//Import Dependencies
import React, { useState, useEffect, useContext } from 'react';

//Import Context
import AccountsContext from './../Context/Accounts.js'

//Import Components
import { Button, Layout, Card, Switch, Row, Col, Form, Modal, List, Avatar} from 'antd';

//Import Styles
// import './themes.css'; // Import the custom themes
// import './styles.css'; // Import custom styles that use CSS variables

const ConnectWallet = ({isModalOpen, setIsModalOpen}) => {
  //Context
  const { extensions, getAccounts, accounts, connectAccount } = useContext(AccountsContext)

  //State
//   const [isModalOpen, setIsModalOpen] = useState(isModalOpen);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [availableAddresses, setAvailableAddresses] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsAddressModalOpen(false);
  };

  const handleWalletClick = async (wallet) => {
    setSelectedWallet(wallet);
    await getAccounts(wallet)

    setAvailableAddresses(accounts);
    setIsModalOpen(false);
    setIsAddressModalOpen(true);
  };

  const handleAddressSelect = (address) => {
    connectAccount(address)
    setIsAddressModalOpen(false);
  };  
  
  
  return (
    <>
        {/*Wallets Modal*/}
        <Modal 
        title="Connect Your Wallet" 
        open={isModalOpen} 
        onCancel={handleCancel}
        footer={null} // Hides default OK and Cancel buttons
      >
        <List
          itemLayout="horizontal"
          dataSource={extensions}
          renderItem={item => (
            <List.Item onClick={() => handleWalletClick(item)} style={{ cursor: 'pointer' }}>
              <List.Item.Meta
                title={item}
                // avatar={<Avatar src={item.logo} />}
              />
            </List.Item>
          )}
        />
      </Modal>
      {/*Adresses Modal*/}
      <Modal 
        title={`Select Address from ${selectedWallet}`} 
        open={isAddressModalOpen} 
        onCancel={handleCancel}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={availableAddresses}
          renderItem={address => (
            <List.Item onClick={() => handleAddressSelect(address)} style={{ cursor: 'pointer' }}>
              {address.name}
              {address.address}
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default ConnectWallet;
