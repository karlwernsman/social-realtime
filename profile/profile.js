// imports
import '../auth/user.js';
import { getUser, updateProfile, uploadImage, getProfile } from '../fetch-utils.js';

// DOM
const user = getUser();

const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');
const profileForm = document.getElementById('profile-form');
const userNameInput = profileForm.querySelector('[name=username]');
const bioInput = profileForm.querySelector('[name=bio]');
const pronounsInput = profileForm.querySelector('[name=pronouns]');

// State
let profile = null;
let error = null;

// Events
window.addEventListener('load', async () => {
    const response = await getProfile(user.id);
    //     console.log(response);
    error = response.error;
    profile = response.data;

    if (error) {
        displayError();
    } else {
        displayProfile();
    }
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = 'assets/avatar-preview.png';
    }
});

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDisplay.textContent = '';
    const formData = new FormData(profileForm);

    const profileUpdate = {
        username: formData.get('username'),
        bio: formData.get('bio'),
        pronouns: formData.get('pronouns'),
    };

    const imageFile = formData.get('image');
    const imagePath = `${user.id}/${imageFile.name}`;
    const url = await uploadImage('images', imagePath, imageFile);
    profileUpdate.image_url = url;

    const response = await updateProfile(user.id, profileUpdate);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});

// Display functions

function displayError() {
    errorDisplay.textContent = error.message;
}

function displayProfile() {
    if (profile) {
        userNameInput.value = profile.username;
        bioInput.value = profile.bio;
        pronounsInput.value = profile.pronouns;
        if (profile.image_url) {
            preview.src = profile.image_url;
        }
    }
}
