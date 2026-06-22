import { Body, Controller, Post, Param, Get, Put, Delete, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger"
import { UsuariosService } from "./usuarios.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";

@ApiTags('Usuarios')
@Controller('Usuarios')

export class UsuariosController{
  constructor(
    private readonly service:
    UsuariosService,
  ){}

  @Post()
  create(
    @Body()
    dto:CreateUserDto
  ){
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query()
    search:SearchUserDto
  ){
    return this.service.findAll(search);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id:string
  ){
    return this.service.findOne(id);
  }
  
  @Put(':id')
  Update(
    @Param('id')
    id:string,
    @Body() 
    dto: CreateUserDto
  ){
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id:string
  ){
    return this.service.remove(id);
  }

}