import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';

@ApiTags('Publicaciones') // 👈 Esto lo organiza de forma impecable en tu Swagger UI
@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  @Post()
  @ApiOperation({})
  create(@Body() createPublicacionDto: CreatePublicacionDto) {
    return this.publicacionesService.create(createPublicacionDto);
  }

  @Get()
  @ApiOperation({})
  findAll() {
    return this.publicacionesService.findAll();
  }

  @Get(':id')
  @ApiOperation({})
  findOne(@Param('id') id: string) {
    return this.publicacionesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({})
  update(@Param('id') id: string, @Body() updatePublicacionDto: UpdatePublicacionDto) {
    return this.publicacionesService.update(id, updatePublicacionDto);
  }

  @Delete(':id')
  @ApiOperation({})
  remove(@Param('id') id: string) {
    return this.publicacionesService.remove(id);
  }
}