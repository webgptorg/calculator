import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of using an Instagram account as the sole web presence based on user preferences.
 */
export function rankInstagramSolution(preferences) {
    const {
        webType, // <- 'presentation', 'eshop', 'blog', 'application'
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront, // <- In CZK
        budgetPerMonth, // <- In CZK
        daysToDeadline,
        levelOfControl,
    } = preferences;

    const solutionRank = new SolutionRank(
        'Instagram Account',
        'Využijte platformu Instagram jako hlavní způsob prezentace na internetu.',
    );

    solutionRank.bigPro('Žádné náklady na spuštění.');
    solutionRank.bigCon('Omezená kontrola nad designem a funkcionalitou.');

    solutionRank.smallPro('Rychlá implementace.');
    solutionRank.smallCon('Nízká úroveň personalizace.');

    solutionRank.pro('Široké dosažení cílové skupiny.');
    solutionRank.con('Závislost na jedné platformě.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['eshop', 'application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 5,
            possible: 1, // Considering Instagram's profile and post structure
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 50, // With Instagram Shopping features
        },
    );

    if (productsCount > 0) {
        solutionRank.note('Využijte funkce Instagram Shopping pro prezentaci produktů přímo na vašem profilu.');
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 0, // Instagram does not allow custom functions
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */,
            possible: 0 /* CZK */, // No upfront cost for using Instagram
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 0 /* CZK */,
            possible: 5000 /* CZK */, // For promoting posts if necessary
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 1 /* days */,
            possible: 7 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 10 /* % */ / 100,
            possible: 20 /* % */ / 100,
        },
    );

    

    solutionRank.balance({"fitAverage":null,"fitMin":null,"fitMax":103.75});

    

    solutionRank.balance({"fitAverage":null,"fitMin":null,"fitMax":103.75});

    return solutionRank.calculate();
}
