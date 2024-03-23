import { SolutionRank } from '../script/SolutionRank.mjs';
import { webTypeToMessage } from './other/webTypeToMessage.mjs';

export function rankWebgptSolution({
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
    const solutionRank = new SolutionRank('WebGPT', 'Vygenerujte si web pomocí WebGPT za 3 minuty.');

    if (['application', 'blog'].includes(webType)) {
        solutionRank.smallCon(`Není nejlepší volbou pro ${webTypeToMessage(webType, 2)}`);
    }

    if (pagesCount > 10) {
        solutionRank.bigCon('Není ideální pro více stránek');
    }

    if (customFunctionsCount > 2) {
        solutionRank.bigCon('Omezené možnosti pro vlastní funkce');
    }

    if (daysToDeadline < 15) {
        solutionRank.bigPro('Ideální pro rychlé nasazení');
    }

    if (budgetUpfront < 500) {
        solutionRank.pro('Levné');
    }

    if (budgetPerMonth < 300) {
        solutionRank.pro('Levné');
    }

    return solutionRank;
}
