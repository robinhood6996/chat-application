export const getConversationUser = (users, loggedInUser) =>{
    return users?.find(user => user?.email !== loggedInUser)
}