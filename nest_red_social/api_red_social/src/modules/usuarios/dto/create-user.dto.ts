import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  // 💡 Corregido 'message' y añadida la coma faltante
  @MaxLength(50, { message: 'El nombre no puede superar los 50 caracteres' })
  @MinLength(3, { message: 'El nombre debe contener mínimo 3 caracteres' })
  nombre!: string;

  @ApiProperty({
    description: 'Correo del usuario',
    maxLength: 100,
  })
  // 💡 También puedes personalizar el mensaje de IsEmail si quieres
  @IsEmail({}, { message: 'El formato del correo no es válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @MaxLength(100, { message: 'El correo no puede superar los 100 caracteres' })
  correo!: string;

  @ApiProperty({
    // 💡 Corregido el doble paréntesis (
    description: 'Contraseña del usuario',
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener mínimo 8 caracteres' })
  @MaxLength(20, {
    message: 'La contraseña no puede superar los 20 caracteres',
  })
  password!: string;

  @ApiProperty({
    description: 'ID del rol asociado al usuario',
  })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  @IsString()
  rol_id!: string;
}
