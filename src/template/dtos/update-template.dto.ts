import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, Length, ValidateNested } from "class-validator";
import { CreateCampoDto } from "src/campo/dtos/createCampo.dto";

export class UpdateTemplateDto {

    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    @IsString()
    name: string;


    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    @IsString()
    extensao: string;


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCampoDto)
    campo: CreateCampoDto[];

    @IsNumber()
    categoryId: number;

}