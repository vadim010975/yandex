export default class Player {
  constructor(item) {
    this.id = item.id;
    this.imgUrl = item.imgUrl;
    this.name = item.name;
    this.title = item.title;
  }

  getElement() {
    const playersListItemEl = document.createElement("div");
    playersListItemEl.classList.add("players-list-item");
    playersListItemEl.id = this.id;
    const playersListItemImgEl = document.createElement("img");
    playersListItemImgEl.classList.add("players-list-item-img");
    playersListItemImgEl.alt = "фото участника";
    playersListItemImgEl.src = this.imgUrl;
    playersListItemEl.appendChild(playersListItemImgEl);
    const playersListItemNameEl = document.createElement("div");
    playersListItemNameEl.classList.add("players-list-item-name");
    playersListItemNameEl.textContent = this.name;
    playersListItemEl.appendChild(playersListItemNameEl);
    const playersListItemTitleEl = document.createElement("div");
    playersListItemTitleEl.classList.add("players-list-item-title");
    playersListItemTitleEl.textContent = this.title;
    playersListItemEl.appendChild(playersListItemTitleEl);
    const playersListItemButtonEl = document.createElement("button");
    playersListItemButtonEl.classList.add("players-list-item-button");
    playersListItemButtonEl.textContent = "Подробнее";
    playersListItemEl.appendChild(playersListItemButtonEl);
    return playersListItemEl;
  }
}
