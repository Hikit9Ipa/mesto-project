// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
export class Popup {
  constructor(popup) {
    this._popup = popup;
  }
  open(){
    _popup.classList.add("popup_opened");
    document.addEventListener("keydown", _handleEscClose);
  }
  close(){
    _popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", _handleEscClose);
  }
  _handleEscClose(evt){
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        close(openedPopup);
      }
  }
  setEventListeners(){

  }
}
