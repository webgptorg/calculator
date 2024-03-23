import { SolutionRank } from '../script/SolutionRank.mjs';
import { webTypeToMessage } from './other/webTypeToMessage.mjs';

export function rankSolidpixelsSolution({
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
    const solutionRank = new SolutionRank('Solid Pixels', '');

    if (['eshop', 'application'].includes(webType)) {
        solutionRank.smallCon(`Není nejlepší volbou pro ${webTypeToMessage(webType, 2)}`);
    }

    return solutionRank;
}
