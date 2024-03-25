import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Shoptet solution based on user preferences.
 */
export function rankShoptetSolution(prefecences) {
    const {
        webType,
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront,
        budgetPerMonth,
        daysToDeadline,
        levelOfControl,
    } = prefecences;

    const solutionRank = new SolutionRank(
        'Shoptet',
        'Řešení všeho potřebného pro online prodej a provoz e-shopu od českého poskytovatele.',
    );

    solutionRank.pro('Vše v jednom pro zahájení a provoz e-shopu.');
    solutionRank.con('Omezenější úroveň přizpůsobení v porovnání s plně custom řešením.');

    solutionRank.goodFor({ webType }, ['eshop']);
    solutionRank.badFor({ webType }, ['presentation', 'blog', 'application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 50,
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 100,
            possible: 5000,
        },
    );

    if (productsCount > 5000) {
        solutionRank.note(
            'Pro velmi obsáhlé katalogy produktů může být potřeba navýšení tarifu nebo individuální řešení.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 10,
        },
    );

    if (customFunctionsCount > 0) {
        solutionRank.note(
            'Integrace s externími službami či vytvoření specifických funkcí je možná, ale může vyžadovat další náklady a práci na míru.',
        );
    }

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 25000 /* CZK */,
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
            ideal: 30 /* days */,
            possible: 7 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 50 /* % */ / 100,
            possible: 20 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}