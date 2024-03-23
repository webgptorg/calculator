import { SolutionRank } from '../script/SolutionRank.mjs';
import { webTypeToMessage } from './other/webTypeToMessage.mjs';

export function rankFacebookSolution({
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
    const solutionRank = new SolutionRank('Facebook profil', 'Nemějte web, ale jen Facebook profil.');

    if (!['presentation', 'blog', 'eshop'].includes(webType)) {
        solutionRank.restrictiveCon(`Nelze použít jako ${webTypeToMessage(webType, 2)}`);
    }

    if (levelOfControl > 0.2) {
        solutionRank.bigCon('Předdefinované možnosti');
    }

    return solutionRank;
}
