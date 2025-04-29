
import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';
import {createParser} from 'eventsource-parser'
import path from 'path'
import {fileURLToPath} from 'url'


// loading environment variables
dotenv.config();

// create express app
let app = express();

app.use(cors()); //allows access to API from domains (origins) other than the one on which the server is running
app.use(express.json()); //Automatically parses JSON data sent in the request body

//convert file url to absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//sharing a public folder as a source for static files
app.use(
express.static(
path.join(_dirname, '..', 'public') // path to ../public folder relative to current file
)
);

// endpoint POST in /ask
app.post('/ask', async (req, res) => {

  const userMessage = req.body.messages; // read request from the user
  const systemHistory = req.body.history; // read request from the user
  // preparing HTTP headers for SSE
res.setHeader('Content-Type','text/event-stream'); // informs the browser that it will receive data as event stream
res.setHeader('Cache-Control','no-cache'); //disables cache (because it changes all the time)
res.setHeader('Connection','keep-alive'); //open HTTP connection (live)
  try {

    //saving user query to MongoDB
    async function  saveQuestionsDatabase ()
{

  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);
      try {
  client.connect();
  const db = client.db('aiassistant_ai');
  const collection = db.collection('customer_questions');
  await  collection.insertOne({userMessage});
      } catch (err) {
console.error("error", err);
      } finally {
       await client.close();
      }


  }
  saveQuestionsDatabase()
    //send a POST request to OpenAI
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // authorization from api key
      "Content-Type":'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // model GPT
        messages: [
          { role: "system", content: `This assistant was created in JavaScript Node.js, CSS. And the data is saved in mongoDB.`},
          { role: "system", content: `When user asks for conversation history display this: ${systemHistory}.` },
          { role: "user", content: userMessage }
        ],
        stream: true, // the response will come in pieces
        max_tokens: 100,
        temperature: 0.9,

      }),

    });

 // OpenAI streaming data parser
  const parser = createParser({
     onEvent(event){
        if (event.data === "[DONE]") {
          res.write("[DONE]"); // inform the frontend that the response has finished
          res.end();                     // end connection SSE
          return;
        }
        // write one element JSON in response
        const json = JSON.parse(event.data)
        const content = json.choices?.[0]?.delta?.content;

        if (content) {
          res.write(`${content}`); // sned text element in browser
        }
      },
    });

    // data stream from OpenAI response and passes it to parser
    for await (const chunk of completion.body) {
    parser.feed(chunk.toString()) //another piece of data to the parser
    }

  } catch (err) {
// error handling e.g. when connecting to OpenAI
    console.error("Błąd:", err);
    res.status(500).end("data: Error server");
  }
});


// we start the server on the port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server working in http://localhost:${PORT}`));









