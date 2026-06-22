import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Asegúrate de usar mayúsculas aquí para coincidir con el estándar
import { User, UserSchema } from './schemas/user-schema';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class UsuariosModule {}