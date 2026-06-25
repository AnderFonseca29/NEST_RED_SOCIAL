import { Body, Controller, Post, Param, Get, Put, Delete, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { UsuariosService } from "./usuarios.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";

@ApiTags('Usuarios')
@Controller('Usuarios')
export class UsuariosController {
  constructor(
    private readonly service: UsuariosService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  create(
    @Body()
    dto: CreateUserDto
  ) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios activos' })
  findAll(
    @Query()
    search: SearchUserDto
  ) {
    return this.service.findAll(search);
  }

  // ✨ NUEVA RUTA: Obtiene la lista de usuarios con eliminación lógica (activo: false)
  // Se ubica antes de ':id' para evitar que NestJS confunda la palabra 'inactivos' con un ID.
  @Get('inactivos')
  @ApiOperation({ summary: 'Obtener todos los usuarios inactivos' })
  findInactives() {
    return this.service.findInactives();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  findOne(
    @Param('id')
    id: string
  ) {
    return this.service.findOne(id);
  }
  
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  Update(
    @Param('id')
    id: string,
    @Body() 
    dto: CreateUserDto
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario (Desactivación lógica)' })
  remove(
    @Param('id')
    id: string
  ) {
    return this.service.remove(id);
  }
}