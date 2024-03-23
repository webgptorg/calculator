import { SolutionRank } from '../script/SolutionRank.mjs';
import { webTypeToMessage } from './other/webTypeToMessage.mjs';

export function rankLinktreeSolution({
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
    const solutionRank = new SolutionRank('Linktr.ee', 'Pro vytvoření jednoduchého webu/rozcestníku s odkazy.');

    if (!['presentation'].includes(webType)) {
        solutionRank.restrictiveCon(`Nevhodné pro ${webTypeToMessage(webType, 2)}`);
    }

    if (pagesCount > 1) {
        solutionRank.bigCon('Vhodné pouze pro jednostránkové rozcestníky s odkazy');
    }

    if (levelOfControl > 0.3) {
        solutionRank.bigCon('Velmi málo možností úprav');
    }

    return solutionRank;
}
