export default class UserModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        users.push(this);
    }

    static getUser(email, password) {
        return users.find(u => u.email === email && u.password === password);
    }
}


const users = [
    { name: "john", email: "john@gmail.com", password: '1234' }
]