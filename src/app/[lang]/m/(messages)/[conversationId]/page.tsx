import { MessagesForm } from "@/components/forms/messages/messagesForm"
import { MessageNavConversation } from "@/components/navbar/messageNavConversation"
import { MyImage } from "@/components/style/myImage"
import { Locale } from "@/i18n"

interface props {
    params : {lang : Locale , conversationId : string}
}

const MessagesConversationIdPage = ({
    params : {lang , conversationId}
} : props) => {
  return (
    <div className=" max-h-[91vh] min-h-[91vh] h-[91vh]">
      <div className=" overflow-y-auto flex-col flex flex-1 max-h-[75vh] px-2 messages-aside-bar">
         <div  className=" min-h-screen">
          <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <MyImage
                    className=" size-10"
                    classname=" rounded-full"
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
            <div className="chat chat-end">
              
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <MyImage
                  className=" size-10"
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
         </div>
         <div  className=" min-h-screen"/>
      </div>
      <MessagesForm />
    </div>
  )
}

export default MessagesConversationIdPage
