import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { Inegi } from './entities/inegi.entity';

@Injectable()
export class InegiService {
  private readonly logger = new Logger(InegiService.name);

  constructor(
    @InjectRepository(Inegi)
    private readonly inegiRepository: Repository<Inegi>,
    private readonly commonService: CommonService,
  ) {}

  async entidades() {
    try {
      const entidades = await this.inegiRepository
        .createQueryBuilder()
        .select('entidad')
        .groupBy('entidad')
        .execute();
      return entidades;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'entidades',
        error,
        logger: this.logger,
      });
    }
  }

  async municipios(entidad: string) {
    try {
      const municipios = await this.inegiRepository
        .createQueryBuilder()
        .select('municipio')
        .where('entidad= :entidad', { entidad })
        .groupBy('municipio')
        .execute();
      return municipios;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'municipios',
        error,
        logger: this.logger,
      });
    }
  }

  async localidades(entidad: string, municipio: string) {
    try {
      const municipios = await this.inegiRepository
        .createQueryBuilder()
        .select('localidad')
        .where('entidad= :entidad', { entidad })
        .andWhere('municipio= :municipio', { municipio })
        .execute();
      return municipios;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'localidades',
        error,
        logger: this.logger,
      });
    }
  }
}
