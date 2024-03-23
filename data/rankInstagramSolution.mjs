import { SolutionRank } from '../script/SolutionRank.mjs';
import { webTypeToMessage } from './other/webTypeToMessage.mjs';

export function rankInstagramSolution({
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
    const solutionRank = new SolutionRank('Instagram profil', 'Nemějte web, ale jen Instagram profil.');

    if (!['presentation', 'blog'].includes(webType)) {
        solutionRank.restrictiveCon(`Nelze použít jako ${webTypeToMessage(webType, 2)}`);
    }

    if (levelOfControl > 0.2) {
        solutionRank.bigCon('Předdefinované možnosti');
    }

    return solutionRank;
}
