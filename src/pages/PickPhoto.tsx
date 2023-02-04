import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
  IonText,
  IonCard,
} from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import { usePhotoGalleryFromCamera } from "../hooks/useGallery";
import { useHistory } from "react-router-dom";
import "./PickPhoto.css";
import { useEffect, useLayoutEffect, useState } from "react";
import toggleDarkTheme from "../hooks/toggleDark";

const PickPhoto: React.FC = () => {
  const { takePhoto, selectedPhoto } = usePhotoGalleryFromCamera();
  const history = useHistory();
  const [dark, setDark] = useState(false);
  

  useLayoutEffect(()=>{
    const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(preferDark);
    window.matchMedia('(prefers-color-scheme: dark)').onchange = (e) => {
      setDark(e.matches);
    }
  }, []);

  useLayoutEffect(() => {
    toggleDarkTheme(dark);
  }, [dark]);

  
  return (
    <IonPage>
      <IonContent
        onClick={(e) => {
          e.preventDefault();
          history.push("/editphoto");
        }}
      >
        {/* <IonImg src={selectedPhoto?.webPath} /> */}
        {/* <IonText>{selectedPhoto?.webPath}</IonText> */}
        <IonGrid>
          <IonRow class="ion-justify-content-center ion-align-items-center">
            <IonCol>
              <IonIcon
                icon={addCircleOutline}
                class="pick"
                color="medium"
              ></IonIcon>
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center ion-align-items-center">
            <IonCol>
              <IonText color="medium">Tap anywhere to select image</IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PickPhoto;
