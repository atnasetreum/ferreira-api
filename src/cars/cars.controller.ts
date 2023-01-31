import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';
import { v4 as uuid } from 'uuid';
import { unlinkSync } from 'fs';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/static/images/cars',
        filename(req, file, callback) {
          const fileExtension = file.mimetype.split('/')[1];
          const fileName = `${uuid()}.${fileExtension}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  create(
    @Body() createCarDto: CreateCarDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.carsService.create(createCarDto, image).catch((err) => {
      unlinkSync(image.path);
      throw new BadRequestException(err?.message);
    });
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
