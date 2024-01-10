import mongoose from "mongoose";

export class AddWorkSpaceDto {
  name: string;
  id: mongoose.Types.ObjectId;
  registartion_key: string;
  password:string;
  isActive:boolean;
  your_name:string;
}
