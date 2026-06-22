import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
  })
  nombre!: string;

  @Prop({
    required: true,
    unique: true,
  })
  correo!: string;

  @Prop({
    required: true,
  })
  password!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Role', // 💡 Asegúrate de que coincida con el nombre que le diste al esquema de roles
  })
  rol_id!: Types.ObjectId;

  @Prop({
    default: true,
  })
  activo!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ correo: 1 });