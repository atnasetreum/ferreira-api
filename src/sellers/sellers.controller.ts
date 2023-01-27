import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
  Query,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto, QuerySellerDto, UpdateSellerDto } from './dto';
import { JwtValidateGuard } from 'src/auth/guards';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { unlinkSync } from 'fs';

@Controller('sellers')
@UseGuards(JwtValidateGuard)
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './public/static/images/sellers',
        filename(req, file, callback) {
          const fileExtension = file.mimetype.split('/')[1];
          let fileName = `${uuid()}.${fileExtension}`;
          if (file.fieldname.startsWith('ref')) {
            fileName = 'REF-' + fileName;
          }
          callback(null, fileName);
        },
      }),
    }),
  )
  create(
    @Body() createSellerDto: CreateSellerDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 2048 })],
      }),
    )
    images: Array<Express.Multer.File>,
  ) {
    return this.sellersService.create(createSellerDto, images).catch((err) => {
      images.forEach((image) => {
        unlinkSync(image.path);
      });
      throw new BadRequestException(err?.message);
    });
  }

  @Get()
  findAll(@Query() query: QuerySellerDto) {
    return this.sellersService.findAll(query);
  }

  @Get('no-parent')
  findAllNoParent() {
    return this.sellersService.findAllNoParent();
  }

  @Get('basic')
  findAllBasic() {
    return this.sellersService.findAllBasic();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './public/static/images/sellers',
        filename(req, file, callback) {
          const fileExtension = file.mimetype.split('/')[1];
          let fileName = `${uuid()}.${fileExtension}`;
          if (file.fieldname.startsWith('ref')) {
            fileName = 'REF-' + fileName;
          }
          callback(null, fileName);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
    @UploadedFiles()
    images: Array<Express.Multer.File>,
  ) {
    return this.sellersService.update(+id, updateSellerDto, images);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellersService.remove(+id);
  }
}
