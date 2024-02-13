(function () {
  var chatHistory = "";
  const initialBotMessage = {
    role: "assistant",
    content: "Hello! Ask me questions about appblocks ",
  };
  var history = [initialBotMessage];

  const urlParams = new URLSearchParams(window.location.search);
  const projectID = urlParams?.get("project_id");
  const apiUrl = urlParams?.get("api_url");
  // API endpoint
  var apiEndpoint = `${apiUrl}?${projectID}`;

  function FormatChatHistory(human, ai, previousChatHistory = "") {
    const newInteraction = `Human: ${human}\nAI: ${ai}`;
    if (!previousChatHistory) {
      return newInteraction;
    }
    return `${previousChatHistory}\n\n${newInteraction}`;
  }

  // Create an img element
  var svgImage = document.createElement("img");
  svgImage.src = "./assets/img/widget-icon.svg";
  svgImage.alt = "Send";
  var closeButton = document.createElement("img");
  closeButton.src = "./assets/img/close-button.svg";
  closeButton.alt = "CloseButton";
  var sendButton = document.createElement("img");
  sendButton.src = "./assets/img/send-icon.svg";
  sendButton.alt = "SendButton";
  var abLogo = document.createElement("img");
  abLogo.style.height = "26px";
  abLogo.src = "./assets/img/chat-ab-logo.png";
  abLogo.alt = "SendButton";

  // Create the chat widget elements
  var chatButton = document.createElement("button");
  chatButton.id = "chatButton";
  chatButton.style.position = "fixed";
  chatButton.style.bottom = "20px";
  chatButton.style.right = "20px";
  chatButton.style.border = "none";
  chatButton.style.background = "none";
  chatButton.style.cursor = "pointer";
  chatButton.appendChild(svgImage);

  var chatWidget = document.createElement("div");
  chatWidget.id = "chatWidget";
  chatWidget.style.display = "none";
  // chatWidget.style.display = "block";
  chatWidget.style.position = "fixed";
  chatWidget.style.bottom = "20px";
  chatWidget.style.right = "20px";
  chatWidget.style.width = "320px";
  chatWidget.style.background = "#f1f1f1";
  chatWidget.style.borderRadius = "12px";
  chatWidget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
  chatWidget.style.fontFamily = "Arial, sans-serif";
  chatWidget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
  chatWidget.classList.add("slide-in");

  var chatHeader = document.createElement("div");
  chatHeader.id = "chatHeader";
  chatHeader.style.borderTopLeftRadius = "12px";
  chatHeader.style.borderTopRightRadius = "12px";
  chatHeader.style.background = "#7B4DFF";
  chatHeader.style.padding = "0.5rem";
  chatHeader.style.textAlign = "center";
  chatHeader.style.paddingBottom = "10px";
  chatHeader.style.borderBottom = "1px solid #ccc";
  chatHeader.style.display = "flex";
  chatHeader.style.alignItems = "center";
  chatHeader.style.justifyContent = "space-between";

  var chatHeaderChildLeft = document.createElement("div");
  chatHeaderChildLeft.id = "chatHeaderChildLeft";
  chatHeaderChildLeft.style.display = "flex";
  chatHeaderChildLeft.style.alignItems = "center";
  chatHeaderChildLeft.style.justifyContent = "center";
  chatHeaderChildLeft.appendChild(abLogo);

  var chatHeaderChildRight = document.createElement("div");
  chatHeaderChildRight.id = "chatHeaderChildRight";
  chatHeaderChildRight.style.display = "flex";
  chatHeaderChildRight.style.alignItems = "center";
  chatHeaderChildRight.style.justifyContent = "center";
  chatHeaderChildRight.style.padding = "10px";
  chatHeaderChildRight.style.cursor = "pointer";
  chatHeaderChildRight.appendChild(closeButton);

  chatHeader.appendChild(chatHeaderChildLeft);
  chatHeader.appendChild(chatHeaderChildRight);

  var chatMessages = document.createElement("div");
  chatMessages.id = "chatMessages";
  chatMessages.classList.add("chat-bubble-container");
  chatMessages.style.height = "652px";

  var chatMessagesChild = document.createElement("div");
  chatMessagesChild.id = "chatMessagesChild";
  chatMessagesChild.classList.add("custom-scroll-bar");
  chatMessagesChild.classList.add("chat-message-child");

  var userInput = document.createElement("input");
  userInput.type = "text";
  userInput.id = "userInput";
  userInput.placeholder = "Ask anything";
  userInput.classList.add("user-input");

  var sendMessageButton = document.createElement("button");
  sendMessageButton.id = "sendMessage";
  sendMessageButton.appendChild(sendButton);
  sendMessageButton.classList.add("send-message-button");

  var inputContainer = document.createElement("div");
  inputContainer.id = "inputContainer";
  inputContainer.classList.add("input-container");

  var inputContainerChild = document.createElement("div");
  inputContainerChild.id = "inputContainerChild";
  inputContainerChild.classList.add("input-container-child");

  var userInputContainer = document.createElement("div");
  userInputContainer.id = "userInputContainer";
  userInputContainer.classList.add("user-input-container");

  // Add a loader element to your HTML
  var loader = document.createElement("div");
  loader.id = "loader";
  loader.classList.add("loader");

  var loaderText = document.createElement("span");
  loaderText.id = "loaderText";
  loaderText.innerHTML = "appblocks bot evaluating";
  loaderText.classList.add("loaderText");
  loader.appendChild(loaderText);

  var typing = document.createElement("div");
  typing.id = "typing";
  typing.classList.add("typing", "typing-xs");
  // typing.classList.add("typing-xs");
  loader.appendChild(typing);

  for (i = 0; i < 3; i++) {
    var typingDot = document.createElement("span");
    typingDot.id = "typingDot" + (i + 1);
    typingDot.classList.add("typing-dot");
    typing.appendChild(typingDot);
  }

  userInputContainer.appendChild(userInput);

  inputContainer.appendChild(inputContainerChild);
  inputContainerChild.appendChild(userInputContainer);
  inputContainerChild.appendChild(sendMessageButton);

  chatWidget.appendChild(chatMessages);
  chatMessages.appendChild(chatHeader);
  chatMessages.appendChild(chatMessagesChild);
  chatMessages.appendChild(loader);
  chatMessages.appendChild(inputContainer);
  document.body.appendChild(chatButton);
  document.body.appendChild(chatWidget);

  //adding intital html element to the message node
  updateChatUI(initialBotMessage);

  // Function to reset the widget
  function resetWidget() {
    // Clear chat history
    chatHistory = "";
    history = [initialBotMessage];

    // Clear the UI
    var chatMessagesChild = document.getElementById("chatMessagesChild");
    chatMessagesChild.innerHTML = "";

    // Update the chat UI with the initial history on widget reset
    updateChatUI(initialBotMessage);
  }

  // Hide chatWidget on close button click
  document
    .getElementById("chatHeaderChildRight")
    .addEventListener("click", function (event) {
      var chatWidget = document.getElementById("chatWidget");
      chatWidget.style.display = "none";
      resetWidget();
      // Stop event propagation to prevent immediate hiding
      event.stopPropagation();
    });

  // Close or open widget functionality
  document
    .getElementById("chatButton")
    .addEventListener("click", function (event) {
      var chatWidget = document.getElementById("chatWidget");

      if (chatWidget.style.display === "block") {
        chatWidget.style.display = "none";
      } else {
        chatWidget.style.display = "block";
      }

      // Stop event propagation to prevent immediate hiding
      event.stopPropagation();
    });

  // Hide chatWidget on outside click
  document.addEventListener("mousedown", (event) => {
    var chatWidget = document.getElementById("chatWidget");
    var chatButton = document.getElementById("chatButton");

    // Check if the clicked element is not part of chatWidget or chatButton
    if (!chatWidget.contains(event.target) && event.target !== chatButton) {
      chatWidget.style.display = "none";
      resetWidget();
    }
  });

  // Function to scroll to the bottom of the chatMessagesChild container
  function scrollToBottom() {
    var chatMessagesChild = document.getElementById("chatMessagesChild");
    chatMessagesChild.scrollTop = chatMessagesChild.scrollHeight;
  }

  function updateChatUI(message) {
    var chatMessagesChild = document.getElementById("chatMessagesChild");
    var messageElement =
      message.role === "user"
        ? '<div class="chat-bubble user-chat-bubble"><div class="chat-bubble-child chat-bubble-child-user chatBoxUser chat-msg-animation"><p class="message">' +
          message.content +
          "</p></div></div>"
        : '<div class="chat-bubble ai-chat-bubble"><div class="chat-bubble-child chat-bubble-child-ai chatBoxAi chat-msg-animation"><p class="message ">' +
          message.content +
          "</p></div></div>";

    // Assuming messageElement is a string containing HTML
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = messageElement;

    // Now, you can append the child nodes of tempDiv
    while (tempDiv.firstChild) {
      chatMessagesChild.appendChild(tempDiv.firstChild);
    }

    // Scroll to the bottom after updating the UI
    scrollToBottom();
  }

  // Function to handle sending a message
  function sendMessage() {
    var userInputValue = document.getElementById("userInput").value;
    if (userInputValue.trim() !== "") {
      // Show loader while waiting for the API response
      showLoader();

      history.push({ role: "user", content: userInputValue });

      // Refresh the UI with the updated history
      updateChatUI({ role: "user", content: userInputValue });

      // Simulate an API call (replace this with your actual API endpoint)
      fetch(apiEndpoint, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({
          query: userInputValue,
          history: chatHistory,
        }),
      })
        .then((response) => response.json())
        .then((r) => {
          chatHistory = FormatChatHistory(
            userInputValue,
            r.content,
            chatHistory
          );
          history.push(r);

          // Refresh the UI with the updated history
          updateChatUI(r);

          // Hide loader after receiving the API response
          hideLoader();
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          hideLoader();
        });

      // Clear the input field
      document.getElementById("userInput").value = "";
    }
  }

  // Handle "Enter" key press on the userInput field
  document
    .getElementById("userInput")
    .addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

  // Handle send button click
  document.getElementById("sendMessage").addEventListener("click", sendMessage);

  // Function to show loader
  function showLoader() {
    document.getElementById("loader").style.display = "flex";
  }

  // // Function to hide loader
  function hideLoader() {
    document.getElementById("loader").style.display = "none";
  }
})();
