package com.project.coupleLife.controllers;

import com.project.coupleLife.DTOS.PurchaseDTO;
import com.project.coupleLife.DTOS.UserPurchasesDTO;
import com.project.coupleLife.exceptions.UserNotFoundException;
import com.project.coupleLife.models.Purchase;
import com.project.coupleLife.models.User;
import com.project.coupleLife.services.PurchaseService;
import com.project.coupleLife.services.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final PurchaseService purchaseService;


    public UserController(UserService userService, PurchaseService purchaseService) {
        this.userService = userService;
        this.purchaseService = purchaseService;
    }

    @GetMapping("/getUser/{firstname}")
    public User getUser(@PathVariable String firstname) {
        return userService.getUser(firstname)
                .orElseThrow(() -> new UserNotFoundException("Utilisateur non trouvé"));
    }


    @GetMapping("/{userId}/purchases")
    public UserPurchasesDTO getUserPurchases(@PathVariable Long userId) {
        return purchaseService.getUserPurchases(userId);
    }

    @PostMapping("/{userId}/purchase")
    public Purchase sendUserPurchase(@RequestBody PurchaseDTO purchaseDTO, @PathVariable Long userId) {
        return purchaseService.sendUserPurchase(userId, purchaseDTO);
    }

    @DeleteMapping("/{userId}/purchase/{purchaseId}")
    public void deletePurchase(@PathVariable Long userId, @PathVariable Long purchaseId) {
        purchaseService.deletePurchase(userId, purchaseId);
    }

}
