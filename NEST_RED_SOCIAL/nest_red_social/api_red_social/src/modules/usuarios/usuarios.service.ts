import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; // Asegúrate de que esté importado

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto) {
    const exists = await this.userModel.findOne({ correo: dto.correo });

    if (exists) {
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
    const filter: Record<string, any> = { activo: true };
    if (search.nombre) {
      filter.nombre = {
        $regex: search.nombre,
        $options: 'i',
      };
    }

    const page = Number(search.page) || 1;
    const limit = Number(search.limit) || 10;

    // Optimización opcional: ejecutar find y count en paralelo con Promise.all
    const [data, total] = await Promise.all([
      this.userModel
        .find(filter)
        .populate('rol_id')
        .skip((page - 1) * limit)
        .limit(limit),
      this.userModel.countDocuments(filter),
    ]);

    return ResponseHelper.succes({ total, page, limit, data });
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).populate('rol_id');
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return ResponseHelper.succes(user);
  }

  // CORREGIDO: Cambiado CreateUserDto por UpdateUserDto para solucionar el error del controlador
  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return ResponseHelper.succes(updatedUser);
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // CORREGIDO: Se agregó { new: true } para que devuelva el usuario modificado con activo: false
    const deleteUser = await this.userModel.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true },
    );

    return ResponseHelper.succes(deleteUser);
  }
}
