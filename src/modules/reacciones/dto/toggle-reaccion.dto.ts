import { IsMongoId, IsNotEmpty, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ToggleReaccionDto {
  @ApiProperty({ description: 'ID del usuario que realiza la acción', example: '6679232acf123a45678901aa' })
  @IsMongoId({ message: 'El ID del usuario debe ser un ObjectId válido de Mongo' })
  @IsNotEmpty({ message: 'El usuario es requerido' })
  usuario!: string;

  @ApiProperty({ description: 'ID de la publicación a la que se reacciona', example: '6679234bcf123a45678901ab' })
  @IsMongoId({ message: 'El ID de la publicación debe ser un ObjectId válido de Mongo' })
  @IsNotEmpty({ message: 'La publicación es requerida' })
  publicacion!: string;

  @ApiProperty({ 
    description: 'Tipo de reacción permitida', 
    example: 'like',
    enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'] 
  })
  @IsString({ message: 'El tipo de reacción debe ser una cadena de texto' })
  @IsIn(['like', 'love', 'haha', 'wow', 'sad', 'angry'], { message: 'Tipo de reacción no válido' })
  @IsNotEmpty({ message: 'El tipo de reacción es requerido' })
  tipo!: string;
}