import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicacionDto {
  @ApiProperty({ description: 'ID del usuario que publica', example: 'string' })
  @IsMongoId()
  @IsNotEmpty()
  usuario!: string;

  @ApiProperty({ description: 'Texto de la publicación', example: 'string' })
  @IsString()
  @IsNotEmpty()
  contenido!: string;

}