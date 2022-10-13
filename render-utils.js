export function renderRoom(room) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `/chatroom/?id=${room.id}`;

    const h2 = document.createElement('h2');
    h2.textContent = room.name;

    const p = document.createElement('p');
    p.textContent = room.description;

    const img = document.createElement('img');
    img.src = room.image_url;

    a.append(h2, p, img);

    li.append(a);

    return li;
}

export function renderMessage(message, profiles) {
    const li = document.createElement('li');

    // const img = document.createElement('img');
    // img.src = message.profiles.image_url;

    const p1 = document.createElement('p');
    p1.textContent = profiles.username;

    // const p2 = document.createElement('p');
    // p2.textContent = profile.pronouns;

    const p3 = document.createElement('p');
    p3.textContent = message.message;

    li.append(p1, p3);
    return li;
}
