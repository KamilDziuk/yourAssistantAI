import ChatWindowIcones from "./ChatWindowIcones.tsx";
import chatWindowStyles from "./ChatWindow.module.css";
import iconStyle from "../Icon/Icon.module.css";

export function ChatWindowContnet(
  listeningClickQuickStartButton: string,
  customerQuestion: string,
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
        : "Hi! 👋 I'm your AI assistant. I can tell you more about Kamil – his projects, experience, and creative classNameeas. Ask me about his portfolio, technologies, what I'm currently working on, or what repositories I have on GitHub. 🚀"}
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
