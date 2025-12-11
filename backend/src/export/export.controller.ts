import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { ExportService } from './export.service';

@ApiTags('export')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('export')
export class ExportController {
  constructor(private exportService: ExportService) {}

  @Get('csv')
  async exportCSV(@Res() res: Response) {
    const csv = await this.exportService.exportCSV();
    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename="weather.csv"');
    res.send(csv);
  }

  @Get('xlsx')
  async exportXLSX(@Res() res: Response) {
    const buffer = await this.exportService.exportXLSX();
    res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.header('Content-Disposition', 'attachment; filename="weather.xlsx"');
    res.send(buffer);
  }
}
