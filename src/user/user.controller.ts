import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';



@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto ) : Promise<UserEntity>{
        return this.userService.createUser(createUser);
    }

    @Get()
    async getAllUser(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUsers()).map(
          (userEntity) => new ReturnUserDto(userEntity),
        );
      }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
        return new ReturnUserDto(
          await this.userService.getUserById(userId),
        );
    }

    @Get('/matricula/:matricula')
    async getUserByMatricula(matricula: string) : Promise<ReturnUserDto> {
      return new ReturnUserDto(
        await this.userService.getUserByMatricula(matricula),
      );
    }


    @Get('/:userId/templates')
    async getUserByKCT(@Param('userId') userId: number): Promise<UserEntity> {
        return this.userService.getUserByKCT(userId);
    }
    
}