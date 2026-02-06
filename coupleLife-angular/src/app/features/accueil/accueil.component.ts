import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {DatePipe} from '@angular/common';
import {UserPurchaseDTO} from '../../core/interfaces/user-purchase';
import {ModalComponent} from '../../shared/components/modal/modal/modal.component';
import {CacheService} from '../../core/services/cache.service';

@Component({
  selector: 'app-accueil',
  imports: [
    DatePipe,
    ModalComponent,
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {

  errorMessage: string = '';
  userPurchaseDTO: UserPurchaseDTO | undefined;
  @ViewChild('purchseModal') modalComponent!: ModalComponent;
  private user!: any;


  constructor(
    private userService: UserService,
    private cacheService: CacheService) {
  }

  ngOnInit() {

    this.userService.getUserPurchases(1).subscribe({
      next: (data: UserPurchaseDTO) => {
        this.userPurchaseDTO = data;
        console.log('Utilisateur chargé :', data);
        this.cacheService.setChache("userPurchase", this.userPurchaseDTO);
        console.log("this.purchaseDto", this.userPurchaseDTO);
      },
      error: (err: any) => {
        this.errorMessage = "Impossible de trouver l'utilisateur.";
        console.error(err);
      }
    });
  }

  onPurchaseCreated(newPurchase: any) {
    this.userPurchaseDTO!.purchases = [...this.userPurchaseDTO!.purchases, newPurchase];
    this.cacheService.setChache("userPurchase", this.userPurchaseDTO!);
  }

  onAdd(item: any) {
    this.modalComponent.open(item);
  }

  onEdit(item: any) {
    console.log("Edition de :", item);
  }


  onDelete(purchaseId: number) {
    const userPurchases = localStorage.getItem("userPurchases");
    if (!userPurchases) {
      console.error("No user purchases found in localStorage.");
      return;
    }
    const userPurchaseDTO: UserPurchaseDTO = JSON.parse(userPurchases);
    const purchaseToDelete = userPurchaseDTO.purchases.find(p => p.id === purchaseId);

    if (!purchaseToDelete) {
      console.error("Purchase not found.");
      return;
    }

    this.userService.deletePurchase(1, purchaseId).subscribe({
      next: () => {
        this.userPurchaseDTO!.purchases = this.userPurchaseDTO!.purchases.filter(p => p.id !== purchaseId);
        this.cacheService.setChache("userPurchase", this.userPurchaseDTO!);
        console.log("Purchase deleted successfully!");
      },
      error: (err) => {
        console.error("Error deleting purchase:", err);
      }
    });
  }

}


