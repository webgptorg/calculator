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

    solutionRank.goodFor({ webType }, ['']);
    solutionRank.goodFor({ webType }, ['']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 'Pro malé projekty',
            '5-10': 'Pro střední projekty',
            '10+': 'Pro velké projekty',
        },
    );

    return solutionRank;
}
