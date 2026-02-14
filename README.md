
# yourAssistantAI
![presentation](https://raw.githubusercontent.com/KamilDziuk/yourAssistantAI/main/client/src/assets/video/presentation.gif)

AI Assistant – a project using Express, CORS, MongoDB, and Server-Sent Events (SSE) communication.
It also saves the conversation history to a database for future reference.

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/KamilDziuk/yourAssistantAI.git
cd yourAssistantAI
```

2. **Install dependencies:**

In \server\src install
```bash
npm install express cors node-fetch dotenv mongodb eventsource-parser
```

3. **Create a `.env` file in \server\src folder:**

In the root directory, create a `.env` file:
```bash
touch .env
```
and adding OPENAI_API_KEY= YOUR KEY
PORT=3002

Add your environment variables there, such as MongoDB connection strings or API keys.

4. **Run the server:**
```bash
 node server.js
```
*(or the appropriate entry file, if it has a different name)*

---

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
