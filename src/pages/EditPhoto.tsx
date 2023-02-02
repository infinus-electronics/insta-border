import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
} from "@ionic/react";
import { useEffect } from "react";
import { usePhotoGalleryFromCamera } from "../hooks/useGallery";
import "./EditPhoto.css";

const EditPhoto: React.FC = () => {
  const { takePhoto, selectedPhoto } = usePhotoGalleryFromCamera();

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      takePhoto();
    }
    return () => {
      ignore = true;
    };
  }, []);

 
  return (
    <IonPage>
      <IonContent>
        <IonImg src={selectedPhoto?.webPath} />
      </IonContent>
    </IonPage>
  );
};

export default EditPhoto;
