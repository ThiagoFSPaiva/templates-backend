import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entity/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService

    ){}

    async createAddress(createAddress: CreateAddressDto, userId: number) : Promise<AddressEntity> {

        await this.userService.getUserById(userId);
        await this.cityService.getCitybyId(createAddress.cityId);
        return this.addressRepository.save({
            ...createAddress,
            userId,
        })
    }

    async getAllAddress() : Promise<AddressEntity[]> {
        const address = await this.addressRepository.find();

        if(!address || address.length === 0) {
            throw new NotFoundException('No address found');
        }

        return address;
    }
}
