
import{
  popups,
} from './utils.js';


function renderLoading(isLoading, button, defaultText) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = defaultText;
  }
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", escClosePopup);
  closePopupOverlay();
}

//Функция закрытия всех popup-окон
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escClosePopup);
}

function escClosePopup(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
function closePopupOverlay() {
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        closePopup(popup);
      }
    });
  });
}
export { openPopup, closePopup, escClosePopup, closePopupOverlay,renderLoading};