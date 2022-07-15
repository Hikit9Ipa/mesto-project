export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closePopupEsc = this._closePopupEsc.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._closePopupEsc);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closePopupEsc);
  }

  _closePopupEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close")) {
            this.close();
        }
    })
  }
}
