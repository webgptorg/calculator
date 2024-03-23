import { rankCustomSolution } from './rankCustomSolution.mjs';

export function rankChatgptSolution({
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
    // Note: Making web via ChatGPT is pretty much the same as custom solution but with some modifications
    const solutionRank = rankCustomSolution({
        webType,
        pagesCount,
        productsCount,
        updatesDaysPeriod,
        customFunctionsCount,
        budgetUpfront: budgetUpfront / 2,
        budgetPerMonth: budgetPerMonth / 2,
        daysToDeadline: daysToDeadline * 2,
        levelOfControl,
    });

    solutionRank.title = 'ChatGPT';
    solutionRank.description = 'Vygenerujte si web pomocí ChatGPT.';

    solutionRank.smallCon('Pomocí ChatGPT bez dalších znalostí vytvoříte pouze limitovaný web');

    return solutionRank;
}
