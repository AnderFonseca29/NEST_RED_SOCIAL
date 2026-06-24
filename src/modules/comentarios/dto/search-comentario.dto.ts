import { IsOptional, IsString, IsMongoId, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SearchComentarioDto {
  @ApiProperty({})
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({})
  @IsOptional()
  @IsMongoId()
  usuario?: string;

  @ApiProperty({})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}