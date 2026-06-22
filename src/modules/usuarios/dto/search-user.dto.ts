import { IsOptional } from 'class-validator';

export class SearchUserDto {
    @IsOptional()
    nombre?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}