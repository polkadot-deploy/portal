//This file contains all the storage items to subscribe to parachain-related information on the relay chain

//Subscribe to all para Heads
//This outputs a subscription to all paraHeads
const subAllParaHeads = async (api) => {
    return await api.query.Paras.Heads.watchValue("finalized")
}

// Subscribe to the para head
// This outputs a subscription to the head of a specific paraID
const subParaHead = async (api,id) => {
    return await api.query.Paras.Heads.watchValue(id, "finalized")
}


export { subAllParaHeads, subParaHead }