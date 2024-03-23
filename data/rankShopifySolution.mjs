import { SolutionRank } from '../script/SolutionRank.mjs';

export function rankShopifySolution({
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
    const solutionRank = new SolutionRank('Shopify', 'Vytvořte si svůj e-shop pomocí Shopify.');

    if (webType !== 'eshop') {
        solutionRank.restrictiveCon('Vhodné pouze pro e-shopy');
    }

    return solutionRank;
}
