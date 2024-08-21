import { MessagesMenu } from "@/components/menu/messagesAside";
import { Locale } from "@/i18n";

interface props {
    children: React.ReactNode;
    params : {lang : Locale}
}
const MessagesLayout = ({
    children , params : {lang}
} : props) => {
  return (
    <section className=" pt-12">
      <MessagesMenu
       lang={lang}
      >
        {children}
      </MessagesMenu>
    </section>
  )
}

export default MessagesLayout
