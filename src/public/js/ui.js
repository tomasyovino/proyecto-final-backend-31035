import { saveMessage, deleteMessage, getMessage, updateMessage } from "./socket.js";

const messagesList = document.querySelector("#messages");
const email = document.querySelector("#message-email");
const admin = document.querySelector("#message-admin");
const content = document.querySelector("#message-content");

let savedID = "";

export const onHandleSubmit = (e) => {
    e.preventDefault();
    if(savedID) {
        updateMessage(savedID, email.value, content.value);
    } else {
        saveMessage(email.value, content.value, admin.value);
    }

    savedID = "";
    content.value = "";
};

export const renderMessages = (messages) => {
    messagesList.innerHTML = ``;
    messages.forEach(message => appendMessage(message));
};

export const appendMessage = (message) => {
    messagesList.append(messageUI(message));
};

export const messageUI = (message) => {
    let messagePostedAt = new Date(message.createdAt).toDateString();
    let user;
    if(message.admin === true) {
        user = "System";
    } else {
        user = message.email;
    };

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="container d-flex p-2">
            <span  
                class="p-2"
                style="background-color:red; color:white; border-radius:30px; max-height: 40px;"
            >
                ${user}
            </span>
            <div 
                class="container d-flex justify-content-between align-items-center p-3" style="margin-left:20px; margin-bottom:20px; background-color:gray; color:white; border-radius:30px;"
            >
                <p>${message.content}</p>
                <div>
                    <div>
                        <button class="btn-update" data-id="${message._id}">Edit</button>
                        <button class="btn-delete" data-id="${message._id}">Delete</button>
                    </div>
                    <span>${messagePostedAt}</span>
                </div>
            </div>
        </div>
    `;

    const btnDelete = div.querySelector(".btn-delete");
    const btnUpdate = div.querySelector(".btn-update")

    btnDelete.addEventListener("click", () => deleteMessage(btnDelete.dataset.id, email.value));
    btnUpdate.addEventListener("click", () => getMessage(btnUpdate.dataset.id, email.value));

    return div;
};

export const fillForm = (data) => {
    content.value = data.content;
    savedID = data._id;
};