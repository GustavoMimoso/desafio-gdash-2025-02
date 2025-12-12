import { Response } from 'express';
import { ExportService } from './export.service';
export declare class ExportController {
    private readonly exportService;
    constructor(exportService: ExportService);
    exportCsv(res: Response): Promise<void>;
    exportXlsx(res: Response): Promise<void>;
}
//# sourceMappingURL=export.controller.d.ts.map