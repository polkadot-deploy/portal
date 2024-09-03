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



// 'use client'

// import React, { useState } from 'react';
// import { ChevronDown, Home, LogOut, TestTube, CreditCard, Settings, MessageSquare, HelpCircle, Rocket, Book, Gamepad, Boxes, Network, FileText, MessagesSquare, Check, Wallet, X, ChevronLeft } from 'lucide-react';

// export default function Component() {
//   const [activeTab, setActiveTab] = useState('Dashboard');
//   const [expandedSection, setExpandedSection] = useState('Gaming');
//   const [isWalletConnected, setIsWalletConnected] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
//   const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

//   const tabs = [
//     { name: 'Dashboard', icon: Home },
//     { name: 'Public Testnets', icon: TestTube },
//     { name: 'Billing', icon: CreditCard },
//     { name: 'Settings', icon: Settings },
//   ];

//   const sections = [
//     { 
//       name: 'Gaming', 
//       icon: Gamepad,
//       items: ['Fast block confirmation and high TPS', 'Zero-gas and session-keys for immersive gameplay', 'Native Account Abstraction; Invisible wallets', 'Fiat on-ramps']
//     },
//     { 
//       name: 'Defi', 
//       icon: Boxes,
//       items: []
//     },
//     { 
//       name: 'Ecosystem', 
//       icon: Network,
//       items: []
//     },
//   ];

//   const wallets = [
//     { name: 'MetaMask', icon: '/placeholder.svg?height=24&width=24' },
//     { name: 'WalletConnect', icon: '/placeholder.svg?height=24&width=24' },
//     { name: 'Coinbase Wallet', icon: '/placeholder.svg?height=24&width=24' },
//   ];

//   const walletAddresses = {
//     'MetaMask': [
//       '0x1234...5678',
//       '0xabcd...efgh',
//       '0x9876...5432',
//     ],
//     'WalletConnect': [
//       '0x2345...6789',
//       '0xbcde...fghi',
//       '0x8765...4321',
//     ],
//     'Coinbase Wallet': [
//       '0x3456...7890',
//       '0xcdef...ghij',
//       '0x7654...3210',
//     ],
//   };

//   const connectWallet = (address: string) => {
//     // Simulating wallet connection
//     setTimeout(() => {
//       setIsWalletConnected(true);
//       setSelectedAddress(address);
//       setIsModalOpen(false);
//     }, 1000);
//   };

//   const disconnectWallet = () => {
//     setIsWalletConnected(false);
//     setSelectedWallet(null);
//     setSelectedAddress(null);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="bg-gray-100 text-gray-800 min-h-screen font-sans pt-4" style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 300 }}>
//       {/* Header */}
//       <header className="mx-auto max-w-7xl px-4">
//         <div className="bg-white rounded-2xl py-4 px-4 flex justify-between items-center shadow-sm">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] rounded-full flex items-center justify-center">
//               <div className="w-4 h-4 bg-white rounded-full"></div>
//             </div>
//             <span className="font-semibold text-lg text-gray-800">Polkadot</span>
//           </div>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="flex items-center space-x-2 rounded-2xl px-3 py-2 transition-colors duration-200 bg-white border border-gray-200 hover:bg-gray-50"
//           >
//             <Wallet size={16} className="text-[#E6007A]" />
//             <span className="text-gray-800">{isWalletConnected ? `Connected: ${selectedAddress}` : 'Connect Wallet'}</span>
//             <ChevronDown size={16} className="text-gray-600" />
//           </button>
//         </div>
//       </header>

