import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Role, RoleDocument } from './schemas/roles.schema';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';


@Injectable()
export class RolesService {
    constructor( 
        @InjectModel(Role.name) 
        private roleModel: 
        Model<RoleDocument>,
    ) {}

    /** 
     * Metodo para crear un nuevo rol
     */

    async create(
        dto:   CreateRoleDto,
    ){
        const role=
        await this.roleModel.create(dto);

        return ResponseHelper.succes(
            role,
            201,
        );
    }

    /** 
     * Metodo para obtener todos los roles
     */

    async findAll(){
        const roles=
        await this.roleModel.find({ active: true });

        return ResponseHelper.succes(
            roles,
        );
    } 
    
   
        /** 
     * Consulta para obtener roles eliminados
     */

    async findInactive(){
        const roles=
        await this.roleModel.find({ active: false });

        return ResponseHelper.succes(
            roles,
        );
    }

    



    /** 
     * Metodo para obtener un rol por su id
     */

    async findOne(
        id: string,
    ){
        const role= await this.roleModel.findById(id);

        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return ResponseHelper.succes(role,);    
    }


     /** 
     * Consultar roles inactivos
     */



    /** 
     * Metodo para actualizar un rol por su id
     */

    async update(
        id: string,
        dto: UpdateRoleDto,
    ){
        const role= await this.roleModel.findById(id);

        if (!role) {
            throw new NotFoundException('Role not found');
        }

        const updatedRole= await this.roleModel.findByIdAndUpdate(id, dto, { new: true });

        return ResponseHelper.succes(updatedRole,);

    }

        /** 
         * Metodo para actualizar un rol por su id
         */

        async partialUpdate(id:string, dto:UpdateRoleDto){
            const role = await this.roleModel.findById(id);

            if (!role) {
                throw new NotFoundException('Rol no encontrado');
            }

            const updatedRole = await this.roleModel.findByIdAndUpdate(id, {$set: dto}, { new: true });
            return ResponseHelper.succes(updatedRole,);
        }

        /** 
         * Metodo para eliminar un rol por su id
         */

        async remove(id: string) {
            const role = await this.roleModel.findById(id);

            if (!role) {
                throw new NotFoundException('Role no encontrado');
            }
            
            const deletedRole = await this.roleModel.findByIdAndUpdate(id, { active: false }, { new: true });
            return ResponseHelper.succes(deletedRole,);
        }

        /** 
         * Restablecer un rol eliminado
         */

        async restore(id: string) {
            const role = await this.roleModel.findById(id);

            if (!role) {
                throw new NotFoundException('Role no encontrado');
            }

            const restoredRole = await this.roleModel.findByIdAndUpdate(id, { active: true }, { new: true });
            return ResponseHelper.succes(restoredRole,);
        }

}