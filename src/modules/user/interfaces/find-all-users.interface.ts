import { User } from "../entity/user.entity";

export interface FindAllUsersInterface {
    usersArr: User[];
    totalItems: number;
}