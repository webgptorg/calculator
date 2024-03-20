export function customSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    let fit = 1;

    if (levelOfControl < 0.5) {
        fit *= 0.5;
    }

    return {
        fit,
        title: 'Vlastní řešení',
        description: 'Naprogramujte si vlastní řešení.',
        pros: [],
        cons: [],
    };
}
