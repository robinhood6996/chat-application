// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import Error from '../../ui/Error';
import { useSelector } from "react-redux";


export default function ChatBody() {
    const {id} = useParams();
    const {data:messages, isLoading, isError, error} = useGetMessagesQuery(id);
    const {user} = useSelector(state => state.auth) || {};
    const myEmail = {user} || {}
   
   let content;
   if(isLoading){
    content = 'Loading...'
   }else if(!isLoading && isError){
    content = <Error message={error}/>
   }else if(!isLoading && !isError && messages.length === 0){
    content = <h3>No messages found!</h3>
   }else if(!isLoading && !isError && messages.length > 0){
    const partnerMessages = messages.find(message => message.sender.email !== myEmail);
    content = (<>
                <ChatHead
                   message={partnerMessages}
                />
                <Messages messages={messages} />
                <Options info={messages[0]}/>
    </>)
   }
    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
                {content}
                {/* <Blank /> */}
            </div>
        </div>
    );
}
