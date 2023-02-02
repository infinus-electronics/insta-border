import { Photo } from "@capacitor/camera";
import { IonImg } from "@ionic/react";

interface PhotoProps {
    photo: Photo
}

const ProcessedImage : React.FC<PhotoProps> = ({photo}) => {
    
    return (
        <IonImg class="selected" src={photo?.webPath} />
    );
};

export default ProcessedImage;