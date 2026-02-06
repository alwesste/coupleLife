// import { Component } from '@angular/core';
// import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
// import {FormDataService, UserFormData} from '../../../core/services/form-data.service';
// import {Router} from '@angular/router';
// import {UserService} from '../../../core/services/user.service';
// import {CommonModule} from '@angular/common';
//
// @Component({
//   selector: 'app-home3',
//   imports: [
//     ReactiveFormsModule,
//     CommonModule,
//   ],
//   templateUrl: './home3.component.html',
//   styleUrl: './home3.component.scss'
// })
// export class Home3Component {
//   step3Form!: FormGroup;
//   allFormData: UserFormData = {};
//   isSubmitting = false;
//
//   constructor(
//     private fb: FormBuilder,
//     private formDataService: FormDataService,
//     private userService: UserService,
//     private router: Router
//   ) {}
//
//   ngOnInit() {
//     // Vérifier que les étapes précédentes sont complètes
//     if (!this.formDataService.isStepComplete(1) || !this.formDataService.isStepComplete(2)) {
//       this.router.navigate(['/step1']);
//       return;
//     }
//
//     this.step3Form = this.fb.group({
//       telephone: ['', [Validators.required, Validators.pattern(/^0[1-9]\d{8}$/)]],
//       newsletter: [false]
//     });
//
//     // Charger toutes les données
//     this.allFormData = this.formDataService.getFormData();
//
//     // Charger les données de cette étape si elles existent
//     this.step3Form.patchValue({
//       telephone: this.allFormData.telephone,
//       newsletter: this.allFormData.newsletter
//     });
//   }
//
//   onPrevious() {
//     this.formDataService.updateFormData(this.step3Form.value);
//     this.router.navigate(['/home2']);
//   }
//
//   onSubmit() {
//     if (this.step3Form.valid) {
//       this.isSubmitting = true;
//
//       // Fusionner toutes les données
//       const finalData = {
//         ...this.allFormData,
//         ...this.step3Form.value
//       };
//
//       // Sauvegarder via le service API
//       this.userService.createUser(finalData).subscribe({
//         next: (response) => {
//           console.log('Inscription réussie!', response);
//
//           // Nettoyer les données sauvegardées
//           this.formDataService.resetFormData();
//
//           // Rediriger vers une page de confirmation
//           this.router.navigate(['/success']);
//         },
//         error: (error) => {
//           console.error('Erreur lors de l\'inscription:', error);
//           this.isSubmitting = false;
//           alert('Une erreur est survenue. Veuillez réessayer.');
//         }
//       });
//     } else {
//       this.step3Form.markAllAsTouched();
//     }
//   }
// }
