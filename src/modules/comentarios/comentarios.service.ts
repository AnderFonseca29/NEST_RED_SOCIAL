import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comentario } from './schemas/comentario.schema';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectModel(Comentario.name) private readonly comentarioModel: Model<Comentario>,
  ) {}

  async create(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    const nuevoComentario = new this.comentarioModel(createComentarioDto);
    return await nuevoComentario.save();
  }

  async findByPublicacion(publicacionId: string): Promise<Comentario[]> {
    return await this.comentarioModel
      .find({ publicacion: publicacionId })
      .populate('usuario')
      .exec();
  }

  async findOne(id: string): Promise<Comentario> {
    const comentario = await this.comentarioModel.findById(id).populate('usuario').exec();
    if (!comentario) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }
    return comentario;
  }

  async remove(id: string): Promise<{ mensaje: string }> {
    const resultado = await this.comentarioModel.findByIdAndDelete(id).exec();
    if (!resultado) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }
    return { mensaje: 'Comentario eliminado correctamente' };
  }
}