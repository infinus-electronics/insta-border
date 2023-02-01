import { useState, useEffect } from "react";
import { isPlatform } from "@ionic/react";

import {
  Camera,
  CameraResultType,
  CameraSource,
  GalleryPhoto,
  GalleryPhotos,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
// import { Preferences } from '@capacitor/preferences';
import { Capacitor } from "@capacitor/core";

export function useCamera() {
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
  };

  return {
    takePhoto,
  };
}

export function usePhotoGalleryFromCamera() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo>();

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
    });
    setSelectedPhoto(photo);
  };

  return {
    takePhoto,
    selectedPhoto,
  };
}
