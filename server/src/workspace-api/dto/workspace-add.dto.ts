import mongoose from "mongoose";

export class AddWorkSpaceDto {
  name: string;
  id: mongoose.Types.ObjectId;
  isActive:boolean;
  your_name:string;
}
