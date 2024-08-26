//Import Dependencies
import React, { useState, useEffect, useContext } from 'react';

//Import Context
import AccountsContext from './Context/Accounts.js'

//Import Components
import { Button, Layout, Card, Switch, Row, Col, Form, Modal, List, Avatar} from 'antd';
import Chooser from './Components/Chooser'
import GeneralInfo from './Components/GeneralInfo'
// import ConnectWallet from './Components/ConnectWalet.jsx'

//Import Api
import {deploy, projectInfo, apiCheck} from './Services/server.js'

//Import Styles
import './themes.css'; // Import the custom themes
import './styles.css'; // Import custom styles that use CSS variables

//Import Data
import runtimeData from './Data/runtimes.json'
import deploymentData from './Data/deployments.json'
import coretimeData from './Data/coretime.json'
import wallets from './Data/wallets.json'

//Import Utilities
import { generateRandomName } from './Utils/name-generator.js'
import { shortenAdd } from './Utils/shorten-address.js'

const { Header, Footer, Content } = Layout;

const App = () => {

  //Context
  const { extensions, getAccounts, accounts, selectedExtension, connectAccount, selectedAccount } = useContext(AccountsContext)

  //State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState(null); // Local state to store form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsAddressModalOpen(false);
  };

  const handleWalletClick = async (wallet) => {
    await getAccounts(wallet)
    setIsModalOpen(false);
    setIsAddressModalOpen(true);
  };

  const handleAddressSelect = (address) => {
    connectAccount(address)
    setIsAddressModalOpen(false);
  };
  
  const newName = generateRandomName()

  const onFinish = async (values) => {
    setFormData(values);
    const response = await deploy({...values, 'addr':selectedAccount.address})
  };

  const addToForm = (name, value) => {
    form.setFieldsValue({ [name] : value })
  }
  
  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [isDarkMode]);
  
  
  const [form] = Form.useForm();
  
  return (
    <Row justify="center" style={{ minHeight: '100vh' }}>
        <Layout style={{ minHeight: '100vh', backgroundColor: 'var(--background-color)' }}>
          <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'var(--text-color)', fontSize: '1.5rem' }}>PDP</div>
            <Button onClick={showModal}>
              {selectedAccount ? shortenAdd(selectedAccount.address,3,2): "Connect Wallet"}
            </Button>
          </Header>
          <Content style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Row gutter={[16, 16]} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Col xs={24} sm={24} md={24} lg={24} xl={17} xxl={17} style={{ width: '100%'}}>
                <Card title="Deploy a Parachain" style={{ backgroundColor: 'var(--component-background)', color: 'var(--text-color)' }}>
                  <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{name:newName, token:"UNIT"}}>
                    <GeneralInfo />
                    <Chooser label={"Choose your Runtime"} data={runtimeData} name={"runtime"} addToForm={addToForm}/>
                    <Chooser label={"Deployment Target"} data={deploymentData} name={"deployment"} addToForm={addToForm}/>
                    <Chooser label={"Get a Core"} data={coretimeData} name={"coretime"} addToForm={addToForm}/>
                    <Form.Item>
                      <Row justify="center">
                        <Col xs={24} md={12} lg={4}>
                          <Button htmlType="submit" block>Deploy</Button>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor: 'var(--header-footer-background)', color: 'var(--text-color)' }}>
            <Row gutter={[16, 16]} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Col>Pokladot Deployment Portal ©2024 - Built with ❤️</Col>
              <Col>
                <Switch
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
                checkedChildren="Dark"
                unCheckedChildren="Light"
                />
              </Col>
            </Row>
          </Footer>
        </Layout>
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
              {console.log(wallets[item].logo)}
              <List.Item.Meta
                title={wallets[item].name}
                // avatar={<Avatar src={<img src={wallets[item].logo} alt={wallets[item].name[0]} />} />}
              />
            </List.Item>
          )}
        />
      </Modal>

      <Modal 
        title={wallets[selectedExtension.name] ? `Select Address from ${wallets[selectedExtension.name].name}` : ""} 
        open={isAddressModalOpen} 
        onCancel={handleCancel}
        footer={null}
      >
          <List
            itemLayout="horizontal"
            dataSource={accounts}
            renderItem={address => (
              <List.Item onClick={() => handleAddressSelect(address)} style={{ cursor: 'pointer' }}>
                <Row style={{display: 'flex', justifyContent: 'space-between', width:'80%'}}>
                  <Col>{address.name}</Col>
                  <Col>{shortenAdd(address.address,3,3)}</Col>
                </Row>
              </List.Item>
            )}
          />
      </Modal>
    </Row>
  );
};

export default App;
