import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

/** 
 * DTO para actualizar un rol, extiende de CreateRoleDto y hace que todas las propiedades sean opcionales
 * PartyalType cpnvierte todas las propiedades
 * CreateRoleDto campos opciones
 */
export class UpdateRoleDto extends PartialType(
    CreateRoleDto
) {}