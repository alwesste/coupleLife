package com.project.coupleLife.DTOS;

import java.util.List;

public class UserPurchasesDTO {
    private String firstname;
    private List<PurchaseDTO> purchaseDTOS;

    public UserPurchasesDTO() {
    }

    public UserPurchasesDTO(String firstname, List<PurchaseDTO> purchaseDTOS) {
        this.firstname = firstname;
        this.purchaseDTOS = purchaseDTOS;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public List<PurchaseDTO> getPurchases() {
        return purchaseDTOS;
    }

    public void setPurchases(List<PurchaseDTO> purchaseDTOS) {
        this.purchaseDTOS = purchaseDTOS;
    }
}
