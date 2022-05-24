export default class User {
    
    constructor (
    private user_id: string,
    private user_name: string,
    private user_email: string,
    private user_password: string,
    private user_role: UserRole
    ){}
    
    getUserId() {
        return this.user_id
    }

    getUserName(){
        return this.user_name
    }

    getUserEmail(){
        return this.user_email
    }

    getUserPassword(){
        return this.user_password
    }

    getUserRole(){
        return this.user_role
    }


}

export enum UserRole{
    ADMIN = 'admin',
    MENTOR = 'mentor',
    GESTOR = 'gestor'
}