import { Controller, Get } from '@nestjs/common';
import { StateEntity } from './entity/state.entity';
import { StateService } from './state.service';

@Controller('state')
export class StateController {

    constructor(private readonly stateService: StateService){}

    @Get()
    async getAllStates() : Promise<StateEntity[]> {
        return this.stateService.getAllStates();
    }
}
