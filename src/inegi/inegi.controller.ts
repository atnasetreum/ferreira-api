import { Controller, Get, Query } from '@nestjs/common';
import { InegiService } from './inegi.service';

@Controller('inegi')
export class InegiController {
  constructor(private readonly inegiService: InegiService) {}

  @Get('entidades')
  entidades() {
    return this.inegiService.entidades();
  }

  @Get('municipios')
  municipios(@Query('entidad') entidad: string) {
    return this.inegiService.municipios(entidad);
  }

  @Get('localidades')
  localidades(
    @Query('entidad') entidad: string,
    @Query('municipio') municipio: string,
  ) {
    return this.inegiService.localidades(entidad, municipio);
  }
}
