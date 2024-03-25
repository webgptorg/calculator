import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Ranks the suitability of the ChatGPT solution for providing system solutions to build a client's web.
 */
export function rankChatgptSolution(prefecences) {
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
        'ChatGPT powered web solution',
        'Využijte pokročilé AI pro automatizaci, podporu a řízení obsahu na Vašich webových stránkách.',
    );

    solutionRank.pro('Schopnost automatizace a generování obsahu.');
    solutionRank.pro('Pokročilé AI funkce pro zvýšení interaktivnosti webu.');
    solutionRank.pro('Úspora času a zdrojů na správu obsahu.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog', 'application']);
    solutionRank.badFor({ webType }, ['eshop']);

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
            possible: 500, // ChatGPT could be used to generate product descriptions or support interactions but is not ideal for handling transactions.
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 10,
            possible: 50,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 20000 /* CZK */,
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
            ideal: 60 /* days */,
            possible: 30 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 50 /* % */ / 100,
            possible: 70 /* % */ / 100,
        },
    );

    solutionRank.con('Omezení v oblasti zpracování komplexních e-commerce řešení.');
    solutionRank.con('Vyžaduje pravidelné aktualizace a úpravy pro udržení kvality AI modelu.');
    solutionRank.con('Může vyžadovat dodatečné náklady na API volání pro dynamický obsah.');

    return solutionRank.calculate();
}
