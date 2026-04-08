const statusEl = document.getElementById("status");
const chatArea = document.getElementById("chat-area");
const chatInput = document.getElementById("chat-input");
const startBtn = document.getElementById("start-btn");
const endBtn = document.getElementById("end-btn");
const jobTitleEl = document.getElementById("job-title");
const experienceEl = document.getElementById("experience");
const topicEl = document.getElementById("topic");

let isInterviewing = false;

// Sample AI questions per topic
const questionsByTopic = {
  html: [
    "Explain the difference between HTML block and inline elements.",
    "What is the purpose of the DOCTYPE declaration?",
    "How do you make a page accessible using semantic HTML?"
  ],
  css: [
    "Describe the CSS box model.",
    "What’s the difference between margin and padding?",
    "How do you center a div horizontally and vertically?"
  ],
  js: [
    "Explain the difference between var, let, and const.",
    "What is event bubbling in JavaScript?",
    "What is a closure? Give an example."
  ],
  fullstack: [
    "Describe the request–response cycle in a web application.",
    "What is the difference between GET and POST?",
    "How would you secure an API endpoint?"
  ]
};

// Add a message to the chat
function addMessage(text, isUser) {
  const msg = document.createElement("div");
  msg.classList.add("chat-message");
  if (isUser) msg.classList.add("user");
  else msg.classList.add("ai");
  msg.textContent = text;
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// Simulate AI asking a question
function askQuestion() {
  const topic = topicEl.value;
  const questions = questionsByTopic[topic] || questionsByTopic.html;
  const q = questions[Math.floor(Math.random() * questions.length)];
  setTimeout(() => {
    addMessage(" interviewer: " + q, false);
  }, 800);
}

// Start interview
startBtn.addEventListener("click", () => {
  if (isInterviewing) return;

  const jobTitle = jobTitleEl.value.trim();
  if (!jobTitle) {
    alert("Please enter a job title.");
    return;
  }

  isInterviewing = true;
  startBtn.disabled = true;
  endBtn.disabled = false;
  chatInput.disabled = false;
  statusEl.textContent = "Interview in progress...";
  statusEl.classList.add("ready");

  // Show intro
  addMessage(
    "interviewer: Welcome! I’ll be your AI interviewer for " +
      jobTitle +
      " (level: " +
      experienceEl.options[experienceEl.selectedIndex].text +
      "). Let’s begin.",
    false
  );

  setTimeout(() => askQuestion(), 1500);
});

// End interview
endBtn.addEventListener("click", () => {
  if (!isInterviewing) return;

  isInterviewing = false;
  startBtn.disabled = false;
  endBtn.disabled = true;
  chatInput.disabled = true;
  statusEl.textContent = "Interview ended. You can start again anytime.";
  statusEl.classList.remove("ready");

  addMessage("interviewer: Thank you for participating! Practice is the key to improving your skills.", false);
});

// Handle user input
chatInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && chatInput.value.trim() && isInterviewing) {
    const text = chatInput.value.trim();
    addMessage(" you: " + text, true);
    chatInput.value = "";

    if (text.toLowerCase().includes("thank")) {
      addMessage("interviewer: You’re very welcome! Keep practicing.", false);
    } else {
      askQuestion();
    }
  }
});