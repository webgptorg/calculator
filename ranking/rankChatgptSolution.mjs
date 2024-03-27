import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of a Generate website with AI chatbot solution based on user preferences.
 */
export function rankChatgptSolution(preferences) {
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
        'AI ChatGPT Web',
        'Vytvořte svůj web s AI chatbotem, kde můžete ručně řídit interakce a obsah.',
    );

    solutionRank.pro('Inovativní přístup k interakci s návštěvníky webu.');
    solutionRank.con('Vyžaduje pravidelnou údržbu a aktualizaci odpovědí chatbota.');

    solutionRank.goodFor({ webType }, ['application', 'eshop']);
    solutionRank.badFor({ webType }, ['presentation', 'blog']);

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
            possible: 500,
        },
    );

    if (productsCount > 0) {
        solutionRank.note('AI chatbot může pomoci s navigací a zlepšit zákaznický servis na e-shopech.');
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 5,
            possible: 15,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 50000 /* CZK */,
            possible: 15000 /* CZK */,
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
            possible: 30 /* days */,
        },
    );

    solutionRank.smallPro('Snižuje potřebu lidského zákaznického servisu.');
    solutionRank.smallCon('Může vyžadovat čas na učení a optimalizaci pro dosažení efektivní komunikace.');

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 60 /* % */ / 100,
            possible: 80 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}
