//This files contains the queries of different constants on the relay chain that are important for the parachain lifecycle.

//Get onDemand default traffic value
//This is the minimun value 
const trafficDefaultValue = async (api) => {
    return await api.constants.onDemandAssignmentProvider.TrafficDefaultValue()
}

//Get Para Registration fee
const paraRegistrationFee = async (api) => {
    return await api.constants.Registrar.ParaDeposit()
}

export { trafficDefaultValue, paraRegistrationFee }