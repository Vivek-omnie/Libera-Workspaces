import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { WorkSpaceService } from "../services/workspace.service";
import { AddWorkSpaceDto } from "../dto/workspace-add.dto";
import mongoose from "mongoose";

@Controller("workspace")
export class WorkSpaceController {
  constructor(private workspaceService: WorkSpaceService) {}

  @Post("create")
  async createworkspace(@Body() workspacedto: AddWorkSpaceDto) {
    try {
      return await this.workspaceService.createworkspace(workspacedto);
    } catch (error) {
      throw new HttpException(error.message, error.statuscode ?? 400);
    }
  }

  @Get()
  async getall() {
    return await this.workspaceService.findAll();
  }

  @Put(":id")
  async updateworkspace(
    @Param("id") id: mongoose.Types.ObjectId,
    @Body() updatestatus: AddWorkSpaceDto
  ) {
    try {
      return await this.workspaceService.updateworkspace(id, updatestatus);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(":id")
  async deleteworkspace(@Param("id") id: mongoose.Types.ObjectId) {
    return await this.workspaceService.deleteworkspace(id);
  }

  @Put("update/:id")
  async updatefull(
    @Param("id") id: mongoose.Types.ObjectId,
    @Body() updatedto: AddWorkSpaceDto
  ) {
    try {
      return await this.workspaceService.updatefull(id, updatedto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
