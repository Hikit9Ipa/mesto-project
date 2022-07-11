// Класс UserInfo отвечает за управление информацией о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Данные для этого метода нужно получать от методов класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo. Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.

export default class  UserInfo{
    constructor({userName,userInfo,userAvatar})
    {
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo);
        this._userAvatar = document.querySelector(userAvatar);
    }
    getUserInfo(){
        this._user ={
            name: this._userName.textContent,
            about: this._userInfo.textContent,
        }
        return this._user;
    }
    setUserInfo(data) {
       this._userName.textContent = data.name;
       this._userInfo.textContent = data.about;
    }
      setUserAvatar(data) {
        this._userAvatar.src = data.avatar;
      }
}
