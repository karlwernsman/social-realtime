//import
import '../auth/user.js';
import { getRoom, createMessage, getUser, getMessage, realTime } from '../fetch-utils.js';
import { renderMessage } from '../render-utils.js';

// DOM
const errorDisplay = document.getElementById('error-display');
const roomName = document.getElementById('room-name');
const roomDescription = document.getElementById('room-description');
const roomImage = document.getElementById('room-image');
const messageForm = document.getElementById('message-form');
const messageList = document.getElementById('message-list');

// State

let error = null;
let room = null;
const user = getUser();

// Events

window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.replace('/');
        return;
    }

    const response = await getRoom(id);
    error = response.error;
    room = response.data;

    if (error) {
        displayError();
    } else {
        displayRoom();
        displayMessages();
    }
    realTime(room.id, async (payload) => {
        const messageId = payload.new.id;
        const chatResponse = await getMessage(messageId);
        console.log(chatResponse);
        error = chatResponse.error;
        if (error) {
            displayError();
        } else {
            const message = chatResponse.data;
            room.chat.unshift(message);
            displayMessages();
        }
    });
});

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(messageForm);
    const insertMessage = {
        message: formData.get('message, profiles'),
        profiles: formData.get('message.profiles'),
        room_id: room.id,
    };
    console.log('message.profiles');

    const response = await createMessage(insertMessage);
    error = response.error;

    messageForm.reset();
});

// Display functions

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayRoom() {
    roomName.textContent = room.name;
    roomDescription.textContent = room.description;
    roomImage.src = room.image_url;
}

function displayMessages() {
    messageList.innerHTML = '';
    for (const message of room.chat) {
        const messageEl = renderMessage(message, user.id);
        messageList.append(messageEl);
    }
}
