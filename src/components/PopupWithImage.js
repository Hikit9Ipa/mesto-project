import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor (popupImageSelector) {
    super(popupImageSelector);
    this._imgPopupBig = this._popupSelector.querySelector('.img-popup__img');
    this._imgPopupCaption = this._popupSelector.querySelector('.img-popup__caption');
  }

  open (name, link) {
    this._imgPopupBig.src = link;
    this._imgPopupBig.alt = name;
    this._imgPopupCaption.textContent = name;
    super.open();
  }
}