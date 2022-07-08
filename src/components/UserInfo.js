// Класс UserInfo отвечает за управление информацией о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Данные для этого метода нужно получать от методов класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo. Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.

export default class  UserInfo{
    constructor({userName,userInfo,userAvatar})
    {
        this._userName = userName;
        this._userInfo = userInfo;
        this._userAvatar = userAvatar;
       // console.log("this._userAvatar");
       // console.log(this._userAvatar);
        //console.log("this._userAvatar");
    }
    getUserInfo(){
        const userinfo ={
            name: this._userName.textContent,
            about: this._userInfo.textContent,
            avatar:this._userAvatar.src
        };
        return userinfo;
    }
    setUserInfo(data) {
       // console.log("setUserInfo");
       // console.log(data.name);
        //console.log(data.about);
        //console.log(data.avatar);
       // console.log("setUserInfo");
       this._userName = data.name;
       this._userInfo = data.about;
        this._userAvatar.src = data.avatar;
      }
}
