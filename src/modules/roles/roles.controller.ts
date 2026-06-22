import { Controller, Post, Body, Get, Param, Put, Patch, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly service:
        RolesService,
    ) {}

    /**
     * Metodo para crear un nuevo rol
     */
    @Post()
    async create(
        @Body() 
        dto: CreateRoleDto,
    ){
        return this.service.create(
            dto
        );
    }

    /** 
     * Metodo para obtener todos los roles
     */

    @Get()
    findAll(){
        return this.service.findAll();
    }

    /** 
     * Metodo para obtener un rol por su id
     */

    @Get(':id')
    findOne(
        @Param('id') id: string,
    ){
        return this.service.findOne(id);
    }


    /** 
     * Metodo para obtener roles inactivos
     */
    @Get('inactivos')
    findInactive(){
        return this.service.findInactive();
    }


    /** 
     * Metodo para actualizar un rol por su id
     */
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateRoleDto,
    ){
        return this.service.update(id, dto);
    }

    /** 
     * Metodo para actualizar parcialmente un rol por su id
     */
    @Patch(':id')
    partialUpdate(
        @Param('id') id:string,
        @Body() dto: UpdateRoleDto,
    ){
        return this.service.partialUpdate(id, dto);
    }

    /** 
     * Metodo para restablecer un rol eliminado
     */
    @Patch('restaurar/:id')
    restore(
        @Param('id') id: string,
    ){
        return this.service.restore(id);
    }

    /** 
     * Metodo para eliminar un rol por su id
     */
    @Delete(':id')
    remove(
        @Param('id') id: string,
    ){
        return this.service.remove(id);
    }
}