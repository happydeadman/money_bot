import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupDto } from './dto/group.dto';
import { Group, GroupDocument } from './schemas/groups.schema';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async getAll(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }
  async getById(id: string): Promise<Group> {
    return this.groupModel.findById(id);
  }
  async getUserGroups(id: string): Promise<Group[]> {
    return this.groupModel.find({ 'users.userId': { $all: [id] } });
  }
  async addGroup(GroupDto: GroupDto): Promise<Group> {
    const newGroup = new this.groupModel(GroupDto);
    return newGroup.save();
  }
  async remove(id: string): Promise<Group> {
    return this.groupModel.findByIdAndRemove(id);
  }
  async update(id: string, GroupDto: GroupDto): Promise<Group> {
    return this.groupModel.findByIdAndUpdate(id, GroupDto, { new: true });
  }
}
