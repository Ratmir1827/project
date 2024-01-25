import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { ExistingDataException } from 'src/exeptions/existing-data.exeption';
import { CreateUserInterface } from './interfaces/create-user.interface';
import { UpdateUserInterface } from './interfaces/update-user.interface';
import { PaginationDto } from 'src/dependencies/dto/pagination.dto';
import { UserDto } from 'src/dependencies/dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async findAll(paginationDto: PaginationDto<UserDto>): Promise<PaginationDto<UserDto>> {
        const { page, limit } = paginationDto;

        const findAllUsers = await this.userRepository.findAllUsers(paginationDto.page, paginationDto.limit);

        const userDtos = findAllUsers.usersArr.map(user => new UserDto(user.id, user.name, user.surname, user.patronymic, user.email, user.phone))

        return new PaginationDto<UserDto>(page, limit, findAllUsers.totalItems, userDtos);
    }

    async create(createUserDto: CreateUserDto): Promise<CreateUserInterface> {
        const findUser = await this.userRepository.findOneUserBySurname(createUserDto.surname);

        if (findUser) {
            throw new ExistingDataException('A user with the same surname already exists!')
        }

        const createUser = await this.userRepository.saveUser(createUserDto);

        return createUser;
    }

    async update(updateUserDto: UpdateUserDto, id: string): Promise<UpdateUserInterface> {
        const findUser = await this.userRepository.findOneUserById(id);

        if (!findUser) {
            throw new NotFoundException('User not found!')
        }

        findUser.name = updateUserDto.name;
        findUser.surname = updateUserDto.surname;
        findUser.patronymic = updateUserDto.patronymic;
        findUser.email = updateUserDto.email;

        const saveUser = await this.userRepository.saveUser(findUser);

        return saveUser;
    }

    async delete(id: string) {
        const findUser = await this.userRepository.findOneUserById(id);

        if (!findUser) {
            throw new NotFoundException('User not found!');
        }

        await this.userRepository.removeUser(findUser);

        return 'User succsesful deleted!';
    }
}
