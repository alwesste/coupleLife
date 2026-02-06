import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormDataService} from '../../../../core/services/form-data.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  step1Form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // Créer le formulaire
    this.step1Form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // Charger les données sauvegardées si elles existent
    const savedData = this.formDataService.getFormData();
    if (savedData.nom || savedData.prenom || savedData.email) {
      this.step1Form.patchValue({
        nom: savedData.nom,
        prenom: savedData.prenom,
        email: savedData.email
      });
    }
  }

  onNext() {
    if (this.step1Form.valid) {
      // Sauvegarder les données dans le service
      this.formDataService.updateFormData(this.step1Form.value);

      // Naviguer vers l'étape suivante
      this.router.navigate(['/home2']);
    } else {
      this.step1Form.markAllAsTouched();
    }
  }
}
