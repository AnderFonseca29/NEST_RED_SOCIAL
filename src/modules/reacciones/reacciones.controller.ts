import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReaccionesService } from './reacciones.service';
import { ToggleReaccionDto } from './dto/toggle-reaccion.dto';

@ApiTags('Reacciones')
@Controller('reacciones')
export class ReaccionesController {
  constructor(private readonly reaccionesService: ReaccionesService) {}

  @Post('toggle')
  @ApiOperation({})
  toggleReaccion(@Body() toggleReaccionDto: ToggleReaccionDto) {
    return this.reaccionesService.toggle(toggleReaccionDto);
  }

  @Get('publicacion/:publicacionId')
  @ApiOperation({})
  findByPublicacion(@Param('publicacionId') publicacionId: string) {
    return this.reaccionesService.findByPublicacion(publicacionId);
  }
}