import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly surname: string;

    @ApiProperty()
    readonly patronymic: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly phone: string;

    constructor(id: string, name: string, surname: string, patronymic: string, email: string, phone: string) {
        this.id = id,
        this.name = name,
        this.surname = surname,
        this.patronymic = patronymic,
        this.email = email,
        this.phone = phone
    }
}
