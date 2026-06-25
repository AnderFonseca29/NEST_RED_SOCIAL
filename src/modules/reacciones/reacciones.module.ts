import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaccion, ReaccionSchema } from './schemas/reaccion.schema';
import { ReaccionesController } from './reacciones.controller';
import { ReaccionesService } from './reacciones.service';

@Module({
  controllers: [ReaccionesController],
  providers: [ReaccionesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Reaccion.name,
        schema: ReaccionSchema,
      },
    ]),
  ],
})
export class ReaccionesModule {}