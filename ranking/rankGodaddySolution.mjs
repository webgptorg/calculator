import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the GoDaddy solution based on user preferences.
 */
export function rankGodaddySolution(prefecences) {
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
        'GoDaddy',
        'Využijte služby GoDaddy pro snadnou a rychlou tvorbu webových stránek.',
    );

    solutionRank.pro('Snadné použití pro začátečníky.');
    solutionRank.con('Nižší míra přizpůsobení ve srovnání s CMS jako je WordPress.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application', 'eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 50,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 50,
        },
    );

    solutionRank.smallPro('Integrované šablony a nástroje pro e-shopy.');
    solutionRank.smallCon('Funkce pro e-shopy mohou být omezenější než na specializovaných platformách.');

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 10,
        },
    );

    solutionRank.bigPro('Rychlé spuštění webu díky šablonám a drag & drop editoru.');
    solutionRank.bigCon('Omezené možnosti pro pokročilé uživatelské přizpůsobení a rozšíření.');

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 5000 /* CZK */,
            possible: 15000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 300 /* CZK */,
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
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    

    solutionRank.balance({"fitAverage":-269.1057088124251,"fitMin":-2749.993553623188,"fitMax":105.6559768115942});

    return solutionRank.calculate();
}
