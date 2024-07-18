//This file contains all the clients for the different networks

import { createClient } from "polkadot-api"
import { WebSocketProvider } from "polkadot-api/ws-provider/node"

const clientwestend = createClient(WebSocketProvider("wss://westend-rpc.polkadot.io"))
const clientwestendcoretime = createClient(WebSocketProvider("wss://sys.ibp.network/coretime-westend"))


export { clientwestend, clientwestendcoretime }