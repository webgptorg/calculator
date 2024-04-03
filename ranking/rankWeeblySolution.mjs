import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Weebly solution for a Czech client based on specified preferences.
 */
export function rankWeeblySolution(prefecences) {
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

    const solutionRank = new SolutionRank('Weebly', 'Jednoduchý nástroj na weebly.com pro tvorbu webových stránek.');

    solutionRank.pro('Snadné použití pro začátečníky.');
    solutionRank.con('Omezené možnosti pokročilého přizpůsobení.');

    solutionRank.smallPro('Rychlý start a žádné nutné programátorské dovednosti.');
    solutionRank.smallCon('Ne příliš vhodný pro složité aplikace nebo eshopy s mnoha produkty.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application', 'eshop']);

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
            ideal: 8000 /* CZK */,
            possible: 2000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 500 /* CZK */,
            possible: 200 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
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

    

    solutionRank.balance({"fitAverage":-218.58855290758066,"fitMin":-2475.0577701149427,"fitMax":106.05570114942527});

    

    solutionRank.balance({"fitAverage":-141.36960144393584,"fitMin":-1452.9645287356323,"fitMax":106.05570114942527});

    return solutionRank.calculate();
}
