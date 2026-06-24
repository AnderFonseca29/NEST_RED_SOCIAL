import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publicacion } from './schemas/publicacion.schema';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel(Publicacion.name) private readonly publicacionModel: Model<Publicacion>,
  ) {}

  async create(createPublicacionDto: CreatePublicacionDto): Promise<Publicacion> {
    const nuevaPublicacion = new this.publicacionModel(createPublicacionDto);
    return await nuevaPublicacion.save();
  }

  async findAll(): Promise<Publicacion[]> {
    // El .populate('usuario') sirve para traer los datos del usuario creador en lugar de solo el ID
    return await this.publicacionModel.find().populate('usuario').exec();
  }

  async findOne(id: string): Promise<Publicacion> {
    const publicacion = await this.publicacionModel.findById(id).populate('usuario').exec();
    if (!publicacion) {
      throw new NotFoundException(`Publicación con ID ${id} no encontrada`);
    }
    return publicacion;
  }

  async update(id: string, updatePublicacionDto: UpdatePublicacionDto): Promise<Publicacion> {
    const publicacionActualizada = await this.publicacionModel
      .findByIdAndUpdate(id, updatePublicacionDto, { new: true })
      .exec();
    
    if (!publicacionActualizada) {
      throw new NotFoundException(`Publicación con ID ${id} no encontrada`);
    }
    return publicacionActualizada;
  }

  async remove(id: string): Promise<{ mensaje: string }> {
    const resultado = await this.publicacionModel.findByIdAndDelete(id).exec();
    if (!resultado) {
      throw new NotFoundException(`Publicación con ID ${id} no encontrada`);
    }
    return { mensaje: 'Publicación eliminada correctamente' };
  }
}