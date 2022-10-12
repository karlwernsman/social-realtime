//import
import '../auth/user.js';
import { getRoom } from '../fetch-utils.js';

// DOM
const errorDisplay = document.getElementById('error-display');
const roomName = document.getElementById('room-name');
const roomDescription = document.getElementById('room-description');
const roomImage = document.getElementById('room-image');
// State

let error = null;
let room = null;

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
        alert(error.message + '. ' + 'Please contact the administrator for more information.');
        location.replace('/');
    } else {
        displayRoom();
    }
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
