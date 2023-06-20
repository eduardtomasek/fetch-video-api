import { Module } from '@nestjs/common';
import { ytDlpProvider } from './yt-dlp.provider';

@Module({
  providers: [ytDlpProvider],
  exports: [ytDlpProvider],
})
export class YtDlpModule {}
