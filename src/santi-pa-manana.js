import React, { useState } from 'react';
import { Button, Modal, List, Avatar, message } from 'antd';

// Sample data for wallet extensions
const walletExtensions = [
  { name: 'Polkadot.js', description: 'Polkadot.js browser extension', logo: 'https://polkadot.network/favicon.ico' },
  { name: 'MetaMask', description: 'Ethereum and other blockchain networks', logo: 'https://metamask.io/images/favicon-32x32.png' },
  { name: 'Talisman', description: 'A wallet for Polkadot and Kusama', logo: 'https://talisman.xyz/favicon.ico' },
  { name: 'SubWallet', description: 'Substrate-based wallet', logo: 'https://subwallet.app/favicon.ico' },
];

const ConnectWallet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
    // Simulate fetching addresses for the selected wallet
    setAvailableAddresses([
      `${wallet.name} Address 1`,
      `${wallet.name} Address 2`,
      `${wallet.name} Address 3`
    ]);
    setIsModalOpen(false);
    setIsAddressModalOpen(true);
    message.info(`Selected wallet: ${wallet.name}`);
  };

  const handleAddressSelect = (address) => {
    message.success(`Selected address: ${address}`);
    setIsAddressModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Connect Wallet
      </Button>
      <Modal 
        title="Connect Your Wallet" 
        open={isModalOpen} 
        onCancel={handleCancel}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={walletExtensions}
          renderItem={item => (
            <List.Item onClick={() => handleWalletClick(item)} style={{ cursor: 'pointer' }}>
              <List.Item.Meta
                avatar={<Avatar src={item.logo} />}
                title={item.name}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Modal>

      <Modal 
        title={`Select Address from ${selectedWallet?.name}`} 
        open={isAddressModalOpen} 
        onCancel={handleCancel}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={availableAddresses}
          renderItem={address => (
            <List.Item onClick={() => handleAddressSelect(address)} style={{ cursor: 'pointer' }}>
              {address}
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default ConnectWallet;
