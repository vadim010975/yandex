const DURATION = 1000;
import animatePlayersList from "./animatePlayersList.js";
import getDeviceType from "./getDeviceType.js";

export default class PlayersNav {
  static btnPreviousEl;
  static btnNextEl;
  static currentPlayersNavEl;
  static totalPlayersNavEl;
  static windowEl;
  static listEl;
  static startX = 0;
  static endX = 0;

  static init() {
    PlayersNav.bindToDom();
    PlayersNav.renderNavigationBar();
  }

  static bindToDom() {
    PlayersNav.btnPreviousEl = document.querySelector(
      ".players-header-nav-previous"
    );
    PlayersNav.btnNextEl = document.querySelector(".players-header-nav-next");
    PlayersNav.currentPlayersNavEl = document.querySelector(".players-current");
    PlayersNav.totalPlayersNavEl = document.querySelector(".players-total");
    PlayersNav.windowEl = document.querySelector(".players-window");
    PlayersNav.listEl = document.querySelector(".players-list");
    if (document.documentElement.scrollWidth < 1366) {
      PlayersNav.windowEl.addEventListener("touchstart", PlayersNav.onTouchStart);
      PlayersNav.windowEl.addEventListener("touchmove", PlayersNav.onTouchMove);
      PlayersNav.windowEl.addEventListener("touchend", PlayersNav.onTouchEnd);
    }
  }

  static onClickBtnPrevious() {
    PlayersNav.scrollPrevious();
  }

  static onClickBtnNext() {
    PlayersNav.scrollNext();
  }

  static onTouchStartBtnPrevious() {
    PlayersNav.scrollPrevious();
  }

  static onTouchStartBtnNext() {
    PlayersNav.scrollNext();
  }

  static scrollPrevious() {
    const lastElementInWindowId = PlayersNav.getIdOfLastElementInWindow();
    let possibleRelocation;
    let currentPosition;
    let width;
    if (document.documentElement.scrollWidth < 1366) {
      if (
        PlayersNav.getIdOfLastElementInList() === 1 ||
        lastElementInWindowId === 1
      ) {
        return;
      }
      possibleRelocation = 1;
      currentPosition = lastElementInWindowId;
      width = PlayersNav.windowEl.offsetWidth;
    } else {
      if (lastElementInWindowId < 4) {
        return;
      }
      possibleRelocation =
        lastElementInWindowId - 3 > 3 ? 3 : lastElementInWindowId - 3;
      currentPosition = lastElementInWindowId - 2;
      width = 415;
    }
    animatePlayersList(
      currentPosition,
      currentPosition - possibleRelocation,
      (px) => (PlayersNav.listEl.style.right = px + "px"),
      (DURATION * possibleRelocation) / 3,
      width
    );
    setTimeout(
      PlayersNav.renderNavigationBar,
      (DURATION * possibleRelocation) / 3 + 100
    );
  }

  static scrollNext() {
    const lastElementInWindowId = PlayersNav.getIdOfLastElementInWindow();
    let possibleRelocation;
    let currentPosition;
    let width;
    if (document.documentElement.scrollWidth < 1366) {
      if (lastElementInWindowId === PlayersNav.getIdOfLastElementInList()) {
        return;
      }
      possibleRelocation = 1;
      currentPosition = lastElementInWindowId;
      width = PlayersNav.windowEl.offsetWidth;
    } else {
      if (lastElementInWindowId < 3) {
        return;
      }
      possibleRelocation =
        PlayersNav.getIdOfLastElementInList() - lastElementInWindowId > 3
          ? 3
          : PlayersNav.getIdOfLastElementInList() - lastElementInWindowId;
      if (possibleRelocation === 0) {
        return;
      }
      currentPosition = lastElementInWindowId - 2;
      width = 415;
    }
    animatePlayersList(
      currentPosition,
      currentPosition + possibleRelocation,
      (px) => (PlayersNav.listEl.style.right = px + "px"),
      (DURATION * possibleRelocation) / 3,
      width
    );
    setTimeout(
      PlayersNav.renderNavigationBar,
      (DURATION * possibleRelocation) / 3 + 100
    );
  }

