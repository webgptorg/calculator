import { SolutionRank } from '../script/SolutionRank.mjs';
import { webTypeToMessage } from './other/webTypeToMessage.mjs';

export function rankWixSolution({
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
    const solutionRank = new SolutionRank('Wix', 'Jednoduchý webový builder pro vytvoření webu bez programování.');

    if (['application'].includes(webType)) {
        solutionRank.smallCon(`Není nejlepší volbou pro ${webTypeToMessage(webType, 2)}`);
    }

    if (productsCount > 100) {
        solutionRank.con('Nevhodné pro větší e-shopy');
    }

    if (pagesCount > 100) {
        solutionRank.con('Nevhodné pro větší weby');
    }

    if (customFunctionsCount > 3) {
        solutionRank.bigCon('Komplexnější funkční požadavky mohou být problematické realizovat s Wix');
    }

    if (budgetPerMonth < 25) {
        solutionRank.con('Rozpočet na měsíční údržbu je pod optimalní úrovní pro Wix');
    }

    if (daysToDeadline >= 7 && daysToDeadline <= 30) {
        solutionRank.pro('Realistické časové období pro vytvoření webu na platformě Wix');
    }

    return solutionRank;
}
