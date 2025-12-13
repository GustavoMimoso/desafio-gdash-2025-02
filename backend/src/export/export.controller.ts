import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('csv')
  async exportCsv(@Res() res: Response) {
    const csv = await this.exportService.generateCsv();
    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename="weather.csv"');
    res.send(csv);
  }

  @Get('xlsx')
  async exportXlsx(@Res() res: Response) {
    const buffer = await this.exportService.generateXlsx();
    res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.header('Content-Disposition', 'attachment; filename="weather.xlsx"');
    res.send(buffer);
  }
}
