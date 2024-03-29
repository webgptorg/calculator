import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Zyro solution based on user preferences.
 */
export function rankZyroSolution(prefecences) {
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

    const solutionRank = new SolutionRank('Zyro', 'Použijte jednoduchý nástroj na vytvoření webu s Zyro.com.');

    solutionRank.pro('Přátelské k uživatele s intuitivním drag-and-drop rozhraním.');

    solutionRank.goodFor({ webType }, ['presentation', 'eshop', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

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
            possible: 100, // Zyro's e-commerce capabilities are improving but still limited
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5, // Limited custom functions due to the simplicity of Zyro
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 15000 /* CZK */,
            possible: 3000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 500 /* CZK */,
            possible: 200 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* day */, // Quick setup and deployment
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    solutionRank.con('Omezený počet možností přizpůsobení v porovnání s komplexnějšími systémy.');

    solutionRank.balance({ fitAverage: -8.21040743616712, fitMin: -36, fitMax: 33.666987676047036 });

    return solutionRank.calculate();
}
