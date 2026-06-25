import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './modules/roles/roles.module';
import { UsuariosModule } from './modules/usuarios/usarios.module';
import { PublicacionesModule } from './modules/publicaciones/publicaciones.module';
import { ComentariosModule } from './modules/comentarios/comentarios.module';
import { ReaccionesModule } from './modules/reacciones/reacciones.module';
import { SeguidoresModule } from './modules/seguidores/seguidores.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RolesModule,
    UsuariosModule,
    PublicacionesModule,
    ComentariosModule,
    ReaccionesModule,
    SeguidoresModule,
    MongooseModule.forRoot(process.env.MONGO_URI as string)
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
