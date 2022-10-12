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
    li.textContent = message.message;

    return li;
}
