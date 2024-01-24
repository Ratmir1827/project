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

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findAll(paginationDto: PaginationDto<UserDto>): Promise<PaginationDto<UserDto>> {
        const { page, limit } = paginationDto;

        const [users, totalItems] = await this.userRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        })

        const userDtos = users.map(user => new UserDto(user.id, user.name, user.surname, user.patronymic, user.email, user.phone))

        return new PaginationDto<UserDto>(page, limit, totalItems, userDtos);
    }

    async create(createUserDto: CreateUserDto): Promise<CreateUserInterface> {
        const findUser = await this.userRepository.findOneBy({ surname: createUserDto.surname });

        if (findUser) {
            throw new ExistingDataException('A user with the same surname already exists!')
        }

        const createUser = await this.userRepository.save(createUserDto);

        return {
            id: createUser.id,
            name: createUser.name,
            surname: createUser.surname,
            patronymic: createUser.patronymic,
            email: createUser.email,
            phone: createUser.phone,
        }
    }

    async update(updateUserDto: UpdateUserDto, id: string): Promise<UpdateUserInterface> {
        const findUser = await this.userRepository.findOneBy({ id: id})

        if (!findUser) {
            throw new NotFoundException('User not found!')
        }

        findUser.name = updateUserDto.name;
        findUser.surname = updateUserDto.surname;
        findUser.patronymic = updateUserDto.patronymic;
        findUser.email = updateUserDto.email;

        const save = await this.userRepository.save(findUser)

        return {
            id: save.id,
            name: save.name,
            surname: save.surname,
            patronymic: save.patronymic,
            email: save.email,
            phone: save.phone,
        };
    }

    async delete(id: string) {
        const findUser = await this.userRepository.findOneBy({ id: id })

        if (!findUser) {
            throw new NotFoundException('User not found!');
        }

        const deleteUser = await this.userRepository.remove(findUser);

        return 'User succsesful deleted!';
    }
}
