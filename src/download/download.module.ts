import { Module } from '@nestjs/common';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';
import { YtDlpModule } from '../custom-modules/yt-dlp.module';

@Module({
  imports: [YtDlpModule],
  controllers: [DownloadController],
  providers: [DownloadService],
})
export class DownloadModule {}
