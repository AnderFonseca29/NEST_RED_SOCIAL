import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, collection: 'publicaciones' })
export class Publicacion extends Document {
  @ApiProperty({ description: 'ID del usuario creador', example: 'string' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  usuario!: Types.ObjectId;

  @ApiProperty({ description: 'Contenido de la publicación', example: 'string' })
  @Prop({ required: true, trim: true })
  contenido!: string;

}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);