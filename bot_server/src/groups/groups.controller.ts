import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GroupDto } from './dto/group.dto';
import { GroupsService } from './groups.service';
import { Group } from './schemas/groups.schema';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Group[]> {
    return this.groupsService.getAll();
  }
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Group> {
    return this.groupsService.getById(id);
  }
  @Get('userGroups/:userId')
  async getUserGroups(@Param('userId') userId: string): Promise<Group[]> {
    return this.groupsService.getUserGroups(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  async createPayment(@Body() groupDto: GroupDto): Promise<Group> {
    return this.groupsService.addGroup(groupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Group> {
    return this.groupsService.remove(id);
  }

  @Put(':id')
  update(@Body() GroupDto: GroupDto, @Param('id') id: string): Promise<Group> {
    return this.groupsService.update(id, GroupDto);
  }
}
