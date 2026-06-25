import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@ApiTags('Comentarios')
@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  @ApiOperation({})
  create(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentariosService.create(createComentarioDto);
  }

  @Get('publicacion/:publicacionId')
  @ApiOperation({})
  findByPublicacion(@Param('publicacionId') publicacionId: string) {
    return this.comentariosService.findByPublicacion(publicacionId);
  }

  @Get(':id')
  @ApiOperation({})
  findOne(@Param('id') id: string) {
    return this.comentariosService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({})
  remove(@Param('id') id: string) {
    return this.comentariosService.remove(id);
  }
}