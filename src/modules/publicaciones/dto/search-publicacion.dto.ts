import { IsOptional, IsString, IsMongoId, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SearchPublicacionDto {
  @ApiProperty({ description: 'Buscar por palabra clave en el contenido', required: false })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({ description: 'Filtrar por un autor específico', required: false })
  @IsOptional()
  @IsMongoId()
  usuario?: string;

  @ApiProperty({ description: 'Número de página para la paginación', default: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ description: 'Cantidad de publicaciones por página', default: 10, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}