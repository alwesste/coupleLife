package com.project.coupleLife.services;

import com.project.coupleLife.DTOS.PurchaseDTO;
import com.project.coupleLife.DTOS.UserPurchasesDTO;
import com.project.coupleLife.exceptions.AccesDeniedException;
import com.project.coupleLife.models.Purchase;
import com.project.coupleLife.models.User;
import com.project.coupleLife.repositories.PurchaseRepository;
import com.project.coupleLife.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;

    public PurchaseService(PurchaseRepository purchaseRepository, UserRepository userRepository) {
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository;
    }

    public UserPurchasesDTO getUserPurchases(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
        List<Purchase> purchases = purchaseRepository.findByUserId(userId);
        List<PurchaseDTO> purchaseDTOS = purchases.stream()
                .map(p -> {
                    PurchaseDTO dto = new PurchaseDTO();
                    dto.setId(p.getId());
                    dto.setAmount(p.getAmount());
                    dto.setComment(p.getComment());
                    dto.setDate(p.getDate());
                    dto.setPurchaseType(p.getPurchaseType());
                    return dto;
                })
                .toList();
        return new UserPurchasesDTO(user.getFirstname(), purchaseDTOS);
    }

    public Purchase sendUserPurchase(Long userId, PurchaseDTO purchaseDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));

        Purchase newPurchase = new Purchase();
        newPurchase.setAmount(purchaseDTO.getAmount());
        newPurchase.setComment(purchaseDTO.getComment());
        newPurchase.setPurchaseType(purchaseDTO.getPurchaseType());
        newPurchase.setDate(new Date());
        newPurchase.setUser(user);
        purchaseRepository.save(newPurchase);

        return newPurchase;
    }

    public void deletePurchase(Long userId, Long purchaseId) {
        Purchase purchase = purchaseRepository.findById(purchaseId)
                .orElseThrow(() -> new EntityNotFoundException("Achat avec l'ID " + purchaseId + " introuvable."));

        if (!purchase.getUser().getId().equals(userId)) {
            throw new AccesDeniedException("Cet achat n'appartient pas à l'utilisateur spécifié.");
        }
        purchaseRepository.delete(purchase);
    }
}