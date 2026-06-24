import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, collection: 'comentarios' })
export class Comentario extends Document {
  @ApiProperty({ description: 'ID de la publicación comentada', example: '6679234bcf123a45678901ab' })
  @Prop({ type: Types.ObjectId, ref: 'Publicacion', required: true })
  publicacion!: Types.ObjectId; // 👈 Con "!" para evitar el error ts(2564)

  @ApiProperty({ description: 'ID del autor del comentario', example: '6679232acf123a45678901aa' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  usuario!: Types.ObjectId; // 👈 Con "!" para evitar el error ts(2564)

  @ApiProperty({ description: 'Texto del comentario', example: '¡Excelente publicación!' })
  @Prop({ required: true, trim: true })
  contenido!: string; // 👈 Con "!" para evitar el error ts(2564)
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);