import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class WorkSpace {
  id: mongoose.Types.ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  registration_key: string;

  @Prop()
  password:string;

  @Prop()
  isActive:boolean;

  @Prop()
  your_name:string;
}

export const WorkSpaceSchema = SchemaFactory.createForClass(WorkSpace);
