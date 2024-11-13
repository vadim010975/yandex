import getDeviceType from "./getDeviceType.js";

export default class StagesNav {
  static btnPreviousEl;
  static btnNextEl;
  static pointsEl;
  static windowEl;
  static listEl;

  static init() {
    StagesNav.bindToDom();
    StagesNav.setNavState();
  }

  static bindToDom() {
    StagesNav.btnPreviousEl = document.querySelector(
      ".stages-nav-btn-previous"
    );
    StagesNav.btnNextEl = document.querySelector(".stages-nav-btn-next");
    StagesNav.pointsEl = document.querySelector(".stages-nav-points");
    StagesNav.windowEl = document.querySelector(".stages-table");
    StagesNav.listEl = document.querySelector(".stages-list");
  }

  static onTouchStartBtnPrevious() {
    StagesNav.scrollPrevious();
  }

  static onTouchStartBtnNext() {
    StagesNav.scrollNext();
  }

  static onClickBtnPrevious() {
    StagesNav.scrollPrevious();
  }

  static onClickBtnNext() {
    StagesNav.scrollNext();
  }

  static scrollPrevious() {
    const offsetRight = StagesNav.listEl.style.right ? +StagesNav.listEl.style.right.slice(0, -2) : 0;
    if (offsetRight <= 0) {
      return;
    }
    StagesNav.listEl.style.right = offsetRight - 335 + "px";
    StagesNav.setNavState();
  }

  static scrollNext() {
    const offsetRight = StagesNav.listEl.style.right ? +StagesNav.listEl.style.right.slice(0, -2) : 0;
    if (offsetRight >= 1340) {
      return;
    }
    StagesNav.listEl.style.right = offsetRight + 335 + "px";
    StagesNav.setNavState();
  }

  static setNavState() {
    const offsetRight = +StagesNav.listEl.style.right.slice(0, -2);
    if (offsetRight >= 1340) {
      StagesNav.deactivateBtnNext();
    } else {
      StagesNav.activateBtnNext();
    }
    if (offsetRight <= 0) {
      StagesNav.deactivateBtnPrevious();
    } else {
      StagesNav.activateBtnPrevious();
    }
    const point = offsetRight / 335;
    [...StagesNav.pointsEl.children].forEach(el => el.style.backgroundColor = "#d9d9d9");
    [...StagesNav.pointsEl.children][point].style.backgroundColor = "#313131";
  }

  static activateBtnPrevious() {
    StagesNav.btnPreviousEl.classList.remove("not-active");
    if (getDeviceType() === "mobile") {
      StagesNav.btnPreviousEl.addEventListener("touchstart", StagesNav.onTouchStartBtnPrevious);
    } else {
      StagesNav.btnPreviousEl.addEventListener("click", StagesNav.onClickBtnPrevious);
    }
  }

  static deactivateBtnPrevious() {
    StagesNav.btnPreviousEl.classList.add("not-active");
    StagesNav.btnPreviousEl.removeEventListener("touchstart", StagesNav.onTouchStartBtnPrevious);
    StagesNav.btnPreviousEl.removeEventListener("click", StagesNav.onClickBtnPrevious);
  }

  static activateBtnNext() {
    StagesNav.btnNextEl.classList.remove("not-active");
    if (getDeviceType() === "mobile") {
      StagesNav.btnNextEl.addEventListener("touchstart", StagesNav.onTouchStartBtnNext);
    } else {
      StagesNav.btnNextEl.addEventListener("click", StagesNav.onClickBtnNext);
    }
  }

  static deactivateBtnNext() {
    StagesNav.btnNextEl.classList.add("not-active");
    StagesNav.btnNextEl.removeEventListener("touchstart", StagesNav.onTouchStartBtnNext);
    StagesNav.btnNextEl.removeEventListener("click", StagesNav.onClickBtnNext);
  }
}