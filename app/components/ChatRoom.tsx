import { ChatList } from "./ChatList"

export const ChatRoom = () => {
    return <>
        <div className="flex flex-col h-screen w-max max-w-lg">
            <ChatList />
            <ChatFooter />
        </div>
    </>    
}