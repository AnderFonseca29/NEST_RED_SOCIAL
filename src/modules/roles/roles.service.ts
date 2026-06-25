import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles, RolesDocument } from './schemas/roles.schema';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateRolesDto } from './dto/create-role.dto';
import { UpdateRolesDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles.name)
    private rolesModel: Model<RolesDocument>,
  ) {}

  /**
   * Método para crear un nuevo rol
   */
  async create(dto: CreateRolesDto) {
    const roles = await this.rolesModel.create(dto);
    return ResponseHelper.succes(roles, 201);
  }

  /**
   * Metodo para consultar roles activos
   */
  async findAll() {
    const roles = await this.rolesModel.find({ activo: true });
    return ResponseHelper.succes(roles);
  }

  /**
   * Metodo para consultar roles inactivos
   */
  async findInactive() {
    const roles = await this.rolesModel.find({ activo: false });
    return ResponseHelper.succes(roles);
  }

  /**
   * Buscar un rol por id
   */
  async findOne(id: string) {
    const roles = await this.rolesModel.findById(id);

    if (!roles) {
      throw new NotFoundException('No se encontro el rol');
    }

    return ResponseHelper.succes(roles);
  }

  /**
   * Actualizar un rol
   */
  async update(id: string, dto: UpdateRolesDto) {
    const updatedRoles = await this.rolesModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updatedRoles) {
      throw new NotFoundException('No se encontro el rol');
    }

    return ResponseHelper.succes(updatedRoles);
  }

  /**
   * ACTUALIZAR UN ROL PARCIALMENTE
   */
  async updatePartial(id: string, dto: UpdateRolesDto) {
    const updatedRoles = await this.rolesModel.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true },
    );

    if (!updatedRoles) {
      throw new NotFoundException('No se encontro el rol');
    }

    return ResponseHelper.succes(updatedRoles);
  }

  /**
   * eliminacion logica
   */
  async remove(id: string) {
    const roles = await this.rolesModel.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true },
    );

    if (!roles) {
      throw new NotFoundException('No se encontro el rol');
    }

    return ResponseHelper.succes(roles);
  }

  /**
   * Restaurar un rol eliminado lógicamente
   */
  async restore(id: string) {
    // 💡 Cambiado a 'restore' para coincidir exactamente con tu controlador y optimizado en un paso
    const restoredRole = await this.rolesModel.findByIdAndUpdate(
      id,
      { activo: true },
      { new: true },
    );

    if (!restoredRole) {
      throw new NotFoundException('No se encontro el rol');
    }

    return ResponseHelper.succes(restoredRole);
  }
}