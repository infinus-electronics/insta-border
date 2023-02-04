import { registerPlugin } from '@capacitor/core';

export interface MediaScannerPlugin {
  mediaScan(options: { fileUri: string }): boolean;
}


const MediaScanner = registerPlugin<MediaScannerPlugin>('MediaScanner');

export default MediaScanner;