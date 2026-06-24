import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SeguidoresService } from './seguidores.service';
import { FollowDto } from './dto/follow.dto';

@ApiTags('Seguidores')
@Controller('seguidores')
export class SeguidoresController {
  constructor(private readonly seguidoresService: SeguidoresService) {}

  @Post('seguir')
  @ApiOperation({ summary: 'Seguir a un usuario de la plataforma' })
  seguir(@Body() followDto: FollowDto) {
    return this.seguidoresService.seguir(followDto);
  }

  @Post('dejar-seguir')
  @ApiOperation({ summary: 'Dejar de seguir a un usuario' })
  dejarSeguir(@Body() followDto: FollowDto) {
    return this.seguidoresService.dejarSeguir(followDto);
  }

  @Get('siguiendo/:usuarioId')
  @ApiOperation({ summary: 'Listar a quiénes está siguiendo el usuario' })
  getSiguiendo(@Param('usuarioId') usuarioId: string) {
    return this.seguidoresService.getSiguiendo(usuarioId); // 👈 Letras exactas para el servicio
  }

  @Get('seguidores/:usuarioId')
  @ApiOperation({ summary: 'Listar quiénes siguen al usuario' })
  getSeguidores(@Param('usuarioId') usuarioId: string) {
    return this.seguidoresService.getSeguidores(usuarioId); // 👈 Letras exactas para el servicio
  }
}