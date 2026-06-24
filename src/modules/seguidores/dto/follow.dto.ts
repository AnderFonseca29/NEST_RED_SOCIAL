import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FollowDto {
  @ApiProperty({ description: 'ID del usuario que va a seguir a alguien', example: '6679232acf123a45678901aa' })
  @IsMongoId({ message: 'El ID del seguidor debe ser un ObjectId válido de Mongo' })
  @IsNotEmpty({ message: 'El campo seguidor es requerido' })
  seguidor!: string;

  @ApiProperty({ description: 'ID del usuario al que se desea seguir', example: '6679234bcf123a45678901ab' })
  @IsMongoId({ message: 'El ID del usuario a seguir debe ser un ObjectId válido de Mongo' })
  @IsNotEmpty({ message: 'El campo seguido es requerido' })
  seguido!: string;
}