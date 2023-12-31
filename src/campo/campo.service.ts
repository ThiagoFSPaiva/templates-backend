import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampoEntity } from './entity/campo.entity';
import { Repository } from 'typeorm';
import { CreateCampoDto } from './dtos/createCampo.dto';

@Injectable()
export class CampoService {

    constructor(
        @InjectRepository(CampoEntity)
        private readonly campoRepository: Repository<CampoEntity>
    ) { }

    async createCampo(createCampo: CreateCampoDto, templateId: number): Promise<CampoEntity> {

        return this.campoRepository.save(
            {
                ...createCampo,
                templateId
            }
        );
    }


    async updateCampo(campo: CampoEntity): Promise<CampoEntity> {
        const existingCampo = await this.campoRepository.findOne({
            where: {
                id: campo.id
            }
        });

        if (!existingCampo) {
            throw new NotFoundException(`Campo id: ${campo.id} not found`);
        }


        existingCampo.name = campo.name;
        existingCampo.tipo = campo.tipo;

        return this.campoRepository.save(existingCampo);
    }


}
