
// import {
//   enableValidationParams,
// } from "./variables.js";
// import { openPopup, closePopup } from "./modal.js";





// const showInputError = (formElement,inputElement,errorMessage,enableValidationParams) => {
//   // Находим элемент ошибки внутри самой функции
//   const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
//   // Остальной код такой же
//   inputElement.classList.add(enableValidationParams.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(enableValidationParams.errorClass);
// };

// const hideInputError = (formElement, inputElement, enableValidationParams) => {
//   // Находим элемент ошибки
//   const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
//   // Остальной код такой же
//   inputElement.classList.remove(enableValidationParams.inputErrorClass);
//   errorElement.classList.remove(enableValidationParams.errorClass);
//   errorElement.textContent = "";
// };
// // Функция, которая проверяет валидность поля
// const isValid = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     // showInputError теперь получает параметром форму, в которой
//     // находится проверяемое поле, и само это поле
//     console.log('false');
//     console.log('true');
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       enableValidationParams
//     );
//   } else {
//     console.log('true');
//     // hideInputError теперь получает параметром форму, в которой
//     // находится проверяемое поле, и само это поле
//     hideInputError(formElement, inputElement, enableValidationParams);
//   }
// };

// const toggleButtonState = (inputList, buttonElement) => {
//   // Если есть хотя бы один невалидный инпут
//   if (hasInvalidInput(inputList)) {
//     // сделай кнопку неактивной
//     firstValidateForm(buttonElement,true)
//   } else {
//         // иначе сделай кнопку активной
//     firstValidateForm(buttonElement,false)
//   }
// }; 

// // Вызовем функцию isValid на каждый ввод символа
// const setEventListeners = (formElement, enableValidationParams) => {
//   // Находим все поля внутри формы,
//   // сделаем из них массив методом Array.from
//   const inputList = Array.from(
//     formElement.querySelectorAll(enableValidationParams.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(
//     enableValidationParams.submitButtonSelector
//   );
//   toggleButtonState(inputList, buttonElement, enableValidationParams);

//   // Обойдём все элементы полученной коллекции
//   inputList.forEach((inputElement) => {
//     // каждому полю добавим обработчик события input
//     inputElement.addEventListener("input", () => {
//       // Внутри колбэка вызовем isValid,
//       // передав ей форму и проверяемый элемент
//       isValid(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement, enableValidationParams);
//     });
//   });
// };
// const enableValidation = (enableValidationParams) => {
//   // Найдём все формы с указанным классом в DOM,
//   // сделаем из них массив методом Array.from
//   const formList = Array.from(
//     document.querySelectorAll(enableValidationParams.formSelector)
//   );
//   // Переберём полученную коллекцию
//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", (evt) => {
//       // У каждой формы отменим стандартное поведение
//       evt.preventDefault();
//     });

//     // Для каждой формы вызовем функцию setEventListeners,
//     // передав ей элемент формы
//     setEventListeners(formElement, enableValidationParams);
//   });
// };
// // Функция принимает массив полей

// const hasInvalidInput = (inputList) => {
//   // проходим по этому массиву методом some
//   return inputList.some((inputElement) => {
//     // Если поле не валидно, колбэк вернёт true
//     // Обход массива прекратится и вся функция
//     // hasInvalidInput вернёт true

//     return !inputElement.validity.valid;
//   });
// };
// function firstValidateForm(formElement,a){
//   formElement.disabled = a;
//   if(a){  formElement.classList.add(enableValidationParams.inactiveButtonClass);}
//   else{formElement.classList.remove(enableValidationParams.inactiveButtonClass);}
// }
   

// export{enableValidation,firstValidateForm }
