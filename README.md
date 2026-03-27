
# yourAssistantAI
![presentation](https://raw.githubusercontent.com/KamilDziuk/yourAssistantAI/main/client/src/assets/video/presentation.gif)

AI Assistant – a project using Express, CORS, MongoDB, and Server-Sent Events (SSE) communication.
It also saves the conversation history to a database for future reference.

## Installation in the terminal

1. **Clone the repository:**
```bash
git clone https://github.com/KamilDziuk/yourAssistantAI.git
cd yourAssistantAI
```

2. **Install dependencies:**

In \server\src 
   ```bash
npm install express cors node-fetch dotenv mongodb eventsource-parser
```

3. **Create a `.env` file in \server\src folder:**

In the root directory, create a `.env` file:
```bash
touch .env
```
and adding in .env file: 
OPENAI_API_KEY= YOUR KEY
PORT=3002

```bash
OPENAI_API_KEY=sk-example
MONGO_URI=mongodb+srv://example_db_user:example.dcvh2ai.mongodb.net/chatbotConversations?retryWrites=true&w=majority
PORT=3002
```

Add your environment variables there, such as MongoDB connection strings or API keys.

4. **Run the server(server\src):**
```bash
 node app.js
```
*(or the appropriate entry file, if it has a different name)*

---

## Additional Feature: Custom Agent Instructions

This project includes a feature that allows you to define custom instructions for the AI agent.

- Instructions can be entered through a dedicated input field in the application - [agent-configuration](https://your-assistant-ai.onrender.com/#agent-configuration).
- These instructions specify what types of questions the agent should respond to or how it should behave.
- Once provided, the instructions are stored in the MongoDB database.
- The saved instructions are then dynamically passed to the agent during runtime.
  
This enables flexible customization of the assistant’s behavior without modifying the codebase.

## Required dependencies

The project uses the following libraries:

- `express` – HTTP server
- `cors` – handling CORS policy
- `node-fetch` – making HTTP requests
- `dotenv` – managing environment variables
- `mongodb` – working with MongoDB database
- `eventsource-parser` – parsing Server-Sent Events (SSE)

---

## Requirements

- Node.js version 18 or higher (recommended)
- Access to a MongoDB database

---
