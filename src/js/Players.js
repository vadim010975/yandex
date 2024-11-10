import data from "./data.js";
import Player from "./Player.js";

export default class Players {
  static playersList;

  static init() {
    Players.bindToDom();
    Players.fillPlayersList();
  }

  static bindToDom() {
    Players.playersList = document.querySelector(".players-list");
  }

  static fillPlayersList() {
    let id = 1;
    data.forEach(item => {
      item.id = id++;
      const player = new Player(item);
      const element = player.getElement();
      Players.playersList.appendChild(element);
    });
  }
}