import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Wix solution based on user preferences for Czech clients.
 */
export function rankWixSolution(prefecences) {
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
        'Wix',
        'Vytvořte svůj web snadno a rychle pomocí nástroje Wix, který nabízí široké možnosti přizpůsobení.',
    );

    solutionRank.pro('Jednoduché použití pro uživatele bez technických znalostí.');
    solutionRank.pro('Bohatá škála šablon a drag-and-drop editor.');

    solutionRank.goodFor({ webType }, ['presentation', 'eshop', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 0,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 20,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */,
            possible: 15000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 300 /* CZK */,
            possible: 5000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* day */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 80 /* % */ / 100,
        },
    );

    // Advantages
    solutionRank.advantages.push("Rychlá a intuitivní tvorba webů.",
                                 "Široký výběr přednastavených šablon.",
                                 "Integrované SEO nástroje.");

    // Disadvantages
    solutionRank.disadvantages.push("Nižší úroveň kontrolu než u tradičních CMS nebo vlastního kódu.",
                                    "Vyšší měsíční náklady ve srovnání s hostingem vlastního webu.",
                                    "Omezené možnosti pro rozsáhlé e-shopy a složité aplikace.");

    return solutionRank.calculate();
}