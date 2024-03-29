import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Wix solution based on user preferences.
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
        'Využijte jednoduchého a intuitivního web builderu pro tvorbu svých webových stránek bez potřeby kódování.',
    );

    solutionRank.pro('Intuitivní drag-and-drop rozhraní.');
    solutionRank.con('Nižší míra kontrolu nad webem z hlediska optimalizace a rychlosti.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 20,
            possible: 50,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 300,
        },
    );

    if (productsCount > 0) {
        solutionRank.smallPro('Zahrnuje nástroje pro jednoduchou správu produktů.');
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5,
        },
    );

    if (customFunctionsCount > 0) {
        solutionRank.smallPro('Možnost využití externích aplikací z Wix App Marketu.');
        solutionRank.smallCon('Omezené možnosti pro složitější custom funkce.');
    }

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 15000 /* CZK */,
            possible: 5000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 300 /* CZK */,
            possible: 100 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 7 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 1 /* % */ / 100,
        },
    );

    

    solutionRank.balance(-47.41753298077261);

    return solutionRank.calculate();
}
