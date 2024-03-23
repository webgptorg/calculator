import { SolutionRank } from '../script/SolutionRank.mjs';

export function rankCustomSolution({
    webType,
    pagesCount,
    productsCount,
    // [🆙] updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('Vlastní řešení', 'Naprogramujte si vlastní řešení.');

    solutionRank.pro('Máte plnou kontrolu nad vším.');
    solutionRank.con('Mnoho věcí musíte udělat sami.');

    return solutionRank;
}
