import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CreateWorkSpace } from "./workspace-api/createworkspace.module";
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CreateWorkSpace,
  ],
})
export class AppModule {}
