import { SolutionRank } from '../script/SolutionRank.mjs';

export function rankShoptetSolution({
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
    const solutionRank = new SolutionRank('ShopTet', 'Český systém pro vytvoření e-shopu.');

    if (webType !== 'eshop') {
        solutionRank.restrictiveCon('Vhodné pouze pro e-shopy');
    }

    return solutionRank;
}
