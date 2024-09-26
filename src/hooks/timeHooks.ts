function convertTimestampToISO(timestamp: { $date: { $numberLong: string } }): string {
    const date = new Date(parseInt(timestamp.$date.$numberLong));
    return date.toISOString();
}

// Example usage to convert the user's created_at and updated_at
const convertUserTimestamps = (user: any): User  {
    return {
        ...user,
        created_at: convertTimestampToISO(user.created_at),
        updated_at: convertTimestampToISO(user.updated_at),
        image: user.image.map((img: any) => ({
            ...img,
            created_at: convertTimestampToISO(img.created_at)
        }))
    };
}
