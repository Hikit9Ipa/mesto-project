// Создайте класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создавайте экземпляр класса FormValidator.

export class FormValidator {
    constructor(enableValidationParams, formElement) {
        this._formElement = formElement;
        this._inputSelector = enableValidationParams.inputSelector;
        this._submitButtonSelector = enableValidationParams.submitButtonSelector;
        this._submitButtonDisabled = enableValidationParams.submitButtonDisabled;
        this._inputErrorClass = enableValidationParams.inputErrorClass;
        this._errorClass = enableValidationParams.errorClass;
    }

    //Показываем ошибку
    _showInputError(inputElement,errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}_error`);
        inputElement.classList.add( this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    //Убираем ошибку
    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}_error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    //Проверяем валидность input
    isValid (inputElement) {
        if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage);
        } else {
        hideInputError(inputElement);
        }
    }

    //Проверяем все ли input прошли валидацию
    _hasInvalidInput() {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    disableSubmitButton() {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._submitButtonDisabled);
    }

    enableSubmitButton() {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._submitButtonDisabled);
    }

    //блокируем кнопку
    toggleButtonState = (inputList, buttonElement) => {
        if (hasInvalidInput(inputList)) {
            this.disableSubmitButton(buttonElement,true)
        } else {
            this.enableSubmitButton(buttonElement,false)
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