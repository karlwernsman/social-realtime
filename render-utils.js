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

export function renderMessage(message) {
    const li = document.createElement('li');
    const profile = message.profiles;

    const div = document.createElement('div');
    div.classList.add('div');

    const div2 = document.createElement('div');
    div2.classList.add('div2');

    const img = document.createElement('img');
    img.src = message.profiles.image_url;
    img.classList.add('avatar');

    const p1 = document.createElement('p');
    p1.textContent = profile.username;
    p1.classList.add('username');

    const p2 = document.createElement('p');
    p2.textContent = profile.pronouns;
    p2.classList.add('pronouns');

    const p3 = document.createElement('p');
    p3.textContent = message.message;
    p3.classList.add('message');

    div2.append(p1, p2);
    div.append(img, div2);
    li.append(div, p3);
    return li;
}
