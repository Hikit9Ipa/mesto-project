import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._imgPopupBig = document.querySelector('.img-popup__img');
    this._imgPopupCaption = document.querySelector('.img-popup__caption');
  }

  open (name, link) {
    this._imgPopupBig.src = link;
    this._imgPopupBig.alt = name;
    this._imgPopupCaption.textContent = name;
    super.open();
  }
}