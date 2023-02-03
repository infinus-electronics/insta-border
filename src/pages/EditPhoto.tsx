import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonCard,
  IonRow,
  IonAvatar,
  IonCol,
  IonItem,
  IonIcon,
  IonText,
  IonButton,
  IonSkeletonText,
  IonThumbnail,
} from "@ionic/react";
import { useEffect } from "react";
import { usePhotoGalleryFromCamera } from "../hooks/useGallery";
import "./EditPhoto.css";
import {
  ellipsisHorizontal,
  heartOutline,
  chatbubbleOutline,
  sendOutline,
  bookmarkOutline,
} from "ionicons/icons";
import ProcessedImage from "../components/ProcessedImage";

const EditPhoto: React.FC = () => {
  const { takePhoto, selectedPhoto } = usePhotoGalleryFromCamera();

  useEffect(() => {
    takePhoto();
    // console.log("Fired");
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonRow class="ion-align-items-center ion-justify-content-center">
            <IonCol size="auto" class="ion-padding-start ion-padding-end">
              <IonAvatar>
                <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar>
            </IonCol>
            <IonCol class="profile">
              <IonText color="dark">
                <strong>infinus</strong>
              </IonText>
            </IonCol>
            <IonCol size="auto" class = "ion-padding">
              <IonIcon icon={ellipsisHorizontal}/>
            </IonCol>
          </IonRow>
          <div>
            {selectedPhoto === undefined ? 
            <IonSkeletonText
                         animated={true}
                         style={{ aspectRatio: "1/1" }}
                       ></IonSkeletonText> :
            <ProcessedImage photo={selectedPhoto} />}
          </div>

          <IonRow>
            <IonCol size="auto">
              <IonButton size="small" fill="clear" color="dark" mode="ios">
                <IonIcon icon={heartOutline} />
              </IonButton>
            </IonCol>
            <IonCol size="auto">
              <IonButton size="small" fill="clear" color="dark" mode="ios">
                <IonIcon icon={chatbubbleOutline} />
              </IonButton>
            </IonCol>
            <IonCol size="auto">
              <IonButton size="small" fill="clear" color="dark" mode="ios">
                <IonIcon icon={sendOutline} />
              </IonButton>
            </IonCol>
            <IonCol class="button">
              <IonButton size="small" fill="clear" color="dark" mode="ios">
                <IonIcon icon={bookmarkOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EditPhoto;
