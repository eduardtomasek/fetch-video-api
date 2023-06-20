import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YtDlpModule } from './custom-modules/yt-dlp.module';
import { DownloadModule } from './download/download.module';
import { DownloadController } from './download/download.controller';
import { DownloadService } from './download/download.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    YtDlpModule,
    DownloadModule,
  ],
  controllers: [AppController, DownloadController],
  providers: [AppService, DownloadService],
})
export class AppModule {}
