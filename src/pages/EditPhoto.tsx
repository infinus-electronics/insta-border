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
  IonRange,
  IonLabel,
  IonFabButton,
  IonFab,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { usePhotoGalleryFromCamera } from "../hooks/useGallery";
import "./EditPhoto.css";
import {
  ellipsisHorizontal,
  heartOutline,
  chatbubbleOutline,
  sendOutline,
  bookmarkOutline,
  addOutline,
  removeOutline,
  saveOutline,
  peopleCircle
} from "ionicons/icons";
import ProcessedImageCanvas from "../components/ProcessedImageCanvas";
import { saveImage } from "../hooks/savePhoto";

const EditPhoto: React.FC = () => {
  const { takePhoto, selectedPhoto } = usePhotoGalleryFromCamera();
  const { processImage } = saveImage();
  const [borderPercentage, setBorderPercentage] = useState<number>(7);
  const [doneSaving, setDoneSaving] = useState(false);
  const [canSave, setCanSave] = useState(true);

  useEffect(() => {
    takePhoto();
    // console.log("Fired");
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <IonCard>
          <IonRow class="ion-align-items-center ion-justify-content-center">
            <IonCol size="auto" class="ion-padding-start">
              <IonAvatar>
              <IonIcon icon={peopleCircle} color="dark"></IonIcon>
              </IonAvatar>
            </IonCol>
            <IonCol class="text-left">
              <IonText color="dark">
                <strong>infinus</strong>
              </IonText>
            </IonCol>
            <IonCol size="auto" class="ion-padding">
              <IonIcon icon={ellipsisHorizontal} />
            </IonCol>
          </IonRow>
          <IonRow class="ion-align-items-center ion-justify-content-center">
            <IonCol>
              
              
                <ProcessedImageCanvas
                  photo={selectedPhoto}
                  percentage={borderPercentage}
                />
              
            </IonCol>
          </IonRow>

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
        <IonCard>
          <IonRow class="ion-align-items-center ion-justify-content-center">
            <IonCol class="text-left ion-padding">
              <IonText>Border Width: {borderPercentage}%</IonText>
            </IonCol>
            <IonCol size="auto">
              <IonButton
                size="small"
                fill="clear"
                color="dark"
                onClick={() => {
                  let current = borderPercentage;
                  setBorderPercentage(current + 1);
                }}
              >
                <IonIcon icon={addOutline}></IonIcon>
              </IonButton>
            </IonCol>
            <IonCol size="auto">
              <IonButton
                size="small"
                fill="clear"
                color="dark"
                onClick={() => {
                  let current = borderPercentage;
                  setBorderPercentage(current - 1);
                }}
              >
                <IonIcon icon={removeOutline}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow class="ion-padding-horizontal">
            <IonCol class="ion-padding=horizontal">
              <IonRange
                class="ion-no-padding"                
                value={borderPercentage}
                onIonChange={(e) => setBorderPercentage(e.target.value as number)}
              ></IonRange>
            </IonCol>
          </IonRow>
        </IonCard>
        <IonFab slot="fixed" horizontal="center" vertical="bottom">
          <IonFabButton disabled={!canSave} onClick={() => {
            if (selectedPhoto !== undefined && selectedPhoto.dataUrl !== undefined && canSave){
            processImage(selectedPhoto, borderPercentage, setDoneSaving, setCanSave)};
          }}>
            <IonIcon icon={saveOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonToast isOpen={doneSaving} onDidDismiss={() => setDoneSaving(false)} message="Saved!" duration={1500} />
      </IonContent>
    </IonPage>
  );
};

export default EditPhoto;
