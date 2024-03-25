import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the WebGPT solution based on user preferences.
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
    } = prefecences;

    const solutionRank = new SolutionRank(
        'WebGPT',
        'Inovujte svůj web použitím AI generovaného obsahu a funkcionalit.',
    );

    solutionRank.pro('Pokročilé AI generované obsahy a funkce.');

    solutionRank.goodFor({ webType }, ['blog', 'presentation']);
    solutionRank.badFor({ webType }, ['eshop', 'application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 500,
            possible: 5000,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 500, // <- Limited e-commerce capabilities
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'AI generovaný obsah může oživit popisy produktů, ale e-commerce funkcionalita je omezená.',
        );
    }

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
            ideal: 50000 /* CZK */,
            possible: 20000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 5000 /* CZK */,
            possible: 500 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 60 /* days */,
            possible: 14 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    solutionRank.disadvantages([
        'Náročnější na obsluhu a pochopení AI výstupů.',
        'Omezené možnosti pro rozsáhlé e-shop řešení.',
        'Vyšší náklady na implementaci AI technologií.'
    ]);

    return solutionRank.calculate();
}