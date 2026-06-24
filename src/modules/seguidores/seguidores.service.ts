import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seguidor } from './schemas/seguidor.schema';
import { FollowDto } from './dto/follow.dto';

@Injectable()
export class SeguidoresService {
  constructor(
    @InjectModel(Seguidor.name) private readonly seguidorModel: Model<Seguidor>,
  ) {}

  async seguir(dto: FollowDto): Promise<{ mensaje: string; exito: boolean }> {
    if (dto.seguidor === dto.seguido) {
      throw new BadRequestException('Un usuario no puede seguirse a sí mismo');
    }

    const yaSigue = await this.seguidorModel.findOne({ seguidor: dto.seguidor, seguido: dto.seguido }).exec();
    if (yaSigue) {
      throw new BadRequestException('Ya estás siguiendo a este usuario');
    }

    const nuevoSeguimiento = new this.seguidorModel(dto);
    await nuevoSeguimiento.save();

    return { 
      mensaje: '¡Operación exitosa! Ahora sigues a este usuario.', 
      exito: true 
    };
  }

  async dejarSeguir(dto: FollowDto): Promise<{ mensaje: string; exito: boolean }> {
    const resultado = await this.seguidorModel.findOneAndDelete({ seguidor: dto.seguidor, seguido: dto.seguido }).exec();
    
    if (!resultado) {
      throw new BadRequestException('No puedes dejar de seguir a alguien que no sigues');
    }

    return { 
      mensaje: '¡Operación exitosa! Has dejado de seguir al usuario correctamente.', 
      exito: true 
    };
  }

  // 👈 Nombres en minúscula inicial para acoplarse al controlador
  async getSiguiendo(usuarioId: string): Promise<Seguidor[]> {
    return await this.seguidorModel.find({ seguidor: usuarioId }).populate('seguido').exec();
  }

  async getSeguidores(usuarioId: string): Promise<Seguidor[]> {
    return await this.seguidorModel.find({ seguido: usuarioId }).populate('seguidor').exec();
  }
}