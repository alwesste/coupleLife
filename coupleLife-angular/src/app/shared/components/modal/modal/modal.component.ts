import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UserService} from '../../../../core/services/user.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TransactionCategory} from '../../../../core/enums/transaction-category';

@Component({
  selector: 'app-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  purchaseModal!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    ) {}

  @ViewChild('modal') dialog!: ElementRef<HTMLDialogElement>;
  data: any;
  purchaseTypes: string[] = Object.values(TransactionCategory);
  @Output() purchaseCreated = new EventEmitter<any>();

  ngOnInit() {
    this.purchaseModal = this.fb.group({
      date: ['', Validators.required],
      purchaseType: ['', Validators.required],
      comment: ['', Validators.required],
      amount: ['', Validators.required],
    })
  }

  open(item: any) {
    this.data = item;
    this.dialog.nativeElement.showModal();
  }

  close() {
    this.dialog.nativeElement.close();
  }

  sendPurchase() {
    if (this.purchaseModal.valid) {
      this.userService.sendPurchase(1, this.purchaseModal.value).subscribe({
        next: (savedPurchase) => {
          this.purchaseCreated.emit(savedPurchase);
          this.close();
        },
        error: (err) => {
          console.error("Erreur lors de l'enregistrement :", err);
        }
      });
    }
  }
}
