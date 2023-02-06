// import { Photo } from "@capacitor/camera";

// import { IonImg, IonSkeletonText, useIonToast } from "@ionic/react";
import Jimp from "jimp";
import { Directory, Filesystem } from "@capacitor/filesystem";
// import { useEffect, useState } from "react";
import MediaScanner from "./MediaScan";
import { Media } from "@capacitor-community/media";
const JSONfn = require("json-fn");

/* eslint-disable no-restricted-globals */

interface PhotoURL {
  dataUrl?: string | undefined;
  format: string;
}

interface PhotoWorkerChannel {
  photoURL: PhotoURL;
  percentage: number;
  
}

self.onmessage = (e: MessageEvent<string>) => {
  let { photoURL, percentage } = JSON.parse(
    e.data
  );
  console.log(e.data)

  self.postMessage("busy");

    const instagram: number = 1080;
    const border: number = percentage;

    // console.log("called")

    let inImagePath: string = photoURL.dataUrl!;
    let inImageArr = inImagePath.split(",")[1];
    let outImage = new Jimp(instagram, instagram, "#FFFFFF");

    Jimp.read(Buffer.from(inImageArr, "base64"))
      .then(async (image) => {
        // console.log(image.bitmap.width);
        // console.log(Math.floor((instagram * (100-border)) / 100))
        image.scaleToFit(
          Math.floor((instagram * (100 - border)) / 100),
          Math.floor((instagram * (100 - border)) / 100),
          Jimp.RESIZE_BICUBIC,
          async (err, croppedImg) => {
            if (err) throw err;
            //   console.log(croppedImg.bitmap.width)

            let x = Math.floor((instagram - croppedImg.getWidth()) / 2);
            let y = Math.floor((instagram - croppedImg.getHeight()) / 2);
            outImage.composite(croppedImg, x, y);
            outImage.getBase64(Jimp.MIME_JPEG, async (err, data) => {
              const fileName = new Date().getTime() + ".jpg";
              try {
                // let res = await Filesystem.writeFile({
                //   path: `/storage/emulated/0/Pictures/${fileName}`,
                //   data: data,
                // });
                // MediaScanner.mediaScan({ fileUri: res.uri });
                Media.savePhoto({path: data, album: "Pictures"});
                self.postMessage("done");
                
                // setCanSave(true);
              } catch (err) {
                self.postMessage(err);
                // console.log("here")
                throw err;
              }
              // console.log(data);
              if (err) throw err;
              // setData(`data:image/jpeg;base64,${data}`)
            });
          }
        );
      })
      .catch((err) => {
        self.postMessage(err);
        // console.log("here")
        throw err;
      });

};
