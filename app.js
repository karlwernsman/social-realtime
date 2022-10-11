/* Imports */
import { renderRoom } from './render-utils.js';
import { getRooms } from './fetch-utils.js';
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const roomList = document.getElementById('room-list');

/* State */
let error = null;
let rooms = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getRooms();
    error = response.error;
    rooms = response.data;

    if (error) {
        displayError();
    }

    if (rooms) {
        displayRooms();
    }
});
/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayRooms() {
    roomList.innerHTML = '';

    for (const room of rooms) {
        const roomEl = renderRoom(room);
        roomList.append(roomEl);
    }
}
