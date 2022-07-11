// Создайте класс PopupWithForm, который наследуется от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
import {Popup} from './Popup.js';


export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._buttonSubmit = this._form.querySelector('.popup__submit');
    this._buttonSubmitText = this._buttonSubmit.textContent;
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }

  renderLoadingStatus(isItLoading) {
    if (isItLoading) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }
}