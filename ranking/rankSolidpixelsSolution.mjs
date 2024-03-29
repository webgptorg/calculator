import { SolutionRank } from '../src/SolutionRank.mjs';

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
        'Využijte jednoduchou a intuitivní platformu Solid Pixels pro vytvoření vlastní webové prezentace či e-shopu.',
    );

    solutionRank.pro('Snadná a rychlá tvorba webových stránek bez nutnosti programování.');

    solutionRank.goodFor({ webType }, ['presentation', 'eshop']);
    solutionRank.badFor({ webType }, ['application', 'blog']);

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
            ideal: 10,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 10000 /* CZK */,
            possible: 5000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 1000 /* CZK */,
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
            ideal: 60 /* % */ / 100,
            possible: 80 /* % */ / 100,
        },
    );

    if (webType === 'eshop') {
        solutionRank.bigPro('Přímočará integrace s platbami a správou produktů.');
        solutionRank.bigCon('Omezené možnosti individualizace a rozšíření funkcionalit pro komplexnější e-shopy.');
    }

    if (webType === 'application') {
        solutionRank.bigCon('Ne vhodný pro vývoj složitých webových aplikací s vysokou mírou custom funkcí.');
    }

    

    solutionRank.balance(-33.73664216855809);

    return solutionRank.calculate();
}
