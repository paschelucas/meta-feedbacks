import { UserRole } from "../model/User"

export type FindByEmailResponse = {
    user_id: string
    user_name: string
    user_email: string
    user_password: string
    user_role: UserRole
}[]