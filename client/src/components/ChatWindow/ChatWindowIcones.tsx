import { Suspense } from "react";
import Icon from "../Icon/Icon";
import ChatWindowIcones from "./ChatWindowIcones.tsx";
import chatWindowStyles from "./ChatWindow.module.css";
import iconStyle from "../Icon/Icon.module.css";


export default function ChatWindowContent({
  userStyleElement,
  iconStyleElement,
  userTextElement,
  iconName,
  children,
}: {
  userStyleElement: string;
  iconStyleElement: string;
  userTextElement?: string;
  iconName: string;
  children: any;
}) {
  return (
    <div className={userStyleElement}>
      <Suspense
        fallback={
<>
        <ChatWindowIcones
          userStyleElement={chatWindowStyles.responseText}
          userTextElement={chatWindowStyles.userTextElement}
          iconStyleElement={`${iconStyle.icon} ${iconStyle.muveAvatarEfect} `}
          iconName={"ri:RiRobot3Line"}
        >
        ...
        </ChatWindowIcones>
          </>
        }
      >
        <Icon iconStyle={iconStyleElement} iconName={iconName} />
        <div className={userTextElement}>{children}</div>
      </Suspense>
    </div>
  );
}
