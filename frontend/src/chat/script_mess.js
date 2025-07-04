document.addEventListener("DOMContentLoaded", function () {
    const chatItems = document.querySelectorAll(".chat-item");
    const chatContents = document.querySelectorAll(".chat-content");
    const messageInput = document.getElementById("messageInput");
    const sendMessageButton = document.getElementById("sendMessage");

    chatItems.forEach(item => {
        item.addEventListener("click", function () {
            const chatId = this.getAttribute("data-chat");
            
            chatContents.forEach(content => {
                content.classList.remove("active");
            });

            const activeChat = document.getElementById(`chat-${chatId}`);
            activeChat.classList.add("active");
        });
    });

    sendMessageButton.addEventListener("click", function () {
        const activeChat = document.querySelector(".chat-content.active .messages");
        const messageText = messageInput.value.trim();
        
        if (messageText !== "") {
            const newMessage = document.createElement("p");

            // Create timestamp
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Add user message class
            newMessage.classList.add("user-message");

            // Create message text with timestamp
            newMessage.innerHTML = `${messageText} <span class="timestamp">${timestamp}</span>`;
            activeChat.appendChild(newMessage);

            // Clear input
            messageInput.value = "";

            // Scroll to the bottom of the chat
            activeChat.scrollTop = activeChat.scrollHeight;
        }
    });
});
