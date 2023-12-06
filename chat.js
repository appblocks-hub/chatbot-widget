(function () {
  // Create the chat widget elements
  var chatButton = document.createElement("button");
  chatButton.textContent = "Chat";
  chatButton.id = "chatButton";
  chatButton.style.position = "fixed";
  chatButton.style.bottom = "20px";
  chatButton.style.right = "20px";
  chatButton.style.padding = "10px";
  chatButton.style.border = "none";
  chatButton.style.background = "#3498db";
  chatButton.style.color = "white";
  chatButton.style.borderRadius = "5px";
  chatButton.style.cursor = "pointer";

  var chatWidget = document.createElement("div");
  chatWidget.id = "chatWidget";
  chatWidget.style.display = "none";
  chatWidget.style.position = "fixed";
  chatWidget.style.bottom = "50px";
  chatWidget.style.right = "20px";
  chatWidget.style.width = "300px";
  chatWidget.style.background = "#f1f1f1";
  chatWidget.style.borderRadius = "5px";
  chatWidget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
  chatWidget.style.padding = "10px";
  chatWidget.style.fontFamily = "Arial, sans-serif";

  var chatHeader = document.createElement("div");
  chatHeader.id = "chatHeader";
  chatHeader.textContent = "Chat";
  chatHeader.style.textAlign = "center";
  chatHeader.style.paddingBottom = "5px";
  chatHeader.style.borderBottom = "1px solid #ccc";

  var chatMessages = document.createElement("div");
  chatMessages.id = "chatMessages";
  chatMessages.style.overflowY = "scroll";
  chatMessages.style.height = "200px";
  chatMessages.style.marginBottom = "10px";

  var userInput = document.createElement("input");
  userInput.type = "text";
  userInput.id = "userInput";
  userInput.placeholder = "Type a message...";
  userInput.style.width = "calc(100% - 70px)";
  userInput.style.padding = "8px";
  userInput.style.marginRight = "5px";
  userInput.style.border = "1px solid #ccc";
  userInput.style.borderRadius = "3px";

  var sendMessageButton = document.createElement("button");
  sendMessageButton.textContent = "Send";
  sendMessageButton.id = "sendMessage";
  sendMessageButton.style.width = "60px";
  sendMessageButton.style.padding = "8px";
  sendMessageButton.style.border = "none";
  sendMessageButton.style.background = "#3498db";
  sendMessageButton.style.color = "white";
  sendMessageButton.style.borderRadius = "3px";
  sendMessageButton.style.cursor = "pointer";

  chatWidget.appendChild(chatHeader);
  chatWidget.appendChild(chatMessages);
  chatWidget.appendChild(userInput);
  chatWidget.appendChild(sendMessageButton);
  document.body.appendChild(chatButton);
  document.body.appendChild(chatWidget);

  // Chat functionality
  document.getElementById("chatButton").addEventListener("click", function () {
    document.getElementById("chatWidget").style.display = "block";
  });

  document.getElementById("sendMessage").addEventListener("click", function () {
    var userInputValue = document.getElementById("userInput").value;
    if (userInputValue.trim() !== "") {
      var message =
        '<div style="margin-bottom: 5px;"><strong style="color: #3498db;">You:</strong> ' +
        userInputValue +
        "</div>";
      document.getElementById("chatMessages").innerHTML += message;
      document.getElementById("userInput").value = "";
      // Send userInputValue to server or perform other actions
      // This is where you'd typically send the message to a server for processing
    }
  });
})();
