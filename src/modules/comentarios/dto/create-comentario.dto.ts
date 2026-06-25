import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComentarioDto {
  @ApiProperty({ description: 'ID de la publicación a comentar', example: '6679234bcf123a45678901ab' })
  @IsMongoId({ message: 'El ID de la publicación debe ser un ObjectId válido de Mongo' })
  @IsNotEmpty({ message: 'La publicación es requerida' })
  publicacion!: string;

  @ApiProperty({ description: 'ID del usuario que comenta', example: '6679232acf123a45678901aa' })
  @IsMongoId({ message: 'El ID del usuario debe ser un ObjectId válido de Mongo' })
  @IsNotEmpty({ message: 'El usuario es requerido' })
  usuario!: string;

  @ApiProperty({ description: 'Contenido del comentario', example: 'Me gustó mucho tu post.' })
  @IsString({ message: 'El comentario debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El contenido del comentario no puede estar vacío' })
  contenido!: string;
}