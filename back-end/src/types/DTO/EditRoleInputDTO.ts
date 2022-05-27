import { UserRole } from "../../model/User";

export interface EditRoleInputDTO {
    userName: string
    newRole: UserRole
}