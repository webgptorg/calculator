import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Pixpa solution based on user preferences.
 */
export function rankPixpaSolution(prefecences) {
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
        'Pixpa',
        'Vytvořte úžasné webové stránky s Pixpa - ideální pro tvůrce, kteří chtějí dát svým dílům prostor.',
    );

    solutionRank.pro('Jednoduché rozhraní pro snadnou tvorbu webů.');
    solutionRank.con('Omezená přizpůsobivost v porovnání se samostatnými webovými řešeními.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
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
            possible: 50, // Pixpa supports simple e-commerce solutions
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'Pixpa podporuje jednoduché řešení pro eshopy, ale pro rozsáhlý katalog může být méně vhodný.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5,
        },
    );

    if (customFunctionsCount > 1) {
        solutionRank.bigCon('Pixpa není optimální pro velké množství vlastních funkcí kvůli svým omezením.');
    }

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 5000 /* CZK */,
            possible: 0 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 200 /* CZK */,
            possible: 50 /* CZK */,
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
            possible: 70 /* % */ / 100,
        },
    );

    

    solutionRank.balance({"fitAverage":-9.896591351256063,"fitMin":-39,"fitMax":34.28936072774628});

    return solutionRank.calculate();
}
