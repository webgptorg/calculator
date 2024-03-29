import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Format solution based on user preferences for portfolio websites for artists and photographers.
 */
export function rankFormatSolution(prefecences) {
    const {
        webType,
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront,
        budgetPerMonth,
        daysToDeadline,
        levelOfControl,
    } = prefecences;

    const solutionRank = new SolutionRank(
        'Format',
        'Ideální řešení pro vytvoření portfolio webových stránek pro umělce a fotografa na format.com.',
    );

    solutionRank.pro('Snadné použití a krásné šablony.');

    solutionRank.goodFor({ webType }, ['presentation']);
    solutionRank.badFor({ webType }, ['eshop', 'blog', 'application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 20,
            possible: 50,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5,
        },
    );

    if (customFunctionsCount > 0) {
        solutionRank.note('Pro větší počet vlastních funkcí může být potřeba využití externích nástrojů nebo služeb.');
    }

    solutionRank.smallCon('Omezený počet produktů pro prodej.');

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 15,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 5000 /* CZK */,
            possible: 2000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 200 /* CZK */,
            possible: 500 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 3 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 50 /* % */ / 100,
            possible: 80 /* % */ / 100,
        },
    );

    solutionRank.bigPro('Optimalizováno pro portfolio umělců a fotografů.');

    solutionRank.smallCon('Může chybět pokročilá úprava pro personalizované požadavky.');

    solutionRank.balance({ fitAverage: -10.431653500696905, fitMin: -32.66666666666667, fitMax: 28.588778491083673 });

    return solutionRank.calculate();
}
