package com.project.coupleLife.controllers;

import com.project.coupleLife.services.PurchaseService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/purchase")
public class PurchasesController {

    private final PurchaseService purchaseService;

    public PurchasesController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }



}