//       {/* Wallet Connection Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-transparent bg-clip-text">
//                 {isWalletConnected ? 'Wallet Connected' : (selectedWallet ? `Select ${selectedWallet} Address` : 'Connect Wallet')}
//               </h2>
//               <button onClick={() => {
//                 setIsModalOpen(false);
//                 setSelectedWallet(null);
//               }} className="text-gray-500 hover:text-gray-700">
//                 <X size={24} />
//               </button>
//             </div>
//             {isWalletConnected ? (
//               <div className="py-4">
//                 <p className="text-gray-600 mb-4">Your wallet is connected.</p>
//                 <button
//                   onClick={disconnectWallet}
//                   className="w-full py-2 px-4 bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-white rounded-lg hover:opacity-90 transition-opacity"
//                 >
//                   Disconnect Wallet
//                 </button>
//               </div>
//             ) : selectedWallet ? (
//               <div className="py-4">
//                 <button
//                   onClick={() => setSelectedWallet(null)}
//                   className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
//                 >
//                   <ChevronLeft size={20} />
//                   <span>Back to wallet selection</span>
//                 </button>
//                 <p className="text-gray-600 mb-4">Select an address to connect:</p>
//                 {walletAddresses[selectedWallet].map((address) => (
//                   <button
//                     key={address}
//                     onClick={() => connectWallet(address)}
//                     className="w-full mb-2 py-2 px-4 bg-white text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
//                   >
//                     <span>{address}</span>
//                     <ChevronRight size={20} className="text-gray-400" />
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <div className="py-4">
//                 <p className="text-gray-600 mb-4">Choose a wallet to connect:</p>
//                 {wallets.map((wallet) => (
//                   <button
//                     key={wallet.name}
//                     onClick={() => setSelectedWallet(wallet.name)}
//                     className="w-full mb-2 py-2 px-4 bg-white text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
//                   >
//                     <div className="flex items-center">
//                       <img src={wallet.icon} alt={wallet.name} className="w-6 h-6 mr-2" />
//                       <span>{wallet.name}</span>
//                     </div>
//                     <ChevronRight size={20} className="text-gray-400" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Rest of the component remains unchanged */}
//       <div className="max-w-7xl mx-auto px-4 flex mt-8">
//         {/* Sidebar */}
//         <aside className="w-56 space-y-3 mr-8">
//           {tabs.map((tab) => (
//             <div
//               key={tab.name}
//               className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer relative ${
//                 activeTab === tab.name ? 'text-[#E6007A] bg-white shadow-sm' : 'text-gray-600 hover:text-[#E6007A] hover:bg-white hover:shadow-sm'
//               }`}
//               onClick={() => setActiveTab(tab.name)}
//             >
//               {activeTab === tab.name && (
//                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E6007A] to-[#6D3AEE] rounded-r-full"></div>
//               )}
//               <tab.icon size={20} />
//               <span>{tab.name}</span>
//             </div>
//           ))}
//           <div className="pt-4 space-y-3">
//             <div className="flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer text-gray-600 hover:text-[#E6007A] hover:bg-white hover:shadow-sm">
//               <MessageSquare size={20} />
//               <span>Feedback</span>
//             </div>
//             <div className="flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer text-gray-600 hover:text-[#E6007A] hover:bg-white hover:shadow-sm">
//               <HelpCircle size={20} />
//               <span>Support</span>
//             </div>
//           </div>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 space-y-8">
//           {/* Get started section */}
//           <div className="bg-white rounded-3xl p-6 shadow-sm">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-gray-50 rounded-xl p-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-2">
//                     <Rocket size={22} className="text-[#E6007A]" />
//                     <h2 className="text-xl font-semibold bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-transparent bg-clip-text" style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 400 }}>Get started</h2>
//                   </div>
//                   <p className="text-sm text-gray-600">Build with Polkadot, Kusama, or parachains</p>
//                   <div className="flex space-x-2">
//                     <div className="w-7 h-7 bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] rounded-full flex items-center justify-center text-white text-xs font-bold">P</div>
//                     <div className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold">K</div>
//                     <div className="w-7 h-7 bg-[#52D1FF] rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
//                   </div>
//                 </div>
//                 <div className="mt-4 bg-white rounded-lg p-4 shadow-inner">
//                   <button className="w-full bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-white rounded-lg py-2 flex items-center justify-center space-x-2">
//                     <Rocket size={16} />
//                     <span className="font-medium">Deploy on Polkadot</span>
//                   </button>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
//                   <div className="flex items-start space-x-4">
//                     <TestTube size={24} className="text-[#E6007A]" />
//                     <div>
//                       <h3 className="font-semibold text-gray-800">Explore Testnets</h3>
//                       <p className="text-sm text-gray-600">Fully-integrated Polkadot & Kusama testnets</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
//                   <div className="flex items-start space-x-4">
//                     <Book size={24} className="text-[#E6007A]" />
//                     <div>
//                       <h3 className="font-semibold text-gray-800">Documentation</h3>
//                       <p className="text-sm text-gray-600">Tools, tutorials, and technical support</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
//                   <div className="flex items-start space-x-4">
//                     <MessageSquare size={24} className="text-[#E6007A]" />
//                     <div>
//                       <h3 className="font-semibold text-gray-800">Help me choose</h3>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Which parachain is right for you? section */}
//           <div className="bg-white rounded-3xl p-6 shadow-sm">
//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="w-full md:w-[500px] flex flex-col justify-between">
//                 <div className="flex justify-between items-start z-30">
//                   <div className="flex flex-col gap-1">
//                     <span className="text-lg font-semibold bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-transparent bg-clip-text">Which parachain is right for you?</span>
//                     <span className="text-sm text-gray-600 font-light">
//                       Pick the parachain use case that most closely <br /> meets your needs
//                     </span>
//                   </div>
//                 </div>
//                 <div className="hidden md:flex flex-col gap-y-1 z-30 w-full mt-4">
//                   <span className="text-base text-gray-800">Not sure?</span>
//                   <span className="text-sm text-gray-600 mb-2">
//                     Our team of experts will guide you <br /> through the process
//                   </span>
//                   <button className="w-[118px] h-[40px] bg-gray-100 text-gray-800 rounded-lg flex items-center justify-center text-sm shadow-sm hover:bg-gray-200 transition-colors">
//                     Talk to us
//                   </button>
//                 </div>
//               </div>
//               <div className="w-full flex flex-col gap-y-3">
//                 {sections.map((section) => (
//                   <div key={section.name} className={`overflow-hidden transition-all ${expandedSection === section.name ? 'h-auto md:h-[194px]' : 'h-[74px]'}`}>
//                     <div 
//                       style={{
//                         boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
//                         background: "linear-gradient(279deg, rgb(249, 250, 251) 4.83%, rgb(240, 242, 245) 100%)"
//                       }}
//                       className="transition-all relative w-full h-full flex-col border-[1px] border-gray-200 rounded-2xl py-4 px-2 md:px-5 gap-y-4 flex items-start justify-center cursor-pointer"
//                       onClick={() => setExpandedSection(expandedSection === section.name ? '' : section.name)}
//                     >
//                       <div className="flex items-center justify-between gap-x-2 w-full">
//                         <div className="w-full flex items-center gap-x-2">
//                           <section.icon size={24} className="text-[#E6007A]" />
//                           <div className="flex flex-col gap-y-0 md:gap-y-1.5">
//                             <span className="font-semibold text-sm md:text-base bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-transparent bg-clip-text">{section.name}</span>
//                           </div>
//                         </div>
//                       </div>
//                       {expandedSection === section.name ? (
//                         <div className="absolute right-5 top-5 z-10">
//                           <button className="w-[75px] h-[32px] bg-white text-gray-800 rounded-lg flex items-center justify-center text-sm shadow-sm hover:bg-gray-100 transition-colors">
//                             Explore
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="cursor-pointer absolute right-5 top-6">
//                           <ChevronDown size={24} className="text-gray-400" />
//                         </div>
//                       )}
//                       {expandedSection === section.name && section.items.length > 0 && (
//                         <div className="flex flex-col gap-2 mt-4">
//                           {section.items.map((item, index) => (
//                             <div key={index} className="flex gap-2 items-center">
//                               <Check size={19} className="text-[#52D1FF]" />
//                               <h1 className="text-gray-700 text-sm font-light">{item}</h1>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex md:hidden flex-col gap-y-1 z-30 w-full mt-4">
//               <span className="text-base text-gray-800">Not sure?</span>
//               <span className="text-sm text-gray-600 mb-2">Our team of experts will guide you through the process</span>
//               <button className="w-[118px] h-[40px] bg-gray-100 text-gray-800 rounded-lg flex items-center justify-center text-sm shadow-sm hover:bg-gray-200 transition-colors">
//                 Talk to us
//               </button>
//             </div>
//           </div>

//           {/* Need more information section */}
//           <div className="bg-white rounded-xl p-6 flex items-center justify-between shadow-sm">
//             <div className="flex items-center space-x-4">
//               <FileText size={24} className="text-[#E6007A]" />
//               <span className="text-gray-800">Need more information or expert help?</span>
//             </div>
//             <div className="space-x-4">
//               <button className="bg-gray-100 text-gray-800 rounded-lg py-2 px-4 flex items-center space-x-2 shadow-sm hover:bg-gray-200 transition-colors">
//                 <Book size={16} />
//                 <span>Documentation</span>
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Footer */}
//       <footer className="bg-white mt-8 py-4 text-center text-sm text-gray-500 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4">
//           <div>Version: 3e8d2...05113</div>
//           <div className="space-x-4">
//             <a href="#" className="hover:text-gray-700">Terms of Service</a>
//             <a href="#" className="hover:text-gray-700">Privacy Policy</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
