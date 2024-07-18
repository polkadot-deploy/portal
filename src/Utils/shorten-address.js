export const shortenAdd = (add, beg, end) =>{
    const first = add.slice(0,beg)
    const last = add.slice(-end)
    return `${first}...${last}`
}