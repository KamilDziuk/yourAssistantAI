import { useChatStyleForm, type ChatStyleField } from "./chatStyleForm";
import styles from "./AgentConfiguration.module.css";
import iconStyle from "../Icon/Icon.module.css";
import Icon from "../Icon/Icon";

const colorFields: { id: ChatStyleField; label: string }[] = [
  { id: "backgroundChat", label: "Chat background color" },
  { id: "backgroundInsideChat", label: "Background inside chat" },
  { id: "chatTextColor", label: "Chat text color" },
];

export default function ChatStyleSettings() {
  const { chatStyle, updateField, saveChatStyle, saveStatus } =
    useChatStyleForm();

  return (
    <form className={styles.from} onSubmit={saveChatStyle}>
      {colorFields.map(({ id, label }) => (
        <label key={id} htmlFor={id} className={styles.colorField}>
          <input
            id={id}
            type="color"
            className={styles.colorInput}
            value={chatStyle[id]}
            onChange={(e) => updateField(id, e.target.value)}
          />
          {label}
        </label>
      ))}

      <label htmlFor="chatTitle" className={styles.colorField}>
        Chat title
      </label>
      <input
        id="chatTitle"
        type="text"
        maxLength={60}
        value={chatStyle.chatTitle}
        onChange={(e) => updateField("chatTitle", e.target.value)}
      />

      <label htmlFor="chatWelcomeText" className={styles.colorField}>
        Welcome text
      </label>
      <textarea
        id="chatWelcomeText"
        className={styles.welcomeText}
        maxLength={500}
        value={chatStyle.chatWelcomeText}
        onChange={(e) => updateField("chatWelcomeText", e.target.value)}
      ></textarea>

      <button type="submit">
        <Icon iconStyle={iconStyle.sendAsk} iconName="fi:FiSend" />
      </button>

      {saveStatus === "saved" && (
        <p style={{ color: "green" }}>Chat style was saved</p>
      )}
      {saveStatus === "error" && (
        <p style={{ color: "red" }}>An error occurred, please try again</p>
      )}
    </form>
  );
}
