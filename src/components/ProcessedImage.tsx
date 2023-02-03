import { Photo } from "@capacitor/camera";
import { IonImg, IonSkeletonText } from "@ionic/react";
import Jimp from "jimp";
import { useEffect, useState } from "react";

interface PhotoProps {
  photo: Photo | undefined;
}



const ProcessedImage: React.FC<PhotoProps> = ({ photo }) => {

    // const [imgData, setData] = useState<string | undefined>();
    let outData : string | undefined = undefined;
    
    useEffect(() => {
        const instagram : number = 1080;
        const border : number = 7;
        
        const processImage = async (photo : Photo) => {
        let inImagePath : string = photo.webPath!;
        let outImage = new Jimp(instagram, instagram, "#FFFFFF");
        
        await Jimp.read(inImagePath).then(
            image => {
                image.scaleToFit(Math.floor(instagram * 100 / border), Math.floor(instagram * 100 / border), Jimp.RESIZE_BICUBIC, (err, croppedImg) => {
                    if (err) throw err;
                    
                    let x = Math.floor((instagram - croppedImg.getWidth())/2);
                    let y = Math.floor((instagram - croppedImg.getHeight())/2);
                    outImage.composite(croppedImg, x, y);
                    outImage.getBase64(Jimp.MIME_JPEG, (err, data) => {
                        if (err) throw err;
                        // setData(`data:image/jpeg;base64,${data}`)
                        outData = `data:image/jpeg;base64,${data}`
                    });
                })
            }
        ).catch((err => {throw(err)})); 
        
        processImage(photo).catch(console.error);
        
    }
    }, [photo])

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
