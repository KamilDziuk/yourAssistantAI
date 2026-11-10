import ChatWindowIcones from "./ChatWindowIcones.tsx";
import chatWindowStyles from "./ChatWindow.module.css";
import iconStyle from "../Icon/Icon.module.css";

export function ChatWindowContnet(
  listeningClickQuickStartButton: string,
  customerQuestion: string,
  contentQuestion: string,
  reschat: any
) {
  return [
    <ChatWindowIcones
      userStyleElement={chatWindowStyles.question}
      userTextElement={chatWindowStyles.userTextElement}
      iconStyleElement={`${iconStyle.icon} ${iconStyle.muveAvatarEfect} `}
      iconName={"lu:LuUserRound"}
    >
      {!listeningClickQuickStartButton
        ? customerQuestion
        : contentQuestion}
    </ChatWindowIcones>,
    <ChatWindowIcones
      userStyleElement={chatWindowStyles.responseText}
      userTextElement={chatWindowStyles.userTextElement}
      iconStyleElement={`${iconStyle.icon} ${iconStyle.muveAvatarEfect} `}
      iconName={"ri:RiRobot3Line"}
    >
      {reschat}
    </ChatWindowIcones>,
  ];
}
