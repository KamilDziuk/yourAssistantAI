
# yourAssistantAI
![presentation](https://raw.githubusercontent.com/KamilDziuk/yourAssistantAI/main/client/src/assets/video/presentation.gif)

AI Assistant platform built with:

- React + TypeScript
- Express.js
- MongoDB
- OpenAI API
- AWS Lambda
- SST
- CloudFront
- GitHub Actions CI/CD

The assistant can answer questions about portfolio projects, technologies, GitHub repositories, and dynamically configurable agent instructions.



# Features

- AI chat assistant powered by OpenAI
- MongoDB conversation history storage
- Dynamic AI agent configuration
- Protected admin configuration endpoint
- GitHub API integration
- AWS production deployment with SST
- CloudFront CDN distribution
- HTTPS custom domain support
- GitHub Actions CI/CD pipeline
- Automated dependency monitoring with Dependabot
- Rate limiting and request validation
- Serverless backend using AWS Lambda

---

# Tech Stack

## Frontend
- React
- TypeScript
- Vite

## Backend
- Express.js
- MongoDB
- OpenAI API

## Infrastructure
- SST
- AWS Lambda
- CloudFront
- ACM
- Cloudflare DNS

## DevOps
- GitHub Actions
- Dependabot

---

# Installation

##  Clone repository

```bash
git clone https://github.com/KamilDziuk/yourAssistantAI.git
cd yourAssistantAI
````

---

# Install dependencies

## Client

```bash
cd client
npm install
```

## Server

```bash
cd ../server
npm install
```

---

# Environment variables

Create:

```bash
server/.env
```

Example:

```env
OPENAI_API_KEY=sk-example
MONGO_URI=mongodb+srv://example.mongodb.net/chatbot
SECRET_TOKEN=my-secret-token
```

---

# Run development environment

## Frontend

```bash
cd client
npm run dev
```

## Backend

```bash
cd server
npm run dev
```

---

# Production Deployment (AWS)

This project uses:

* SST
* AWS Lambda
* CloudFront
* ACM SSL certificates
* GitHub Actions CI/CD

---

# Deploy manually

```bash
npx sst deploy --stage production
```

---

# CI/CD

Every push to:

```txt
main
```

automatically triggers:

* GitHub Actions
* SST deployment
* AWS infrastructure update

---

# Dependabot

The project includes automated dependency monitoring using:

```txt
.github/dependabot.yml
```

GitHub automatically creates Pull Requests for dependency updates.

---

# Protected Agent Configuration Endpoint

The application includes a secured backend endpoint for dynamically updating AI assistant behavior.

This mechanism allows modifying the assistant configuration without exposing the endpoint publicly.

---

# How It Works

The frontend uses a dynamic token stored directly in the URL.

Example route:

```txt
/#/:token/agent-configuration
```

Example:

```txt
https://yourassistantai.uk/#/my-secret-token/agent-configuration
```

The token is extracted on the frontend using:

```ts
useParams()
```

from React Router and then sent securely to the backend API.

---

# Protected API Endpoint

The backend exposes a protected route:

```txt
POST /:token/contact
```

Example:

```txt
POST https://api-domain.com/my-secret-token/contact
```

---

# Purpose

This functionality prevents unauthorized users from modifying the AI assistant configuration.

Only users with a valid secret token are able to access the protected configuration endpoint.

This approach provides:

* dynamic runtime configuration,
* protected AI behavior management,
* secure backend authorization,
* environment-based secret management using SST.

---

# AI Agent Configuration

![presentation2](https://raw.githubusercontent.com/KamilDziuk/yourAssistantAI/main/client/src/assets/video/presentation2.gif)

The assistant supports dynamic runtime instructions.

Custom instructions:

* are saved in MongoDB,
* can be updated from the frontend,
* are injected into the AI context dynamically.

This allows changing assistant behavior without redeploying the application.

---

# Environment Requirements

* Node.js 22+
* MongoDB database
* OpenAI API key
* AWS account (for production deployment)

---

# Project Structure

```txt
yourAssistantAI/
├── .github/
│   ├── workflows/
│   └── dependabot.yml
├── client/
├── server/
├── sst.config.ts
```

---

# Live Project

[yourassistantai.uk](https://yourassistantai.uk?utm_source=chatgpt.com)
