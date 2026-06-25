import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-role.dto';
import { UpdateRolesDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  /**
   * Metodo para crear un nuevo rol
   */
  @Post()
  async create(@Body() dto: CreateRolesDto) {
    return await this.service.create(dto);
  }

  /**
   * Metodo para obtener todos los roles activos
   */
  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  /**
   * Metodo para obtener todos los roles inactivos (borrados lógicamente)
   */
  @Get('inactivo')
  async findInactive() {
    return await this.service.findInactive();
  }

  /**
   * Metodo para obtener un rol por su id
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  /**
   * Metodo para actualizar un rol por su id (Reemplazo total)
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRolesDto) {
    return await this.service.update(id, dto);
  }

  /**
   * Metodo para actualizar parcialmente un rol por su id
   */
  @Patch(':id')
  async partialUpdate(@Param('id') id: string, @Body() dto: UpdateRolesDto) {
    return await this.service.updatePartial(id, dto);
  }

  /**
   * Restaurar rol eliminado lógicamente
   */
  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    // 💡 Sincronizado con el método restore de tu servicio usando await
    return await this.service.restore(id);
  }

  /**
   * Metodo para eliminar (lógicamente) un rol por su id
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}