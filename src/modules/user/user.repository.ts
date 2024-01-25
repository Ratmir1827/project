import { Injectable } from "@nestjs/common";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "src/dependencies/dto/pagination.dto";
import { UserDto } from "src/dependencies/dto/user.dto";
import { FindAllUsersInterface } from "./interfaces/find-all-users.interface";
import { FindOneUser } from "./interfaces/find-one-user.interface";
import { CreateUserDto } from "./dto/create.dto";
import { CreateUserInterface } from "./interfaces/create-user.interface";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userDbRepository: Repository<User>
    ) {}

    async findAllUsers(page: number, limit: number): Promise<FindAllUsersInterface> {
        const [users, totalItems] = await this.userDbRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        })

        return {
            usersArr: users,
            totalItems: totalItems,
        };
    }

    async findOneUserBySurname(surname: string): Promise<FindOneUser> {
        const findUser = await this.userDbRepository.findOneBy({ surname: surname});

        return findUser;
    }

    async findOneUserById(id: string): Promise<FindOneUser> {
        const findUserById = await this.userDbRepository.findOneBy({ id: id })

        return findUserById
     }

    async saveUser(createUserDto: CreateUserDto): Promise<CreateUserInterface> {
        const saveNewUser = await this.userDbRepository.save(createUserDto);

        return saveNewUser;
    }

    async removeUser(user: User) {
        await this.userDbRepository.remove(user);

        return;
    }
}