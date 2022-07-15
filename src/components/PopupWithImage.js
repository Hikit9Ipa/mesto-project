import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor (popupImage) {
    super(popupImage);
    this._imgPopupBig = this._popup.querySelector('.img-popup__img');
    this._imgPopupCaption = this._popup.querySelector('.img-popup__caption');
  }

  open (name, link) {
    this._imgPopupBig.src = link;
    this._imgPopupBig.alt = name;
    this._imgPopupCaption.textContent = name;
    super.open();
  }
}