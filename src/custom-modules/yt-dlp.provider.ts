import { isString } from 'lodash';
import { createWriteStream, writeFileSync, unlinkSync } from 'fs';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { spawn } from 'node:child_process';
import { ensureDirSync } from 'fs-extra';

import { YT_DLP_MODULE } from '../constants';

const rootFolder = path.join(__dirname, '..', '..');

dotenv.config({
  path: path.join(rootFolder, '.env'),
});

const ytDlpExec = process.env.YT_DLP_BINARY || 'yt-dlp';
const workingDir = path.join(rootFolder, 'data');
const stdoutDir = path.join(workingDir, 'stdout');
const runningJobsDir = path.join(workingDir, 'running');
const finishedJobsDir = path.join(workingDir, 'finished');

ensureDirSync(workingDir);
ensureDirSync(stdoutDir);
ensureDirSync(runningJobsDir);
ensureDirSync(finishedJobsDir);

console.log(`yt-dlp module init`);
console.log({ ytDlpExec, workingDir, stdoutDir, runningJobsDir });

function writeJson(path: string, data: object) {
  writeFileSync(path, JSON.stringify(data, null, 2));
}

async function execute({ url }: { url: string }) {
  const jobUUID = uuidv4();

  /*
    PREPARE FILE PATHS
   */
  const stdoutFile = path.join(stdoutDir, `${jobUUID}.job`);
  const runningJobFile = path.join(runningJobsDir, `${jobUUID}.json`);
  const finishedJobFile = path.join(finishedJobsDir, `${jobUUID}.json`);

  /*
    WRITE STREAM
   */
  const stdoutWriter = createWriteStream(stdoutFile);

  ensureDirSync(process.env.VIDEO_STORE_FOLDER);

  /*
    YT-DLP PARAMETERS
   */
  const outputVideoFile = `${process.env.VIDEO_STORE_FOLDER}/${process.env.DEFAULT_OUTPUT}`;
  const archiveFile = path.join(process.env.VIDEO_STORE_FOLDER, 'archive.txt');
  const formatString = process.env.DEFAULT_FORMAT;
  const userAgentString = process.env.DEFAULT_USER_AGENT;
  const subtitles = process.env.DEFAULT_SUBTITLES;
  const writeAutoSubs =
    isString(subtitles) && subtitles.length ? '--write-auto-subs' : '';
  const subLangs = writeAutoSubs !== '' ? `--sub-langs` : '';

  const spawnArgs = [
    `--format`,
    `${formatString}`,
    `--user-agent`,
    `${userAgentString}`,
    `--output`,
    `${outputVideoFile}`,
    `--ignore-errors`,
    `--download-archive`,
    `${archiveFile}`,
    writeAutoSubs,
    subLangs,
    subLangs ? `${subtitles}` : '',
    `${url}`,
  ];

  writeJson(runningJobFile, {
    start: new Date().toISOString(),
    spawnArgs,
  });

  /*
    RUN COMMAND
   */
  const command = spawn(ytDlpExec, spawnArgs);

  command.stdout.pipe(stdoutWriter);
  command.stderr.pipe(stdoutWriter);

  command.on('close', (code) => {
    const data = {
      timestamp: new Date().toISOString(),
      exitCode: code,
      spawnArgs,
    };

    writeJson(finishedJobFile, data);
    unlinkSync(runningJobFile);
  });
}

export const ytDlpProvider = {
  provide: YT_DLP_MODULE,
  useValue: {
    execute,
  },
};
