import { UserRole } from "../model/User"

export type FindUserResponse = {
    user_id: string
    user_name: string
    user_email: string
    user_role: UserRole
}[]