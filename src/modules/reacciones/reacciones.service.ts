import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reaccion } from './schemas/reaccion.schema';
import { ToggleReaccionDto } from './dto/toggle-reaccion.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper'; // Opcional: Agrégalo si usas el ResponseHelper aquí también.

@Injectable()
export class ReaccionesService {
  constructor(
    @InjectModel(Reaccion.name) private readonly reaccionModel: Model<Reaccion>,
  ) {}

  async toggle(dto: ToggleReaccionDto): Promise<{ mensaje: string; reaccionado: boolean }> {
    const { usuario, publicacion, tipo } = dto;

    // 1. Buscamos si ya existe una reacción de este usuario en esta publicación
    const reaccionExistente = await this.reaccionModel.findOne({ usuario, publicacion }).exec();

    if (reaccionExistente) {
      // 2. Si existe y el TIPO ES EL MISMO, la quitamos (Toggle Off)
      if (reaccionExistente.tipo === tipo) {
        await this.reaccionModel.findByIdAndDelete(reaccionExistente._id).exec();
        return { mensaje: 'Reacción eliminada', reaccionado: false };
      } 
      
      // 3. Si existe pero el TIPO ES DIFERENTE (ej. de 'like' a 'love'), la actualizamos (Equivale a un PUT)
      reaccionExistente.tipo = tipo;
      await reaccionExistente.save();
      return { mensaje: `Reacción cambiada a ${tipo} con éxito`, reaccionado: true };
    }

    // 4. Si no existía, la creamos desde cero
    const nuevaReaccion = new this.reaccionModel({ usuario, publicacion, tipo });
    await nuevaReaccion.save();
    return { mensaje: 'Reacción añadida con éxito', reaccionado: true };
  }

  async findByPublicacion(publicacionId: string): Promise<Reaccion[]> {
    return await this.reaccionModel
      .find({ publicacion: publicacionId })
      .populate('usuario')
      .exec();
  }

  // ✨ NUEVO MÉTODO: Eliminar de forma directa la reacción de un usuario en un post
  async removeReaccion(publicacionId: string, dto: ToggleReaccionDto) {
    const { usuario } = dto;

    // Buscamos y eliminamos directamente el documento que coincida con el usuario y la publicación
    const reaccionEliminada = await this.reaccionModel
      .findOneAndDelete({ usuario, publicacion: publicacionId })
      .exec();

    if (!reaccionEliminada) {
      throw new NotFoundException('No se encontró ninguna reacción de este usuario en la publicación');
    }

    // Retornamos usando la estructura de tu helper o un objeto plano coherente
    return { mensaje: 'Reacción eliminada con éxito', reaccionado: false };
  }

  // ✨ NUEVO MÉTODO: Modificar directamente el tipo de reacción
  async updateReaccion(publicacionId: string, dto: ToggleReaccionDto) {
    const { usuario, tipo } = dto;

    // Buscamos la reacción y actualizamos su propiedad 'tipo'
    const reaccionActualizada = await this.reaccionModel
      .findOneAndUpdate(
        { usuario, publicacion: publicacionId },
        { tipo },
        { new: true } // Para que retorne el documento con el cambio ya aplicado
      )
      .exec();

    if (!reaccionActualizada) {
      throw new NotFoundException('No se encontró ninguna reacción previa para modificar');
    }

    return { 
      mensaje: `Reacción cambiada a ${tipo} con éxito`, 
      reaccionado: true,
      data: reaccionActualizada 
    };
  }
}