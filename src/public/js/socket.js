const socket = io();

export const loadMessages = (callback) => {
    socket.on("server:loadMessages", callback);
};

export const saveMessage = (email, content) => {
    socket.emit("client:saveMessage", {
        email, content
    });
};

export const onSavedMessage = (callback) => {
    socket.on("server:savedMessage", callback);
};

export const deleteMessage = (id, email) => {
    socket.emit("client:deleteMessage", {id, email});
};

export const getMessage = (id, email) => {
    socket.emit("client:getMessage", {id, email});
};

export const onSelectedMessage = (callback) => {
    socket.on("server:selectedMessage", callback);
};

export const updateMessage = (id, email, content) => {
    socket.emit("client:updateMessage", {
        _id: id,
        email,
        content,
    });
};