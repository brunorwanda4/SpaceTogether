import { MessageNavConversation } from "@/components/navbar/messageNavConversation"

interface props {
    children: React.ReactNode
};

const MessagesConversationIdLayout = ({
    children
} : props) => {
  return (
    <section>
      <MessageNavConversation />
      <div className="">
        {children}
      </div>
    </section>
  )
}

export default MessagesConversationIdLayout
