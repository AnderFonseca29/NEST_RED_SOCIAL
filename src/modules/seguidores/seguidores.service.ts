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

  // === 1. MÉTODO FINDALL ===
  async findAll(search: FollowDto) {
    const filter: any = { activo: true };

    if (search.seguidor) {
      filter.nombre = {
        $regex: search.seguidor,
        $options: 'i',
      };
    }

    return await this.seguidorModel.find(filter).exec();
  }

  // === 2. MÉTODO SEGUIR ===
  async seguir(dto: FollowDto): Promise<{ mensaje: string; exito: boolean }> {
    // 1. Validar que no se siga a sí mismo
    if (dto.seguidor === dto.seguido) {
      throw new BadRequestException('Un usuario no puede seguirse a sí mismo');
    }

    // 2. Verificar si ya existe un seguimiento ACTIVO
    const yaSigue = await this.seguidorModel.findOne({
      seguidor: dto.seguidor,
      seguido: dto.seguido,
      activo: true
    }).exec();

    if (yaSigue) {
      throw new BadRequestException('Ya estás siguiendo a este usuario');
    }

    // 3. Caso especial: Si ya existía un registro pero estaba inactivo (activo: false)
    const seguimientoInactivo = await this.seguidorModel.findOne({
      seguidor: dto.seguidor,
      seguido: dto.seguido,
      activo: false
    }).exec();

   if (seguimientoInactivo) {
  // Actualiza directamente usando el _id del documento encontrado
  await this.seguidorModel.findByIdAndUpdate(seguimientoInactivo._id, {
    $set: { activo: true }
  }).exec();
} else {
      // 4. Si nunca se habían seguido, creamos uno nuevo
      const nuevoSeguimiento = new this.seguidorModel({
        ...dto,
        activo: true
      });
      await nuevoSeguimiento.save();
    }

    return {
      mensaje: '¡Operación exitosa! Ahora sigues a este usuario.',
      exito: true,
    };
  }

  // === 3. MÉTODO DEJAR SEGUIR ===
  async dejarSeguir(dto: FollowDto) {
  // 1. Busca el documento exacto usando la combinación única de seguidor, seguido y que esté activo: true
  const seguimiento = await this.seguidorModel.findOneAndUpdate(
    { 
      seguidor: dto.seguidor, // ID del que deja de seguir
      seguido: dto.seguido,   // ID del usuario que será dejado de seguir
      activo: true            // Solo nos interesan los registros que estén activos
    },
    { 
      $set: { activo: false } // 2. Modifica el campo 'activo' automáticamente a false
    },
    { new: true } // Nos devuelve el documento modificado
  ).exec();

  // Si no se encuentra ningún registro que coincida, significa que nunca lo siguió o ya estaba inactivo
  if (!seguimiento) {
    throw new BadRequestException('No sigues a este usuario o ya lo habías dejado de seguir.');
  }

  return {
    mensaje: 'Has dejado de seguir a este usuario con éxito.',
    exito: true
  };
}

  // === 4. MÉTODO GET SIGUIENDO ===
  async getSiguiendo(usuarioId: string): Promise<Seguidor[]> {
    return await this.seguidorModel
      .find({ seguidor: usuarioId, activo: true })
      .populate('seguido')
      .exec();
  }

  // === 5. MÉTODO GET SEGUIDORES ===
  async getSeguidores(usuarioId: string): Promise<Seguidor[]> {
    return await this.seguidorModel
      .find({ seguido: usuarioId, activo: true })
      .populate('seguidor')
      .exec();
  }

} // <--- ÚNICA LLAVE QUE CIERRA LA CLASE COMPLETA