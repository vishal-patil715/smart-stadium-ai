// ================= AI ASSISTANT =================

function openAssistant() {
    document.getElementById("assistant").scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        document.getElementById("userInput").focus();
    }, 700);
}

function openMultilingualAI() {

    openAssistant();

    setTimeout(() => {

        document.getElementById("userInput").value =
            "You are a multilingual stadium assistant. Always reply ONLY in the same language used in the user's question. Do not provide translations or responses in other languages. You understand English, Hindi, and Marathi. Help users with stadium navigation, crowd information, accessibility, transportation, and facilities."

        sendMessage();

    }, 800);
}


// ================= SEND MESSAGE =================

function sendMessage() {

    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if (message === "") {
        return;
    }

    addUserMessage(message);

    input.value = "";

    // Temporary AI response
    setTimeout(() => {
        generateAIResponse(message);
    }, 700);
}


// ================= ENTER KEY =================

function handleEnter(event) {

    if (event.key === "Enter") {
        sendMessage();
    }
}


// ================= USER MESSAGE =================

function addUserMessage(message) {

    const chatContainer = document.querySelector(".chat-container");

    const userMessage = document.createElement("div");

    userMessage.className = "user-message";

    userMessage.innerHTML = `
        <div class="user-message-content">
            <strong>You</strong>
            <p>${escapeHTML(message)}</p>
        </div>

        <span class="message-avatar">👤</span>
    `;

    chatContainer.insertBefore(
        userMessage,
        document.querySelector(".suggestions")
    );
}


// ================= AI RESPONSE =================

async function generateAIResponse(message) {

    try {

        const response = await fetch("https://smart-stadium-ai-fg1k.onrender.com/api/chat", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        addAIMessage(data.reply);

    } catch (error) {

        console.error("StadiumAI Error:", error);

        addAIMessage(
            "Sorry, I couldn't connect to StadiumAI right now. Please try again."
        );
    }
}


// ================= AI MESSAGE =================

function addAIMessage(message) {

    const chatContainer = document.querySelector(".chat-container");

    const aiMessage = document.createElement("div");

    aiMessage.className = "ai-message";

    aiMessage.innerHTML = `
        <span class="message-avatar">🤖</span>

        <div class="message-content">

            <strong>StadiumAI</strong>

            <p>${message}</p>

        </div>
    `;

    chatContainer.insertBefore(
        aiMessage,
        document.querySelector(".suggestions")
    );
}


// ================= QUICK QUESTIONS =================

function askQuestion(question) {

    document.getElementById("userInput").value = question;

    sendMessage();
}


// ================= ROUTE =================

function findRoute() {

    openAssistant();

    setTimeout(() => {

        document.getElementById("userInput").value =
            "Help me find the best route to my seat. Consider the current crowd levels at all gates and recommend the fastest and least crowded entry route.";

        sendMessage();

    }, 800);
}


// ================= CROWD =================

function showCrowdInfo() {

    openAssistant();

    setTimeout(() => {

        document.getElementById("userInput").value =
            "Analyze the current crowd levels across all stadium gates and zones. Identify the most crowded areas, the least crowded areas, and recommend which gates fans should use to avoid congestion.";

        sendMessage();

    }, 800);
}


// ================= ACCESSIBILITY =================

function showAccessibility() {

    openAssistant();

    setTimeout(() => {

        document.getElementById("userInput").value =
            "Find wheelchair accessible routes, accessible entrances, elevators, wheelchair assistance points, and other accessibility facilities in the stadium. Recommend the best option for a visitor who needs mobility assistance.";

        sendMessage();

    }, 800);
}


// ================= OPERATIONAL INSIGHT =================

function showOperationalInsight() {

    openAssistant();

    setTimeout(() => {

        document.getElementById("userInput").value =
            "Give me an operational insight based on the current stadium data. Focus on crowd management, gates, accessibility and transportation.";

        sendMessage();

    }, 500);
}


// ================= SECURITY =================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}

