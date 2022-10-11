// Imports
import { createRoom } from '../fetch-utils.js';

// DOM

const addRoomForm = document.getElementById('add-room-form');
const errorDisplay = document.getElementById('error-display');

// State
let error = null;

// Events

addRoomForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addRoomForm);

    const room = {
        name: formData.get('name'),
        description: formData.get('description'),
    };

    const response = await createRoom(room);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('../');
    }
});

// Displays

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
