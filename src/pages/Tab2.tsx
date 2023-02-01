import { IonContent,
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
  IonText, } from '@ionic/react';
import { images, square, triangle } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import { usePhotoGalleryFromCamera } from '../hooks/useGallery';
import './Tab2.css';

const Tab2: React.FC = () => {
  const { takePhoto, selectedPhoto } = usePhotoGalleryFromCamera();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonImg src={selectedPhoto?.webPath} />
        {/* <IonText>{selectedPhoto?.webPath}</IonText> */}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={images}></IonIcon>
          </IonFabButton>
        </IonFab>
</IonContent>
    </IonPage>
  );
};

export default Tab2;
