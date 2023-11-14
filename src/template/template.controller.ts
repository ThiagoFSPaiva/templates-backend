import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dtos/createTemplate.dto';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';
import { ReturnTemplateDto } from './dtos/returnTemplate.dto';
import { ReturnTemplateAdminDto } from './dtos/returnTemplateAdmin.dto';
import { StatusType } from 'src/user/enum/status-type.enum';


@Controller('template')
export class TemplateController {
    constructor(
        private readonly templateService: TemplateService
    ) {}

    @Post('criar-template')
    @UsePipes(ValidationPipe)
    async createTemplateWithCampos(@Body() createTemplate: CreateTemplateDto, @UserId() userId: string) {
        console.log(userId, 'userId');
        return this.templateService.createTemplateWithFields(createTemplate,userId); 
    }

    @Get('listar-templates-por-id')
    async getTemplateByUser(@UserId() userId: string): Promise<ReturnTemplateDto[]> {
        return (await this.templateService.getTemplateByUser(userId)).map(template => new ReturnTemplateDto(template));
    }
    
    @Get('/listar-templates-ativos')
    async getTemplatesAtivos() : Promise<ReturnTemplateDto[]> {
        return (await this.templateService.getTemplatesAtivos()).map(template => new ReturnTemplateDto(template));
    }

    @Roles(UserType.Admin)
    @Get('ativos')
    async findAllActiveTemplatesWithAuthors(): Promise<ReturnTemplateAdminDto[]> {
      return (await this.templateService.getTemplatesActiveWithAuthors()).map(template => new ReturnTemplateAdminDto(template));
    }

    @Roles(UserType.Admin)
    @Get('pendentes')
    async findAllPendingTemplatesWithAuthors(): Promise<ReturnTemplateAdminDto[]> {
      return (await this.templateService.getTemplatesPendingWithAuthors()).map(template => new ReturnTemplateAdminDto(template));
    }


    @Roles(UserType.Admin)
    @Get('inativos')
    async findAllInactiveTemplatesWithAuthors(): Promise<ReturnTemplateAdminDto[]> {
      return (await this.templateService.getTemplatesInactiveWithAuthors()).map(template => new ReturnTemplateAdminDto(template));
    }

    @Patch(':id')
    async updateStatus(@Param('id') id: number, @Body() body: { status: StatusType }) {
      const { status } = body;
      return this.templateService.updateStatus(id, status); 
    }
}
