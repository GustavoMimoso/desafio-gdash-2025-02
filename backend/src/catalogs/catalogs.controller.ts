
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CatalogsService } from './catalogs.service';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('catalogs')
export class CatalogsController {
  constructor(private catalogsService: CatalogsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() { name, description }: { name: string; description: string },
    @CurrentUser() user: any,
  ) {
    return await this.catalogsService.create(name, description, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.catalogsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return await this.catalogsService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() { name, description, status }: any,
  ) {
    return await this.catalogsService.update(id, name, description, status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    await this.catalogsService.delete(id);
    return { message: 'Catálogo deletado com sucesso' };
  }
}
