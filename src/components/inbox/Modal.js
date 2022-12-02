import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conversationsApi, useAddConversationMutation, useUpdateConversationMutation } from "../../features/conversations/conversationsApi";
import { useGetUserQuery } from "../../features/users/usersApi";
import { isValidEmail } from "../../utils/ulits";
import Error from "../ui/Error";

export default function Modal({ open, control }) {
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const[userCheck, setUserCheck] = useState(false);
    const [conversation, setConversation] = useState(undefined);
     const {user} = useSelector(state => state.auth) || {};
    const {email: myEmail} = user || {};
    const dispatch = useDispatch();
    const {data: participant} = useGetUserQuery(to, {skip: !userCheck});
    const [addConversation,  {data: addConversationSuccess}] = useAddConversationMutation();
    const [editConversation, {data: editConversationSuccess}] = useUpdateConversationMutation()
   

    const debounceHandler = (fn, delay) => {
        let timeOutId;
          return (...args) => {
          clearTimeout(timeOutId)
          timeOutId = setTimeout(() => {
                  fn(...args)
               }, delay)
          }
    }
    const doSearch = (value) => {

         if(isValidEmail(value)){
            setTo(value);
            setUserCheck(true);
         }
         
    }
    const handleSearch = debounceHandler(doSearch, 500)

    useEffect(() => {
         if(participant?.length > 0  && myEmail && participant[0]?.email !== myEmail ){
               dispatch(conversationsApi.endpoints.getConversation.initiate({
                email: myEmail,
                partnerEmail: to
               })).unwrap().then(data => {
                setConversation(data)
               }).catch(err => {

               })
         }
    },[participant, myEmail, dispatch, to]);

    useEffect(() => {
        if(addConversationSuccess || editConversationSuccess){
            control()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[addConversationSuccess,editConversationSuccess ])


    const handleSubmit = (e) => {
         e.preventDefault();
         if(conversation !== undefined && conversation.length > 0){
            //edit conversation
            editConversation({
                id: conversation[0]?.id,
                sender: myEmail,
                data: {
                    participants: `${myEmail}-${participant[0]?.email}`,
                    users: [user , participant[0]],
                    message,
                    timestamp: new Date().getTime()
                }
            })
         }else if(conversation !== undefined && conversation.length === 0){
            //add conversation
            addConversation({
                    sender: myEmail,
                    data: {
                        participants: `${myEmail}-${participant[0]?.email}`,
                        users: [user , participant[0]],
                        message,
                        timestamp: new Date().getTime()
                    }
                })
         }
         console.log('form submitted')
    }
    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Send message
                    </h2>
                    <form className="mt-8 space-y-6" method="POST" onSubmit={(e) => handleSubmit(e)}>
                      
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    To
                                </label>
                                <input
                                    id="to"
                                    name="to"
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Send to"
                                    onChange={(e) => handleSearch(e.target.value)}

                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    type="message"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Message"
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                                disabled={conversation === undefined || (participant?.length > 0 && participant[0].email === myEmail)}
                            >
                                Send Message
                            </button>
                        </div>

                        {participant?.length === 0 && <Error message={`Email address is not valid!`}/>}
                        {participant?.length > 0 && participant[0]?.email === myEmail && <Error message={`You cannot send message to yourself!`}/>}
                    </form>
                </div>
            </>
        )
    );
}
