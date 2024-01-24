import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entity/user.entity';
import { UserRouterModule } from './modules/router/router.module';
import { RouteAdminModule } from './modules/router/routes/route.admin.module';
import { RoutePublicModule } from './modules/router/routes/route.public.module';

@Module({
  imports: [
    UserRouterModule.forRoot(),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5444,
      username: 'admin',
      password: 'admin',
      database: 'postgres',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
