import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/dependencies/dto/pagination.dto';
import { UserDto } from 'src/dependencies/dto/user.dto';

@ApiBearerAuth()
@ApiTags('User-public')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('user')
export class UserPublicController {
    constructor(private readonly userService: UserService) {}

    @Get('find/all')
    findAll(@Query() paginationDto: PaginationDto<UserDto>) {
        return this.userService.findAll(paginationDto);
    }
}
