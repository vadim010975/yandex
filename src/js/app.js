import getDeviceType from "./getDeviceType.js";
import Players from "./Players.js";
import PlayersNav from "./PlayersNav.js";
import StagesNav from "./StagesNav.js";

if (document.documentElement.scrollWidth < 1366 && getDeviceType() === "mobile") {
  StagesNav.init();
}

Players.init();
PlayersNav.init();
