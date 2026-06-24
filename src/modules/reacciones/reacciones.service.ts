import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reaccion } from './schemas/reaccion.schema';
import { ToggleReaccionDto } from './dto/toggle-reaccion.dto';

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
}