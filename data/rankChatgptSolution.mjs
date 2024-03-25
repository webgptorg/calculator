import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the ChatGPT solution based on user preferences.
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
        'ChatGPT Web Interface',
        'Použijte umělou inteligenci ChatGPT k dynamické interakci s uživateli na vaší web stránce.',
    );

    solutionRank.pro('Pokročilé AI schopnosti pro interakci s uživateli.');

    solutionRank.goodFor({ webType }, ['application', 'blog']);
    solutionRank.badFor({ webType }, ['presentation', 'eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1, // AI-driven content is dynamic, requiring fewer static pages
            possible: 10,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0, // ChatGPT is not primarily for e-commerce
            possible: 50, // Could assist in product inquiries
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 1, // Leveraging ChatGPT for specific tasks reduces the need for many custom functions
            possible: 10,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 15000, // Requires investment in integration and possibly server costs
            possible: 5000,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 2000, // Continued API usage costs
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30, // Time for integration and testing
            possible: 7,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 60 / 100, // Flexible but may not allow for 100% control
            possible: 80 / 100,
        },
    );

    // Noting specific advantages and disadvantages
    solutionRank.bigPro('Přizpůsobení obsahu na základě uživatelské interakce.');
    solutionRank.smallCon('Vyžaduje průběžné náklady na API.');
    solutionRank.note('Potřebuje konstantní připojení k internetu pro interakci s API ChatGPT.');

    return solutionRank.calculate();
}