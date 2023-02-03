import { Photo } from "@capacitor/camera";
import { IonImg, IonSkeletonText } from "@ionic/react";
import Jimp from "jimp";
import { useEffect, useState } from "react";

interface PhotoProps {
  photo: Photo,
  percentage: number
}


const ProcessedImage: React.FC<PhotoProps> = ({ photo, percentage }) => {
  // const [imgData, setData] = useState<string | undefined>();
//   let outData: string | undefined = undefined;
  
    const [outData, setOutData] = useState<string|undefined>(undefined);

  useEffect(() => {
    // console.log("Process");
    const instagram: number = 1080;
    const border: number = percentage;

    const processImage = async (photo: Photo) => {
        // console.log("called")

      let inImagePath: string = photo.webPath!;
    //   console.log(inImagePath);
      let outImage = new Jimp(instagram, instagram, "#FFFFFF");

      Jimp.read(inImagePath)
        .then((image) => {
            // console.log(image.bitmap.width);
            // console.log(Math.floor((instagram * (100-border)) / 100))
          image.scaleToFit(
            Math.floor((instagram * (100-border)) / 100),
            Math.floor((instagram * (100-border)) / 100),
            Jimp.RESIZE_BILINEAR,
            (err, croppedImg) => {
              if (err) throw err;
            //   console.log(croppedImg.bitmap.width)

              let x = Math.floor((instagram - croppedImg.getWidth()) / 2);
              let y = Math.floor((instagram - croppedImg.getHeight()) / 2);
              outImage.composite(croppedImg, x, y);
              outImage.getBase64(Jimp.MIME_JPEG, (err, data) => {
                // console.log(data);
                if (err) throw err;
                // setData(`data:image/jpeg;base64,${data}`)
                setOutData(data);
                
              });
            }
          );
        })
        .catch((err) => {
          throw err;
        });

      
    };
    processImage(photo).catch(console.error);

    return () => {
        setOutData(undefined);
    }
  }, [photo, percentage]);

  if (outData === undefined){
      return (
          <IonSkeletonText
              animated={true}
              style={{ aspectRatio: "1/1" }}
            ></IonSkeletonText>
      )
  }
  else {
      return <IonImg class="selected" src={outData}/>;
  }

};

export default ProcessedImage;
