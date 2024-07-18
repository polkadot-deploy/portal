//This files contains the queries of different constants on the coretime chain that are important for the parachain lifecycle.
//maxLeasedCores
//maxReservedCores
//timeslicePeriod

//Get Timeslice
//This outputs the amount of blocks that consitute a timeslice.

const getTimeslice = async (api) => {
    return await api.constants.Broker.TimeslicePeriod()
}

export { getTimeslice }