  static renderNavigationBar() {
    const lastElementInWindowId = PlayersNav.getIdOfLastElementInWindow();
    const lastElementInListId = PlayersNav.getIdOfLastElementInList();
    if (lastElementInWindowId) {
      PlayersNav.currentPlayersNavEl.textContent = lastElementInWindowId;
    }
    if (lastElementInListId) {
      PlayersNav.totalPlayersNavEl.textContent = lastElementInListId;
    }
    PlayersNav.setBtnState();
  }

  static getIdOfLastElementInWindow() {
    const leftWindow = PlayersNav.windowEl.getBoundingClientRect().left;
    const rightWindow = PlayersNav.windowEl.getBoundingClientRect().right;
    const visibleElements = [...PlayersNav.listEl.children].filter((child) => {
      const leftChild = child.getBoundingClientRect().left;
      const rightChild = child.getBoundingClientRect().right;
      if (leftChild >= leftWindow && rightChild <= rightWindow) {
        return true;
      }
      return false;
    });
    if (visibleElements?.length > 0) {
      return +visibleElements.reduce(
        (acc, el) => {
          if (el.getBoundingClientRect().left > acc[0]) {
            return [el.getBoundingClientRect().left, el];
          }
          return acc;
        },
        [0, null]
      )[1].id;
    }
  }

  static getIdOfLastElementInList() {
    return +PlayersNav.listEl?.lastElementChild?.id;
  }

  static setBtnState() {
    if (
      (document.documentElement.scrollWidth >= 1366 &&
        +PlayersNav.currentPlayersNavEl.textContent < 4) ||
      +PlayersNav.currentPlayersNavEl.textContent < 2
    ) {
      PlayersNav.deactivateBtnPrevious();
    } else {
      PlayersNav.activateBtnPrevious();
    }
    if (
      +PlayersNav.currentPlayersNavEl.textContent >=
      PlayersNav.getIdOfLastElementInList()
    ) {
      PlayersNav.deactivateBtnNext();
    } else {
      PlayersNav.activateBtnNext();
    }
  }

  static activateBtnPrevious() {
    PlayersNav.btnPreviousEl.classList.remove("not-active");
    if (getDeviceType() === "mobile") {
      PlayersNav.btnPreviousEl.addEventListener("touchstart", PlayersNav.onTouchStartBtnPrevious);
    } else {
      PlayersNav.btnPreviousEl.addEventListener(
        "click",
        PlayersNav.onClickBtnPrevious
      );
    }
  }

  static deactivateBtnPrevious() {
    PlayersNav.btnPreviousEl.classList.add("not-active");
    PlayersNav.btnPreviousEl.removeEventListener(
      "click",
      PlayersNav.onClickBtnPrevious
    );
    PlayersNav.btnPreviousEl.removeEventListener(
      "touchstart",
      PlayersNav.onTouchStartBtnPrevious
    );
  }

  static activateBtnNext() {
    PlayersNav.btnNextEl.classList.remove("not-active");
    if (getDeviceType() === "mobile") {
      PlayersNav.btnNextEl.addEventListener(
        "touchstart",
        PlayersNav.onTouchStartBtnNext
      );
    } else {
      PlayersNav.btnNextEl.addEventListener("click", PlayersNav.onClickBtnNext);
    }
  }

  static deactivateBtnNext() {
    PlayersNav.btnNextEl.classList.add("not-active");
    PlayersNav.btnNextEl.removeEventListener(
      "click",
      PlayersNav.onClickBtnNext
    );
    PlayersNav.btnNextEl.removeEventListener(
      "touchstart",
      PlayersNav.onTouchStartBtnNext
    );
  }

  static onTouchStart(e) {
    console.log("onTouchStart");
    PlayersNav.startX = e.touches[0].clientX;
  }

  static onTouchMove(e) {
    console.log("onTouchMove");
    PlayersNav.endX = e.touches[0].clientX;
  }

  static onTouchEnd() {
    console.log("onTouchEnd");
    const diff = PlayersNav.startX - PlayersNav.endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        PlayersNav.scrollNext();
      } else {
        PlayersNav.scrollPrevious();
      }
    }
  }
}
