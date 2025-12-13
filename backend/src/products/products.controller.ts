import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() { name, description, price, catalog }: any,
    @CurrentUser() user: any,
  ) {
    return await this.productsService.create(name, description, price, catalog, user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('catalog') catalog?: string,
    @Query('status') status?: string,
  ) {
    return await this.productsService.findAll(catalog, status);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return await this.productsService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() { name, description, price, status }: any,
  ) {
    return await this.productsService.update(id, name, description, price, status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    await this.productsService.delete(id);
    return { message: 'Produto deletado com sucesso' };
  }
}
