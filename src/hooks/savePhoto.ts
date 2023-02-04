import { Photo } from "@capacitor/camera";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { IonImg, IonSkeletonText, useIonToast } from "@ionic/react";
import Jimp from "jimp";
import { useEffect, useState } from "react";
import { Media } from '@capacitor-community/media';

interface PhotoURL{
    dataUrl?: string | undefined,
    format: string
}


export function saveImage(){


  const processImage = async (photoURL: PhotoURL, percentage :number, setDoneSaving: React.Dispatch<React.SetStateAction<string|undefined>>) => {
    const instagram: number = 1080;
    const border: number = percentage;
    
    // console.log("called")

    let inImagePath: string = photoURL.dataUrl!;
    let inImageArr = inImagePath.split(",")[1]
    let outImage = new Jimp(instagram, instagram, "#FFFFFF");

    Jimp.read(Buffer.from(inImageArr, 'base64'))
      .then((image) => {
        // console.log(image.bitmap.width);
        // console.log(Math.floor((instagram * (100-border)) / 100))
        image.scaleToFit(
          Math.floor((instagram * (100 - border)) / 100),
          Math.floor((instagram * (100 - border)) / 100),
          Jimp.RESIZE_BICUBIC,
          (err, croppedImg) => {
            if (err) throw err;
            //   console.log(croppedImg.bitmap.width)

            let x = Math.floor((instagram - croppedImg.getWidth()) / 2);
            let y = Math.floor((instagram - croppedImg.getHeight()) / 2);
            outImage.composite(croppedImg, x, y);
            outImage.getBase64(Jimp.MIME_JPEG, async (err, data) => {
                // const fileName = new Date().getTime() + '.jpg';
                // await Filesystem.writeFile({
                //     path: `/storage/emulated/0/Pictures/${fileName}`,
                //     data: data,
                    
                //   });
                // console.log(data);
                Media.getAlbums().then(console.log).then(console.log);
                Media.savePhoto({path: data, album:"Pictures"}).then(console.log).catch(console.log);
                //   setDoneSaving(res.filePath);
                // console.log(data);
              if (err) throw err;
              // setData(`data:image/jpeg;base64,${data}`)
              
            });
          }
        );
      })
      .catch((err) => {
        throw err;
      });
  };

  return{
    processImage
  }
}

