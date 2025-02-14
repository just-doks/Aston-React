
export const formatEntry = (item: any) => {
    if(item.error) return item.error
    
    const {name, gender, status} = item
    const filter = [gender, status].filter(Boolean).join(" - ")

    if (name && filter) {
        return `${name} - ${filter}`;
    }

    return name || filter || "Query with empty name"
}