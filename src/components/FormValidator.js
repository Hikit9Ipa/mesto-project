export class FormValidator {
    constructor(enableValidationParams, formElement) {
        this._formElement = formElement;
        this._inputSelector = enableValidationParams.inputSelector;
        this._submitButtonSelector = enableValidationParams.submitButtonSelector;
        this._inactiveButtonClass = enableValidationParams.inactiveButtonClass;
        this._inputErrorClass = enableValidationParams.inputErrorClass;
        this._errorClass = enableValidationParams.errorClass;
    }

    //Показываем ошибку
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        console.log(errorElement);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    //Убираем ошибку
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    //Проверяем валидность input
    _isValid (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    //Проверяем все ли input прошли валидацию
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    inactiveSubmitButton() {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._inactiveButtonClass);
    }

    activeSubmitButton() {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._inactiveButtonClass);
    }

    //блокируем кнопку
    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.inactiveSubmitButton();
        } else {
            this.activeSubmitButton();
        }
    }

    resetValidation() {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
    }

    //Вызываем функцию isValid на каждый ввод символа
    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this.toggleButtonState();
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners();
    }
}