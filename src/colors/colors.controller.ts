import { Controller, Get } from '@nestjs/common';
import { ColorsService } from './colors.service';

@Controller('colors')
export class ColorsController {
    constructor(
        private readonly colorsService: ColorsService
    ) { }

    @Get()
    async getAllColors() {
        return this.colorsService.getAllColors();
    }
}
