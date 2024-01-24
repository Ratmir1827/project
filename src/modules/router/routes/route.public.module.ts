import { Module } from "@nestjs/common";
import { UserPublicController } from "src/modules/user/controllers/user.public.controller";
import { UserModule } from "src/modules/user/user.module";

@Module({
    imports: [UserModule],
    controllers: [UserPublicController],
})
export class RoutePublicModule {}
