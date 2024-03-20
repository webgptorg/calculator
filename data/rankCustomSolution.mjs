import { SolutionRank } from '../script/SolutionRank.mjs';

export function rankCustomSolution({
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
    const solutionRank = new SolutionRank('Vlastní řešení', 'Naprogramujte si vlastní řešení.');

    if (levelOfControl < 0.5) {
        solutionRank.pushBenefit(-1, 'Mnoho věcí budete muset řešit sami místo abyste se mohli věnovat svému byznysu');
    }

    if (daysToDeadline < 30) {
        solutionRank.pushBenefit(-2, 'Za tak krátkou dobu nestihnete vytvořit vlastní řešení');
    }

    return solutionRank;
}
