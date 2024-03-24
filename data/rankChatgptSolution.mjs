import { SolutionRank } from '../script/SolutionRank.mjs';


/**
 * Ranks the suitability of the ChatGPT solution for website implementation based on user preferences.
 */
export function rankChatgptSolution(preferences) {
    const {
        webType,
        pagesCount,
        interactionsCount, // This replaces productsCount for more generality
        customFunctionsCount,
        budgetUpfront,
        budgetPerMonth,
        daysToDeadline,
        levelOfLocalization, // Added for relevance to Czech clients
    } = preferences;

    const solutionRank = new SolutionRank(
        'ChatGPT for Web',
        'Využijte pokročilé možnosti ChatGPT pro interaktivní a dynamické webové stránky.',
    );

    solutionRank.pro('Umožňuje vytvoření vysoce interaktivních a personalizovaných webů.');
    solutionRank.pro('Může automatizovat odpovědi na často kladené otázky.');

    solutionRank.goodFor({ webType }, ['application', 'blog']);
    solutionRank.badFor({ webType }, ['eshop', 'presentation']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 20,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { interactionsCount },
        {
            ideal: 10000,
            possible: 100000,
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
            possible: 5000 /* CZK */,
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
            ideal: 30 /* days */,
            possible: 3 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfLocalization },
        {
            ideal: 100 /* % */,
            possible: 50 /* % */,
        },
    );

    solutionRank.con('Vyžaduje integraci se serverovými funkcemi pro plnou funkčnost.');
    solutionRank.con('Může vyžadovat pokročilé programovací znalosti k efektivní implementaci.');
    solutionRank.con('Může vyžadovat pravidelné úpravy a údržbu pro udržení aktuálnosti odpovědí a interakcí.');

    return solutionRank.calculate();
}
