import mongoose from "mongoose";

const ChatStyle = mongoose.model("ChatStyle", {
  key: String,
  backgroundChat: String,
  backgroundInsideChat: String,
  chatTextColor: String,
  chatWelcomeText: String,
});

export default ChatStyle;
