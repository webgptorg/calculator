import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Just test
 */
export function rankTestSolution(prefecences) {
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
        'Test',
        'Test test',
    );

    solutionRank.bigPro('Hey bro');

    

    solutionRank.balance(-3);

    

    solutionRank.balance(0);

    return solutionRank.calculate();
}