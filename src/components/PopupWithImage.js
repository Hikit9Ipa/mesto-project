// Создайте класс PopupWithImage, который наследует от Popup.
// Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor (popupSelector, data) {
    super(popupSelector);
    this._image = data;
    this._imgPopupBig = document.querySelector('.img-popup__img');
    this._imgPopupCaption = document.querySelector('.img-popup__caption');
  }

  open () {
    this._imgPopupBig.src = this._image.link;
    this._imgPopupBig.alt = this._image.name;
    this._imgPopupCaption.textContent = this._image.name;
    super.open();
  }
}