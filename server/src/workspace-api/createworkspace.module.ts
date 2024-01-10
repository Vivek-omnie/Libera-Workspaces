import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { WorkSpace, WorkSpaceSchema } from "./schema/workspace.schema";
import { WorkSpaceController } from "./controller/workspace.controller";
import { WorkSpaceService } from "./services/workspace.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkSpace.name, schema: WorkSpaceSchema },
    ])
  ],
  controllers: [WorkSpaceController],
  providers: [WorkSpaceService],
})
export class CreateWorkSpace {}
