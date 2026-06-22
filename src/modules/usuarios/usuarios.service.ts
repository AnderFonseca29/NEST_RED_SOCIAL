import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user-schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { SearchUserDto } from './dto/search-user.dto';
import { find } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto) {
    // 1. Verificación de correo
    const exists = await this.userModel.findOne({ correo: dto.correo });

    // si exite correo
    if(exists) {
      throw new BadRequestException('Correo ya registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    });
    return ResponseHelper.succes(user, 201);
  }

  async findAll(search: SearchUserDto) {
    // 1. Crear filtros
    const filter: any = { activo: true };

    if (search.nombre) {
      filter.nombre= {
        $regex: search.nombre,
        $options: 'i',
      };
    }

    // 2. Variables de paginación
    const page= Number(search.page) || 1;
    const limit= Number(search.limit) || 10;

    // 3. Consulta

    const data = await this.userModel.find(filter).populate('rol_id').skip((page - 1) * limit).limit(limit);
    // 4. Contador de documentos= contador de usuarios
    const total = await this.userModel.countDocuments(filter);

    return ResponseHelper.succes({ total, page, limit, data });

    /**
     * consulta por id de usuario
     */
  }
    async findOne(id: string ) {

      const user = await this.userModel.findById(id);
      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }
      return ResponseHelper.succes(user);
    }

    /**
     * Actuslización de usuario
     */

    async update(id: string, dto: CreateUserDto) {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }

      if(dto.password){
        dto.password = await bcrypt.hash(dto.password,10);
      }


      const updatedUser = await this.userModel.findByIdAndUpdate(id, dto, {new: true});
      return ResponseHelper.succes(updatedUser);
    }
    
    /**
     * Eliminación logica
     */

    async remove(id: string) {
        const user = await this.userModel.findById(id);

        if (!user) {
          throw new NotFoundException('Usuario no encontrado');
        }

        const deletedUser = await this.userModel.findByIdAndUpdate(id, { activo: false });
        return ResponseHelper.succes(deletedUser);
        }


}