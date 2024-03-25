import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the WebGPT solution based on user preferences.
 */
export function rankWebgptSolution(prefecences) {
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
        'WebGPT',
        'Moderní řešení pro tvorbu dynamických a interaktivních webů s využitím nejnovějších technologií.',
    );

    solutionRank.pro('Využívá nejnovější technologie pro tvorbu webů.');

    solutionRank.goodFor({ webType }, ['application', 'eshop']);
    solutionRank.badFor({ webType }, ['presentation', 'blog']);

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
            ideal: 500,
            possible: 5000,
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
            ideal: 50000 /* CZK */,
            possible: 20000 /* CZK */,
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
            possible: 14 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 80 /* % */ / 100,
            possible: 100 /* % */ / 100,
        },
    );

    if (webType === 'application') {
        solutionRank.bigPro('Ideální pro komplexní webové aplikace s vysokou mírou interakce.');
    }

    if (pagesCount > 50) {
        solutionRank.smallCon('Méně vhodné pro weby s vysokým počtem statických stránek.');
    }

    if (customFunctionsCount > 20) {
        solutionRank.note(
            'Vysoký počet uživatelských funkcí může vyžadovat komplexnější plánování a zvýšené náklady.',
        );
    }

    if (budgetUpfront < 25000) {
        solutionRank.bigCon('Počáteční náklady mohou být pro některé klienty významnou bariérou.');
    }

    return solutionRank.calculate();
}