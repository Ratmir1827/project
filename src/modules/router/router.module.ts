import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RouteAdminModule } from './routes/route.admin.module';
import { RoutePublicModule } from './routes/route.public.module';

@Module({})
export class UserRouterModule {
  static forRoot(): DynamicModule {
    const imports: (
      | DynamicModule
      | Type<any>
      | Promise<DynamicModule>
      | ForwardReference<any>
    )[] = [];
    imports.push(
        RouteAdminModule,
        RoutePublicModule,
      NestJsRouterModule.register([
        {
          path: '/public',
          module: RoutePublicModule,
        },
        {
          path: '/admin',
          module: RouteAdminModule,
        },
      ]),
    );
    return {
      module: UserRouterModule,
      providers: [],
      exports: [],
      controllers: [],
      imports,
    };
  }
}
