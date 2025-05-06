const systemHistoryTable = [];
const sendAsk  = document.querySelector('.sendAsk');
const loadingReplies = document.getElementById('loadingReplies');
const faCommentDots  = document.querySelector('.fa-comment-dots');
const quickStart  = document.querySelector('.quickStart');
// declaring a cookie variable
let cookie = document.cookie;

// scroll tracking (responseBox id)
function scrollTracking() {
const responseBox = document.getElementById('responseBox');
const scrollTrackingInterval = setInterval(() => {
clearInterval(scrollTrackingInterval);
responseBox.scrollTop = responseBox.scrollHeight
},1000)
};

//hide classy sendAsk style after limit
function clickLimit(){
clickCounter ++;
if(clickCounter == 4)
{
sendAsk.style.display = "none";
document.getElementById('askInputData').placeholder = "Request limit reached, please wait a moment";
document.getElementById('askInputData').classList.add('askInputDataLimit');

setTimeout(()=> {
clickCounter = 1;
sendAsk.style.display = "block";
document.getElementById('askInputData').placeholder = "Enter your message...";
document.getElementById('askInputData').classList.remove('askInputDataLimit');
 },40000)
}
};

faCommentDots.style.transition = "1.3s";
// send component behavior
function sendComponentBehavior() {

setInterval(() =>{
  sendAsk.setAttribute("disabled","");

    faCommentDots.style.transition = "1.3s";
  if(document.getElementById('askInputData').value == "")
    {
      sendAsk.setAttribute("disabled","");
         sendAsk.style.color = "#ccc";
         sendAsk.style.transform = "rotate(0deg)";
         faCommentDots.classList.remove("fa-bounce");
         faCommentDots.style.color  = "#ccc";
    }
 if(document.getElementById('askInputData').value !== "")
  {
    sendAsk.removeAttribute("disabled","");
    sendAsk.style.color = "#fff";
    faCommentDots.style.transition = "1.3s";
    faCommentDots.style.color  = "#fff";
faCommentDots.classList.add("fa-bounce");
faCommentDots.style ="--fa-animation-duration: 2s;";

    sendAsk.style.transform = "rotate(30deg)";

  }
},1000)
}

// send component behavior
sendComponentBehavior()
export async function sendingAndReadingQueriesForAssistant() {
scrollTracking();
  loadingReplies.innerHTML = `<i class=" loadingAnimation fa-solid fa-spinner"></i>`;
  loadingReplies.style = "margin-top: -52px; margin-left:10px; padding: 4px;   display:block;   position: absolute; z-index:999;"
let  loadingAnimation = document.querySelector('.loadingAnimation');

loadingAnimation.style ="background-color:#cccccc;  border-radius: 100px; position: absolute; animation:  loading 5s forwards; "

const askInputData = document.getElementById('askInputData').value;


const responseText = document.getElementById('responseText');

//after sending a query to the system
function afterSendingQueryToSystem() {
  document.getElementById('askInputData').setAttribute("disabled","");
  document.getElementById('askInputData').style.cursor = "progress";
  document.getElementById('askInputData').value = "";
}
afterSendingQueryToSystem();

// send component behavior
sendComponentBehavior();
 
 // if askInputData value is empty display default text
responseText.innerHTML += `<div id="question"> ${askInputData} <i class="avatar fa-solid fa-user"></i></div>
<i class="avatar fa-solid fa-robot"></i>`;
 
//saving the user's query in memory
systemHistoryTable.push( askInputData)

  if (!askInputData){ return}; //stop further action if askInputData value is empty

  try {
    //send POST request to local backend
    const res = await fetch('http://localhost:3002/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: askInputData, history: systemHistoryTable}) // send message as JSON (key `messages`)
    });

// open response stream
  const reader = res.body.getReader();

//converting byte stream to text (UTF-8)
const decoder = new TextDecoder();

    // start reading the stream in a loop
    while (true) {
      // read a chunk of data from the stream
      const { done, value } = await reader.read();
      if (done) break; //if there is no more data - exit the loop

      // add byte stream to text
      decoder.decode(value, { stream: true })
        .split('\n')//split SSE stream
        .forEach(line => {

             const content = line;

           if(content !== '[DONE]'  )
{
//if the OpenAI response ends with [DONE] then display it and change the behavior of the sending component
responseText.innerHTML += content.replace('[DONE]');
scrollTracking()
 
 // after the system response
  function  afterSystemResponse() {
  loadingReplies.style.display = "none";
  document.getElementById('askInputData').removeAttribute("disabled","");
  document.getElementById('askInputData').style.cursor = "text";
  }

afterSystemResponse()

// send component behavior
sendComponentBehavior()
}
})
};
} catch (e) {

// error message
responseText.innerText = 'Error communicating with server';
loadingReplies.style.display = "none";
console.error(e);
}
};

// quick question
quickStart.addEventListener('click',()=>{
document.getElementById('askInputData').value = "What specific technologies were used to create this assistant?";
quickStart.style.display = "none";
sendingAndReadingQueriesForAssistant();
});

sendAsk.addEventListener('click',  () =>{
clickLimit();
quickStart.style.display = "none"
sendingAndReadingQueriesForAssistant();
});
// behavior of buttons and assistant window after click
function clickBehavior() {
const closeWindowPopupMobile = document.querySelector(".closeWindowPopupMobile");
const closeWindowAssistant = document.querySelector(".closeWindowAssistant");
const assistantButton = document.querySelector(".assistantButton");
const assistantWindow = document.querySelector(".assistantWindow");

[closeWindowAssistant, assistantWindow, closeWindowPopupMobile ].forEach( el => el.style.display="none");


assistantButton.addEventListener("click", ()=>
{
assistantButton.style.display= "none";
assistantWindow.style.display= "block";
closeWindowAssistant.style.display= "block";

if(window.matchMedia("(max-width:500px)").matches )

{
closeWindowPopupMobile.style.display= "block";
closeWindowAssistant.style.display= "none";
}
});

closeWindowPopupMobile.addEventListener("click", ()=>
{

if(window.matchMedia("(max-width:500px)").matches ){
closeWindowPopupMobile.style.display= "none";
};

closeWindowPopupMobile.style.display= "none";
assistantWindow.style.display= "none";
assistantButton.style.display= "block";
})

closeWindowAssistant.addEventListener("click", ()=>
{
assistantButton.style.display= "block";
assistantWindow.style.display= "none";
closeWindowAssistant.style.display= "none";
})
};
clickBehavior();






