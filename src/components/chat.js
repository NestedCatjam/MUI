import { useEffect, useRef } from "react";
import Talk from 'talkjs';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Chat({ conversationID }) {
    const {user} = useUser();

    const chatboxElement = useRef();
    useEffect(() => {
        Talk.ready.then(() => {
            const me = new Talk.User({name: user.nickname, email: user.email, photoUrl: user.picture});
            const session = new Talk.Session({me});
            const conversation = session.getOrCreateConversation(conversationID);
            conversation.setParticipant(me);

            const chatbox = session.createChatbox();
            chatbox.select(conversation);
            chatbox.mount(chatboxElement.current);
            return session.destroy;
        });
    }, []);

    return <div ref={chatboxElement} />;
}