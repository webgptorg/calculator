import { SolutionRank } from '../script/SolutionRank.mjs';
/**
 * Rank the suitability of the Solid Pixels solution based on user preferences.
 */
export function rankSolidpixelsSolution(prefecences) {
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
        'Solid Pixels', 
        'Použijte moderní a intuitivní platformu Solid Pixels pro snadnou tvorbu a správu webů.',
    );

    solutionRank.pro('Snadná tvorba webových stránek bez potřeby technických dovedností.');
    solutionRank.pro('Vstupní cena zahrnuje webhosting a zabezpečení.');
    solutionRank.pro('Intuitivní drag & drop editor.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['eshop', 'application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 12,
            possible: 50,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 50, // <- With basic e-commerce solutions
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'Pro jednodušší e-shop funkce nabízí Solid Pixels zabudované řešení, ale nemůže konkurovat specializovaným e-shop platformám.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 10,
        },
    );

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
            ideal: 500 /* CZK */,
            possible: 150 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 14 /* days */,
            possible: 1 /* day */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 30 /* % */ / 100,
            possible: 70 /* % */ / 100,
        },
    );

    solutionRank.con('Omezené možnosti pro náročnější weby a aplikace.');
    solutionRank.con('Pro pokročilé funkce může být potřeba integrace externích služeb.');
    solutionRank.con('E-shop řešení není vhodné pro velká a komplexní obchodní řešení.');

    return solutionRank.calculate();
}
