import { Inject, Injectable } from '@nestjs/common';
import { YT_DLP_MODULE } from '../constants';

@Injectable()
export class DownloadService {
  constructor(@Inject(YT_DLP_MODULE) private ytDlpModule: any) {}

  async download({ url }) {
    this.ytDlpModule.execute({ url });
  }
}
