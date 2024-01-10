import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { WorkSpace } from "../schema/workspace.schema";
import mongoose, { Model } from "mongoose";
import { AddWorkSpaceDto } from "../dto/workspace-add.dto";

@Injectable()
export class WorkSpaceService {
  constructor(
    @InjectModel(WorkSpace.name) private WorkSpaceModel: Model<WorkSpace>
  ) {}

  async createworkspace(workspacedto: AddWorkSpaceDto) {
    const creation = await this.WorkSpaceModel.create(workspacedto);
    if (!creation) {
      throw new BadRequestException(`Invalid Details`);
    }
    return creation;
  }

  async findAll(): Promise<WorkSpace[]> {
    const findallworkspace = await this.WorkSpaceModel.find();
    if (!findallworkspace) {
      throw new NotFoundException(`WorkSpace not found`);
    }
    return findallworkspace;
  }

  async updateworkspace(
    id: mongoose.Types.ObjectId,
    updatestaus: AddWorkSpaceDto
  ) {
    const updation = await this.WorkSpaceModel.findByIdAndUpdate(
      id,
      updatestaus,
      { new: true }
    );
    if (!updation) {
      throw new BadRequestException(`Invalid Details`);
    }
    return updation;
  }

  async deleteworkspace(id:mongoose.Types.ObjectId){
    const deleteworkspace = await this.WorkSpaceModel.findByIdAndDelete(id);
    return{message:'WorkSpace Deleted'}
  }


  async updatefull(id:mongoose.Types.ObjectId, updatedto:AddWorkSpaceDto){
    const updation = await this.WorkSpaceModel.findByIdAndUpdate(id, updatedto,{new:true});
    if(!updation){
      throw new BadRequestException(`Invalid Details`)
    }
    return updation;
  }
}
