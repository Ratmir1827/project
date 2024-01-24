import { Body, Controller, Delete, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create.dto';
import { UpdateUserDto } from '../dto/update.dto';

@ApiBearerAuth()
@ApiTags('User-admin')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('user')
export class UserAdminController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Put('update/:id')
    update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
        return this.userService.update(updateUserDto, id);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
