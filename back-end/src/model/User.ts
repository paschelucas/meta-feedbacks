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

    static stringToUserRole(input: string): UserRole{
        switch (input) {
            case 'admin':
              return UserRole.ADMIN;
            case 'mentor':
              return UserRole.MENTOR;
            case 'gestor':
              return UserRole.GESTOR;
            default:
              throw new Error("Invalid user role");
          }
    }


}

export enum UserRole{
    ADMIN = 'admin',
    MENTOR = 'mentor',
    GESTOR = 'gestor'
}