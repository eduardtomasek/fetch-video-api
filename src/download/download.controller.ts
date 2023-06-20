import { Controller, Get, Query, Req } from '@nestjs/common';
import { DownloadService } from './download.service';

@Controller('download')
export class DownloadController {
  constructor(private readonly dc: DownloadService) {}

  @Get()
  download(@Req() req, @Query('url') url: string) {
    this.dc.download({ url });

    return true;
  }
}
