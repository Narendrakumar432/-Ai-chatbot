// Initialize speech recognition instance
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

// Initialize speech synthesis instance
const synth = window.speechSynthesis;

// Preload voices
let voices = [];
synth.onvoiceschanged = function() {
    voices = synth.getVoices();
    console.log("Voices loaded!");
};

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', function(event) {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Event listener for typing message and pressing Enter
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Event listener for clicking Send button
    sendButton.addEventListener('click', function(event) {
        sendMessage();
    });

    // Event listener for clicking voice recognition button
    const voiceButton = document.getElementById('voiceButton');
    if (voiceButton) {
        voiceButton.addEventListener('click', function(event) {
            startListening();
        });
    }
});

// Function to start voice recognition
function startListening() {
    recognition.start();
}

// Function to handle sending user message (both voice and text input)
function sendMessage(message) {
    const userInput = document.getElementById('userInput');
    const userMessage = message || userInput.value.trim();

    if (userMessage !== '') {
        addMessage('user', userMessage);
        userInput.value = '';

        // Process user input after a short delay to simulate bot response
        setTimeout(() => {
            processUserInput(userMessage);
        }, 500);
    }
}

// Function to process user input (both voice and text)
function processUserInput(input) {
    const normalizedInput = input.toLowerCase().trim();
    const botResponse = getBotResponse(normalizedInput);
    addMessage('bot', botResponse);
    speak(botResponse, 1); // Adjust volume as needed (0 to 1)
}

