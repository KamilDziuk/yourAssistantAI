// import Button from "../Button/Button";
import { motion as Motion } from "framer-motion";
import { useMenuBehaviorAfterSending } from "./formBehavior";
import formStyle from "../ChatWindow/ChatWindow.module.css";
import iconStyle from "../Icon/Icon.module.css";
import Icon from "../Icon/Icon";
export default function ConfigurationSettings() {
  //Variables from functions menuBehaviorAfterSending
  const {
    successfulSending,
    sendingError,
    sendData,
    clientGuidelines,
    setClientGuidelines,
  } = useMenuBehaviorAfterSending();
  return (
    <>
      {successfulSending ? (
        <Motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className={formStyle.from}
          onSubmit={sendData}
        >
          <textarea
            id="clientGuidelines"
            name="clientGuidelines"
            className={formStyle.input}
            placeholder="Example of commands for an AI agent:

              - Hello, Tom! In this chat, you'll see personalized tips.
              - Only answer questions related to Exmaple's Company."
            value={clientGuidelines}
            onChange={(e) => setClientGuidelines(e.target.value)}
          ></textarea>

          <button type="submit" className={`${formStyle.input}`}>
            <Icon iconStyle={iconStyle.sendAsk} iconName="fi:FiSend" />
          </button>
        </Motion.form>
      ) : (
        <form className={formStyle.from}>
          {!sendingError ? (
            <p style={{ color: "green" }}>
              Instructions to the assistant were successfully transmitted
            </p> //If the sending is successful, display
          ) : (
            <p style={{ color: "red" }}>An error occurred, please try again</p> //If sending fails, display
          )}
        </form>
      )}
    </>
  );
}
