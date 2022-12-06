import { useSelector } from "react-redux";
import {  useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import gravatarUrl from 'gravatar-url';
import ChatItem from "./ChatItem";
import Error from '../ui/Error';
import { getConversationUser } from "../../utils/ulits";
import moment from 'moment'
import { Link } from "react-router-dom";
export default function ChatItems() {
    const user = useSelector(state => state.auth.user);
    const {email} = user || {};
    const {data:conversations, isError, isLoading, error} = useGetConversationsQuery(email);
    
    let content;
    if(isLoading){
      content =  <li>Loading...</li>
    }else if(!isLoading && isError){
        content = <Error message={error}/>
    }else if(!isLoading && !isError && conversations.length === 0){
        content = <li>No conversation found!</li>
    }else if(!isLoading && !isError && conversations.length > 0){
        content =  conversations.map(conversation => {
                   
                    const {id, message, timestamp, users} = conversation;
                     const {name, email: partnerEmail} = getConversationUser(users, email);
                    return <li key={id}> 
                    <Link to={`/inbox/${id}`}>
                    <ChatItem
                    avatar={gravatarUrl(partnerEmail, {size: 80})}
                    name={name}
                    lastMessage={message}
                    lastTime={moment(timestamp).fromNow()}
                />
                    </Link>
                 </li>
                })
               }
    return (
        <ul>
            {content}
        </ul>
    );
}
