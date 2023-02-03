import { Photo } from "@capacitor/camera";
import { IonImg, IonSkeletonText } from "@ionic/react";
// import Jimp from "jimp";
import { useEffect, useRef, useState } from "react";
import "./ProcessedImageCanvas.css"


interface PhotoProps {
  photo: Photo;
  percentage: number;
}

const ProcessedImageCanvas : React.FC<PhotoProps> = ({ photo, percentage }) => {

    // const [finishedCanvas, setFinishedCanvas] = useState<string>()
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // console.log("mounted")
    let canvas = canvasRef.current!;
    let ctx = canvas.getContext("2d")!;
    let oc = document.createElement('canvas');
    let octx = oc.getContext('2d')!;
    
    let instagram = 1080;

   canvas.width = instagram; // destination canvas size
   canvas.height = instagram;
   ctx.fillStyle = "#FFFFFF";
   ctx.fillRect(0, 0, instagram, instagram);

    let img = new Image();
    img.src = photo.dataUrl!;

    let targetHeight = 0;
    let targetWidth = 0;

    if (img.height > img.width) {
        targetHeight = Math.floor(instagram * (100-percentage) / 100);
        targetWidth = Math.floor(img.width/img.height*targetHeight);
    } else {
        targetWidth = Math.floor(instagram * (100-percentage) / 100);
        targetHeight = Math.floor(img.height/img.width*targetWidth);
    }

    // let cur = {
    //     width: Math.floor(img.width * 0.5),
    //     height: Math.floor(img.height * 0.5)
    // }

    // oc.width = cur.width;
    // oc.height = cur.height;

    // octx.drawImage(img, 0, 0, cur.width, cur.height);

    // while (cur.width * 0.5 > targetWidth) {
    //     cur = {
    //       width: Math.floor(cur.width * 0.5),
    //       height: Math.floor(cur.height * 0.5)
    //     };
    //     octx.drawImage(oc, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
    //   }

      let dx = Math.floor((instagram-targetWidth)/2);
      let dy = Math.floor((instagram-targetHeight)/2);
      ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, targetWidth, targetHeight);

    //   setFinishedCanvas(canvas.toDataURL("image/jpeg")!);
    },[photo, percentage]);

    return (<canvas ref={canvasRef}/>);
}


export default ProcessedImageCanvas;