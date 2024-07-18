//This file contains all the storage items to query parachain-related information on the relay chain

//Get all Parachains
//This outputs a list of all the connected parachains. Shouldn't matter for Coretime, as everything will be a parathread.
const getAllParas = async (api) => {
    return await api.query.Paras.Parachains.getValue();
}

//Get all Parachains Lifecycles
//This outputs a list of all the registered parachains, independently of them being parachains or parathreads.
const getAllParasLifecycle = async (api) => {
    return await api.query.Paras.ParaLifecycles.getEntries({at: "finalized"});
}

//Get all registrar information on Parachains
//This outputs the paraID, together with who is the manager, the deposit, and if the parachain is locked or not
const getAllParasRegInfo = async (api) => {
    return await api.query.Registrar.Paras.getEntries({at: "finalized"});
}

//Get Next free paraID
//This otputs the next free paraID on the list
const getNextFreeParaId = async (api) => {
    return await api.query.Registrar.NextFreeParaId.getValue();
}

//Get all code Hashes
//This outputs the latest codehash for each parachain.
const getAllCodeHash = async (api) => {
    return await api.query.Paras.CurrentCodeHash.getEntries({at: "finalized" })
}

//Get Code Hash
//This outputs the codeHash for a specific paraID
const getCodeHash = async (api,id) => {
    return await api.query.Paras.CurrentCodeHash.getValue(id, {at: "finalized" })
}

//Get Config
//This outputs the active config for the relay chain. Several information for coretime can be found here.
const getActiveConfig = async (api) => {
    return await api.query.Configuration.ActiveConfig.getValue();
}


export { getAllParas, getAllParasLifecycle, getAllParasRegInfo, getNextFreeParaId, getAllCodeHash, getCodeHash, getActiveConfig }