import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the WebGPT solution for Czech clients.
 */
export function rankWebgptSolution(prefecences) {
    const {
        webType, // <- 'presentation', 'eshop', 'blog', 'application'
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront, // <- In CZK
        budgetPerMonth, // <- In CZK
        daysToDeadline,
        levelOfControl,
        languageSupport, // Additional preference for language support
    } = prefecences;

    const solutionRank = new SolutionRank(
        'WebGPT',
        'Moderní přístup k vytváření webových stránek s využitím pokročilého AI.',
    );

    solutionRank.pro('Používá pokročilé AI pro generování obsahu.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application', 'eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 20,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 50,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 5,
            possible: 20,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 40000 /* CZK */,
            possible: 10000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 2000 /* CZK */,
            possible: 500 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 5 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    solutionRank.rankPrefecence(
        { languageSupport },
        {
            ideal: true, // Ideal if language support is critical
            possible: false, // Possible even if not initially supported
        },
    );

    if (languageSupport) {
        solutionRank.note('WebGPT poskytuje podporu pro Český jazyk, což umožňuje efektivní tvorbu a správu obsahu.');
    }

    return solutionRank.calculate();
}
