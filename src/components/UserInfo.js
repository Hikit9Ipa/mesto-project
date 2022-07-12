export default class  UserInfo{
    constructor({userName,userInfo,userAvatar}) {
        this._name = document.querySelector(userName);
        this._about = document.querySelector(userInfo);
        this._avatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        this._user = {
            name: this._name.textContent,
            about: this._about.textContent,
        }
        return this._user;
    }

    setUserInfo(data) {
       this._name.textContent = data.name;
       this._about.textContent = data.about;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
    }
}
