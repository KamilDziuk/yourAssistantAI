import { useChatStyleForm } from "./chatStyleForm";
import styles from "./AgentConfiguration.module.css";
import chatWindowStyles from "../ChatWindow/ChatWindow.module.css";
import iconStyle from "../Icon/Icon.module.css";
import Icon from "../Icon/Icon";

const colorFields = [
  { id: "backgroundChat", label: "Chat background color" },
  { id: "backgroundInsideChat", label: "Background inside chat" },
  { id: "chatTextColor", label: "Chat text color" },
] as const;

export default function ChatStyleSettings() {
  const {
    chatStyle,
    updateField,
    uploadLogo,
    logoError,
    saveChatStyle,
    saveStatus,
  } = useChatStyleForm();
  const showLogo = chatStyle.chatHeaderType === "logo";

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

      <fieldset className={styles.headerChoice}>
        <legend>Chat header</legend>
        <label className={styles.colorField}>
          <input
            type="radio"
            name="chatHeaderType"
            className={styles.radioInput}
            checked={!showLogo}
            onChange={() => updateField("chatHeaderType", "text")}
          />
          Text
        </label>
        <label className={styles.colorField}>
          <input
            type="radio"
            name="chatHeaderType"
            className={styles.radioInput}
            checked={showLogo}
            onChange={() => updateField("chatHeaderType", "logo")}
          />
          Company logo
        </label>
      </fieldset>

      <label htmlFor="chatTitle" className={styles.colorField}>
        {showLogo
          ? "Logo description (shown if the logo fails to load)"
          : "Chat title"}
      </label>
      <input
        id="chatTitle"
        type="text"
        maxLength={60}
        value={chatStyle.chatTitle}
        onChange={(e) => updateField("chatTitle", e.target.value)}
      />

      {showLogo && (
        <div className={styles.colorField}>
          <input
            id="chatLogo"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className={styles.fileInput}
            onChange={(e) => uploadLogo(e.target.files?.[0])}
          />
          {chatStyle.chatLogo && (
            <img
              src={chatStyle.chatLogo}
              alt="Logo preview"
              className={chatWindowStyles.chatLogo}
            />
          )}
        </div>
      )}
      {logoError && <p style={{ color: "red" }}>{logoError}</p>}

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

      <button type="submit" disabled={showLogo && !chatStyle.chatLogo}>
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
