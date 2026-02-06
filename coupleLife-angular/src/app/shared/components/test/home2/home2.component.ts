import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormDataService} from '../../../../core/services/form-data.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home2',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './home2.component.html',
  styleUrl: './home2.component.scss'
})
export class Home2Component {
  step2Form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // Vérifier que l'étape 1 est complète
    if (!this.formDataService.isStepComplete(1)) {
      this.router.navigate(['/step1']);
      return;
    }

    this.step2Form = this.fb.group({
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      codePostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });

    // Charger les données sauvegardées
    const savedData = this.formDataService.getFormData();
    this.step2Form.patchValue({
      adresse: savedData.adresse,
      ville: savedData.ville,
      codePostal: savedData.codePostal
    });
  }

  onPrevious() {
    // Sauvegarder avant de revenir en arrière
    this.formDataService.updateFormData(this.step2Form.value);
    this.router.navigate(['/home']);
  }

  onNext() {
    if (this.step2Form.valid) {
      this.formDataService.updateFormData(this.step2Form.value);
      this.router.navigate(['/home3']);
    } else {
      this.step2Form.markAllAsTouched();
    }
  }
}
