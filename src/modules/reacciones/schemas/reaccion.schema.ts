import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, collection: 'reacciones' })
export class Reaccion extends Document {
  @ApiProperty({ description: 'ID del usuario que reacciona', example: '6679232acf123a45678901aa' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  usuario!: Types.ObjectId; // 👈 Con "!" para evitar el error ts(2564)

  @ApiProperty({ description: 'ID de la publicación reaccionada', example: '6679234bcf123a45678901ab' })
  @Prop({ type: Types.ObjectId, ref: 'Publicacion', required: true })
  publicacion!: Types.ObjectId; // 👈 Con "!" para evitar el error ts(2564)

  @ApiProperty({ description: 'Tipo de reacción (like, love, care, haha, wow, sad, angry)', example: 'like', default: 'like' })
  @Prop({ required: true, default: 'like', trim: true })
  tipo!: string; // 👈 Con "!" para evitar el error ts(2564)
}

export const ReaccionSchema = SchemaFactory.createForClass(Reaccion);