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
} from "@ionic/react";
import { useEffect, useState } from "react";
import { usePhotoGalleryFromCamera } from "../hooks/useGallery";
import "./EditPhoto.css";
import {
  ellipsisHorizontal,
  heartOutline,
  chatbubbleOutline,
  sendOutline,
  bookmarkOutline,
  addOutline,
  removeOutline
  
} from "ionicons/icons";
import ProcessedImage from "../components/ProcessedImage";

const EditPhoto: React.FC = () => {
  const { takePhoto, selectedPhoto } = usePhotoGalleryFromCamera();
  const [ borderPercentage, setBorderPercentage] = useState<number>(7);

  useEffect(() => {
    takePhoto();
    // console.log("Fired");
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <IonCard>
          <IonRow class="ion-align-items-center ion-justify-content-center">
            <IonCol size="auto" class="ion-padding-start ion-padding-end">
              <IonAvatar>
                <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar>
            </IonCol>
            <IonCol class="text-left">
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
            <ProcessedImage photo={selectedPhoto} percentage={borderPercentage}/>}
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
        <IonCard>
          <IonRow class="ion-align-items-center ion-justify-content-center">
            <IonCol class="text-left ion-padding" >
            <IonText >Border Width: {borderPercentage}%</IonText>
            </IonCol>
            <IonCol size="auto">
              <IonButton size="small" fill="clear" color="dark" onClick={() => { let current = borderPercentage;
              setBorderPercentage(current+1);}}>
                <IonIcon icon={addOutline}></IonIcon>
              </IonButton>
            </IonCol>
            <IonCol size="auto">
              <IonButton size="small" fill="clear" color="dark" onClick={() => { let current = borderPercentage;
              setBorderPercentage(current-1);}}>
                <IonIcon icon={removeOutline}></IonIcon>
              </IonButton>
            </IonCol >
            </IonRow>
            <IonRow class="ion-padding-horizontal">
              <IonCol class="ion-padding=horizontal">
                <IonRange class="ion-no-padding" debounce = {80} onIonChange={(e)=>{setBorderPercentage(e.target.value as number)}}></IonRange>
        </IonCol>
        </IonRow>
        </IonCard>
        
            
          
         
        
              
      </IonContent>
    </IonPage>
  );
};

export default EditPhoto;
