import { loadMessages, onSavedMessage, onSelectedMessage } from "./socket.js";
import { onHandleSubmit, renderMessages, appendMessage, fillForm } from "./ui.js";

onSavedMessage(appendMessage);
loadMessages(renderMessages);
onSelectedMessage(fillForm);

const messageForm = document.querySelector("#message-form");
messageForm.addEventListener("submit", onHandleSubmit);