// Function to add messages to chat window
function addMessage(sender, message) {
    const messages = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

// Function to generate bot responses
function getBotResponse(message) {
    const responses = {
        'hello.': 'Hi there! How can I help you today?',
        'hi.': 'Hello! How can I assist you?',
        'hey.': 'Hey! What can I do for you?',
        'good morning.': 'Good morning! How can I assist you today?',
        'good afternoon.': 'Good afternoon! How can I help you?',
        'good evening.': 'Good evening! What can I do for you?',
        'good night.': 'Good night! Have a great rest!',
        'how are you?': 'I am just a bot, but I am here to help you! How can I assist?',
        'what is your name?': 'I am an AI chatbot here to assist you.',
        'bye.': 'Goodbye! Have a great day!',
        'goodbye.': 'Goodbye! Take care!',
        'howdy.': 'Howdy, partner! How can I help you?',
        'yo.': 'Yo! What’s up?',
        'hi there.': 'Hey there! How can I assist?',
        'sup.': 'Not much, what’s up with you?',
        'greetings.': 'Greetings, human! How can I assist you?',
        'help.': 'Sure, I am here to help! What do you need assistance with?',
        'i need help.': 'Of course! How can I assist you today?',
        'can you assist me?': 'Absolutely! What do you need help with?',
        'i have a problem.': 'I am here to help. Please describe your problem.',
        'tell me a joke.': 'Why did the scarecrow win an award? Because he was outstanding in his field!',
        'what can you do?': 'I can help with answering questions, providing information, and offering basic support. What do you need?',
        'how do i reset my password?': 'To reset your password, go to the login page and click on "Forgot Password". Follow the instructions from there.',
        'how do i contact support?': 'You can contact support by emailing support@yourwebapp.com or calling 1-800-123-4567.',
        'where can i find more information?': 'You can find more information on our website’s FAQ page or by contacting support.',
        'what is your purpose?': 'My purpose is to assist you with any questions or issues you might have with our services.',
        // Adding responses without periods for flexibility
        'hello': 'Hi there! How can I help you today?',
        'hi': 'Hello! How can I assist you?',
        'hey': 'Hey! What can I do for you?',
        'good morning': 'Good morning! How can I assist you today?',
        'good afternoon': 'Good afternoon! How can I help you?',
        'good evening': 'Good evening! What can I do for you?',
        'good night': 'Good night! Have a great rest!',
        'how are you': 'I am just a bot, but I am here to help you! How can I assist?',
        'what is your name': 'I am an AI chatbot here to assist you.',
        'bye': 'Goodbye! Have a great day!',
        'goodbye': 'Goodbye! Take care!',
        'howdy': 'Howdy, partner! How can I help you?',
        'yo': 'Yo! What’s up?',
        'hi there': 'Hey there! How can I assist?',
        'sup': 'Not much, what’s up with you?',
        'greetings': 'Greetings, human! How can I assist you?',
        'help': 'Sure, I am here to help! What do you need assistance with?',
        'i need help': 'Of course! How can I assist you today?',
        'can you assist me': 'Absolutely! What do you need help with?',
        'i have a problem': 'I am here to help. Please describe your problem.',
        'tell me a joke': 'Why did the scarecrow win an award? Because he was outstanding in his field!',
        'what can you do': 'I can help with answering questions, providing information, and offering basic support. What do you need?',
        'how do i reset my password': 'To reset your password, go to the login page and click on "Forgot Password". Follow the instructions from there.',
        'how do i contact support': 'You can contact support by emailing support@yourwebapp.com or calling 1-800-123-4567.',
        'where can i find more information': 'You can find more information on our website’s FAQ page or by contacting support.',
        'what is your purpose': 'My purpose is to assist you with any questions or issues you might have with our services.'
    };

    const mathResponse = handleMathQuery(message);
    return mathResponse || responses[message] || 'I don’t understand that. Can you please rephrase?';
}

// Function to handle mathematical queries
function handleMathQuery(message) {
    // Basic arithmetic operations
    if (message.match(/^\d+(\.\d+)?\s*[\+\-\*\/]\s*\d+(\.\d+)?$/)) {
        try {
            const result = eval(message);
            return `Result: ${result}`;
        } catch (error) {
            return 'Invalid input. Please enter a valid arithmetic expression.';
        }
    }
    // Solve algebraic equations
    else if (message.includes('solve')) {
        const equation = message.replace('solve', '').trim();
        try {
            const solution = solveEquation(equation);
            return `Solution: ${solution}`;
        } catch (error) {
            return 'Unable to solve the equation. Make sure it is a valid equation.';
        }
    }
    // Factorial
    else if (message.includes('factorial')) {
        const number = parseInt(message.match(/\d+/)[0]);
        return `Factorial of ${number} is ${factorial(number)}`;
    }
    // Fibonacci
    else if (message.includes('fibonacci')) {
        const number = parseInt(message.match(/\d+/)[0]);
        return `Fibonacci sequence at position ${number} is ${fibonacci(number)}`;
    }

    return null;
}

// Function to solve algebraic equations
function solveEquation(equation) {
    // Example: equation = '2x + 3 = 7'
    const sides = equation.split('=');
    const leftSide = sides[0].trim();
    const rightSide = sides[1].trim();

    if (leftSide.includes('x')) {
        // Split left side into terms
        const terms = leftSide.split(/(?=[-+])/);
        let coefficient = 0;
        let constant = 0;

        terms.forEach(term => {
            if (term.includes('x')) {
                coefficient += parseFloat(term.replace('x', '')) || 1; // Default to 1 if no coefficient specified
            } else {
                constant += parseFloat(term) || 0;
            }
        });

        // Solve for x
        const solution = (parseFloat(rightSide) - constant) / coefficient;
        return solution;
    } else {
        throw new Error('Equation does not contain variable x.');
    }
}

// Function to calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Function to calculate Fibonacci sequence
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Function to speak the given text using speech synthesis
function speak(text, volume = 1.0) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = getFemaleVoice(); // Assuming you have a function to get a female voice
    utterance.volume = Math.min(1.0, volume); // Use volume as is
    synth.speak(utterance);
}

// Function to get a female voice
function getFemaleVoice() {
    if (voices.length === 0) {
        voices = synth.getVoices(); // Ensure voices are loaded
    }
    return voices.find(voice => voice.name.includes('Female')) || voices[0];
}

// Event listener for voice recognition results
recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.trim();
    addMessage('user', transcript); // Log the user's message
    processUserInput(transcript); // Process the user's message
};

// Event listener for voice recognition errors
recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
    alert('Speech recognition error. Please try again.'); // Display error message
};
