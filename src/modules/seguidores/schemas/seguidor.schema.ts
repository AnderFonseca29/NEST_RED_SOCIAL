import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, collection: 'seguidores' })
export class Seguidor extends Document {
  @ApiProperty({ description: 'ID del usuario que realiza la acción de seguir', example: '6679232acf123a45678901aa' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  seguidor!: Types.ObjectId; // 👈 Con "!" para evitar el error ts(2564)

  @ApiProperty({ description: 'ID del usuario al que están siguiendo', example: '6679234bcf123a45678901ab' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  seguido!: Types.ObjectId; // 👈 Con "!" para evitar el error ts(2564)


    @Prop({
      default: true,
    })
    activo!: boolean;
  }



export const SeguidorSchema = SchemaFactory.createForClass(Seguidor);