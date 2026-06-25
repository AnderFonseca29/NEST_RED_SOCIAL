import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReaccionesService } from './reacciones.service';
import { ToggleReaccionDto } from './dto/toggle-reaccion.dto';

@ApiTags('Reacciones')
@Controller('reacciones')
export class ReaccionesController {
  constructor(private readonly reaccionesService: ReaccionesService) {}

  @Post('toggle')
  @ApiOperation({ summary: 'Alternar reacción (Crear si no existe, eliminar si existe)' })
  toggleReaccion(@Body() toggleReaccionDto: ToggleReaccionDto) {
    return this.reaccionesService.toggle(toggleReaccionDto);
  }

  @Get('publicacion/:publicacionId')
  @ApiOperation({ summary: 'Obtener todas las reacciones de una publicación' })
  findByPublicacion(@Param('publicacionId') publicacionId: string) {
    return this.reaccionesService.findByPublicacion(publicacionId);
  }

  // ✨ NUEVO ENDPOINT: Eliminar reacción de una publicación específica
  @Delete('publicacion/:publicacionId')
  @ApiOperation({ summary: 'Eliminar de forma definitiva la reacción de un usuario en una publicación' })
  removeReaccion(
    @Param('publicacionId') publicacionId: string,
    @Body() toggleReaccionDto: ToggleReaccionDto // Enviamos el DTO para identificar al usuario
  ) {
    return this.reaccionesService.removeReaccion(publicacionId, toggleReaccionDto);
  }

  // ✨ NUEVO ENDPOINT: Cambiar el tipo de reacción (ej. de "like" a "encanta")
  @Put('publicacion/:publicacionId')
  @ApiOperation({ summary: 'Actualizar o cambiar el tipo de reacción de un usuario en una publicación' })
  updateReaccion(
    @Param('publicacionId') publicacionId: string,
    @Body() toggleReaccionDto: ToggleReaccionDto // Enviamos el DTO con el nuevo tipo de reacción
  ) {
    return this.reaccionesService.updateReaccion(publicacionId, toggleReaccionDto);
  }
}