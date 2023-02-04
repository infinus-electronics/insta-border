import { Photo } from "@capacitor/camera";
import { IonImg, IonSkeletonText } from "@ionic/react";
// import Jimp from "jimp";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./ProcessedImageCanvas.css"


interface PhotoProps {
  photo: Photo | undefined;
  percentage: number;
}

const ProcessedImageCanvas : React.FC<PhotoProps> = ({ photo, percentage }) => {

    const [loaded, setLoaded] = useState<boolean>()
    const canvasRef = useRef<HTMLCanvasElement>(null);
    

    useEffect(() => {
        // console.log("called")
        // console.log(photo)
    
      let canvas = canvasRef.current!;
      // console.log(canvas)
    let ctx = canvas.getContext("2d")!;
    let oc = document.createElement('canvas');
    let octx = oc.getContext('2d')!;
    
    let instagram = 1080;

   canvas.width = instagram; // destination canvas size
   canvas.height = instagram;
   ctx.fillStyle = "#FFFFFF";
   ctx.fillRect(0, 0, instagram, instagram);

    let img = new Image();
    if(photo !== undefined){
      img.src = photo.dataUrl!;      
    }    
    img.onload = () => {

    let targetHeight = 0;
    let targetWidth = 0;

    if (img.height > img.width) {
        targetHeight = Math.floor(instagram * (100-percentage) / 100);
        targetWidth = Math.floor(img.width/img.height*targetHeight);
    } else {
        targetWidth = Math.floor(instagram * (100-percentage) / 100);
        targetHeight = Math.floor(img.height/img.width*targetWidth);
    }

      setLoaded(true)
      let dx = Math.floor((instagram-targetWidth)/2);
      let dy = Math.floor((instagram-targetHeight)/2);
      ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, targetWidth, targetHeight);
  }

      return () => {
        setLoaded(false)
      }


    },[photo, percentage]);

    return (<canvas ref={canvasRef}/>);
}


export default ProcessedImageCanvas;