import { SolutionRank } from '../script/SolutionRank.mjs';
import { webTypeToMessage } from './other/webTypeToMessage.mjs';

export function rankWebflowSolution({
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
    const solutionRank = new SolutionRank('Webflow', 'Vytvořte si profesionalní web bez nutnosti programovat.');

    if (['application'].includes(webType)) {
        solutionRank.smallCon(`Není nejlepší volbou pro ${webTypeToMessage(webType, 2)}`);
    }

    if (productsCount + pagesCount + customFunctionsCount > 1000) {
        solutionRank.con('Nevhodné pro velké weby');
    }

    if (customFunctionsCount > 5) {
        solutionRank.con('Přidání složitějších funkcí může být výzvou');
    }

    if (daysToDeadline < 7) {
        solutionRank.con('Nedostatečný čas pro vytvoření webu');
    }

    return solutionRank;
}
