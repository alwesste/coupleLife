import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';


export interface UserFormData {
  // Étape 1
  nom?: string;
  prenom?: string;
  email?: string;

  // Étape 2
  adresse?: string;
  ville?: string;
  codePostal?: string;

  // Étape 3
  telephone?: string;
  newsletter?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private formDataSubject = new BehaviorSubject<UserFormData>({});

  public formData$: Observable<UserFormData> = this.formDataSubject.asObservable();

  constructor() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      this.formDataSubject.next(JSON.parse(savedData));
    }
  }

  // Récupérer toutes les données
  getFormData(): UserFormData {
    return this.formDataSubject.value;
  }

  // Mettre à jour les données (fusion avec les données existantes)
  updateFormData(data: Partial<UserFormData>): void {
    const currentData = this.formDataSubject.value;
    const updatedData = { ...currentData, ...data };
    console.log("updatedData :", updatedData);
    this.formDataSubject.next(updatedData);

    // Sauvegarder dans le localStorage (optionnel)
    localStorage.setItem('formData', JSON.stringify(updatedData));
  }

  // Réinitialiser les données
  resetFormData(): void {
    this.formDataSubject.next({});
    localStorage.removeItem('formData');
  }

  // Vérifier si une étape est complète
  isStepComplete(step: number): boolean {
    const data = this.formDataSubject.value;

    switch(step) {
      case 1:
        return !!(data.nom && data.prenom && data.email);
      case 2:
        return !!(data.adresse && data.ville && data.codePostal);
      default:
        return false;
    }
  }
}
