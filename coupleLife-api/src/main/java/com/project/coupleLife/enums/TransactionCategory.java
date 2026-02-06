package com.project.coupleLife.enums;

public enum TransactionCategory {
    RESTAURANT("Restaurant et Sorties", false),
    COURSES("Courses Alimentaires", false),
    LOYER("Loyer et Charges", true),
    TRANSPORT("Transport", true),
    SANTE("Santé", false),
    LOISIRS("Loisirs et Culture", false),
    AUTRE("Autres dépenses", false);

    private final String label;
    private final boolean isFixedExpense;

    // Le constructeur d'une enum est toujours privé
    TransactionCategory(String label, boolean isFixedExpense) {
        this.label = label;
        this.isFixedExpense = isFixedExpense;
    }

    public String getLabel() {
        return label;
    }

    public boolean isFixedExpense() {
        return isFixedExpense;
    }
}