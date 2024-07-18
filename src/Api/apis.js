//This file contains all the apis for the different networks

import { clientwestend, clientwestendcoretime } from "./clients.js"
import { wnd } from "@polkadot-api/descriptors"
import { wndcoretime } from "@polkadot-api/descriptors"

const westendApi = clientwestend.getTypedApi(wnd)
const westendCoretimeApi = clientwestendcoretime.getTypedApi(wndcoretime)

export { westendApi, westendCoretimeApi }