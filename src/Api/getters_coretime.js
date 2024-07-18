//This file contains all the storage items to query parachain-related information on the relay chain

//configuration
const getConfiguration = async (api) => {
    return await api.query.Broker.Configuration.getValue()
}

//allowed renewal
const getAllowedRenewals = async (api) => {
    return await api.query.Broker.AllowedRenewals.getEntries({ at: "finalized" });
}

//allowed renewals w/params
const getAllowedRenewal = async (api, core, when) => {
    return await api.query.Broker.AllowedRenewals.getValue(core, when, { at: "finalized" });
}

//regions
const getRegions = async (api) => {
    return await api.query.Broker.Regions.getEntries({ at: "finalized" });
}

//saleinfo
const getSalesInfo = async (api) => {
    return await api.query.Broker.SaleInfo.getValue();
}

//workplan
const getWorkplan = async (api) => {
    return await api.query.Broker.Workplan.getEntries({ at: "finalized" });
}

//workload
const getWorkload = async (api) => {
    return await api.query.Broker.Workload.getEntries({ at: "finalized" });
}

//status
const getStatus = async (api) => {
    return await api.query.Broker.Status.getValue();
}

//leases
const getLeases = async (api) => {
    return await api.query.Broker.Leases.getValue();
}

export { getConfiguration, getAllowedRenewals, getAllowedRenewal, getRegions, getSalesInfo, getWorkplan, getWorkload, getStatus, getLeases }