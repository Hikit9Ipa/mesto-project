// Класс UserInfo отвечает за управление информацией о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Данные для этого метода нужно получать от методов класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo. Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.

//import { data } from "jquery";

export default class  UserInfo{
    constructor({userName,userInfo,userAvatar}){
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo);
        this._userAvatar = document.querySelector(userAvatar);


    }
    getUserInfo(){

        return {
            userName: this._userName.textContent,
            userInfo: this._userInfo.textContent,
            userAvatar:this._userAvatar.src
        };
    }
    setUserInfo(username, userInfo,userAvatar) {
        this._userName.textContent = username;
        this._userInfo.textContent = userInfo;
        this._userAvatar.src = userAvatar
      }
}
