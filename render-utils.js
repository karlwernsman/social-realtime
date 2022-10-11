export function renderRoom(room) {
    const li = document.createElement('li');

    const h2 = document.createElement('h2');
    h2.textContent = room.name;

    const p = document.createElement('p');
    p.textContent = room.description;

    const img = document.createElement('img');
    img.src = room.image_url;

    li.append(h2, p, img);

    return li;
}
