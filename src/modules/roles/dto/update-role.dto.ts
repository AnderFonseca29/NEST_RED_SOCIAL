import { PartialType } from "@nestjs/swagger";
import { CreateRolesDto } from "./create-role.dto";

/**
 * DTO para actualizar un rol
 * PartialType convierte todas las propiedades
 * CreateRoleDto campos opcionales
 */

export class UpdateRolesDto extends PartialType(
    CreateRolesDto,
){}