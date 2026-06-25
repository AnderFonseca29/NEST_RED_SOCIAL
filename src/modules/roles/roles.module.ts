import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles, RolesSchema } from './schemas/roles.schema';


@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    MongooseModule.forFeature([
      {
         name:Roles.name,
        schema:RolesSchema,
       },
    ]),
  ]
})
export class RolesModule {}