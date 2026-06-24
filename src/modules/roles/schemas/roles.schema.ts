import {
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type RolesDocument = Roles & Document;

@Schema({
    timestamps: true,
})
export class Roles {
    @Prop({
        required: true,
        unique: true,
    })
    nombre!: string;

    @Prop({
        default:true,
    })
    activo!: boolean;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);