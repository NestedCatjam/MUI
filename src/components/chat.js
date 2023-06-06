import { useEffect, useRef, useState } from "react";
import Talk from 'talkjs';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Box } from "@mui/material";

export default function Chat({ conversationID }) {
    const {user} = useUser();
    const [height, setHeight] = useState(window.innerHeight);

    const chatboxElement = useRef();
    useEffect(() => {
        Talk.ready.then(() => {
            const me = new Talk.User({id: user.sub, name: user.nickname, email: user.email, photoUrl: user.picture});

            const session = new Talk.Session({appId: process.env.NEXT_PUBLIC_TALKJS_APP_ID, me});
            const chatbox = session.createChatbox();
            if (conversationID){ 
                const conversation = session.getOrCreateConversation(conversationID);
                conversation.setParticipant(me);

            
                chatbox.select(conversation);
            } else {
                
            }
            chatbox.mount(chatboxElement.current);
            return session.destroy;
        });
    }, [conversationID]);

    return (
    <Box id="evidenceChatBox" sx={{display:'block', float:'right', width: "20%", height: height * (3/4)}} ref={chatboxElement} >
      {/* {file && file.base64 && (file.type === 'application/pdf' || file.type === 'image/png' || file.type === 'image/jpeg') && 
      <embed src={`data:${file.type};base64,${file.base64}`} />} */}
    </Box>)
}
