// Imports
import { createRoom, uploadImage } from '../fetch-utils.js';

// DOM

const addRoomForm = document.getElementById('add-room-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const imagePlaceholder = document.getElementById('image-placeholder');

// State
let error = null;

// Events

addRoomForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addRoomForm);
    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `/${randomFolder}/${imageFile.name}`;
    const url = await uploadImage('images', imagePath, imageFile);

    const room = {
        name: formData.get('name'),
        description: formData.get('description'),
        image_url: url,
    };

    const response = await createRoom(room);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('../');
    }
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        imagePlaceholder.src = URL.createObjectURL(file);
    } else {
        imagePlaceholder.src = '../assets/placeholder.png';
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
