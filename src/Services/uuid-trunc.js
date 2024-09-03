export default function truncateUUID(uuid) {
    if (uuid.length <= 12) {
        return uuid; 
    }
    const firstPart = uuid.substring(0, 8); 
    const lastPart = uuid.substring(uuid.length - 4); 
    return `${firstPart}...${lastPart}`;
}
