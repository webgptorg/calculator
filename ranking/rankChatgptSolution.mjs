import { rankCustomSolution } from './rankCustomSolution.mjs';

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

    /**
     * How much quicker is ChatGPT compared to creating a website from scratch.
     */
    const chatgptEfficiency = 0.8;

    const solutionRank = rankCustomSolution({
        webType,
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront: budgetUpfront * chatgptEfficiency,

        // TODO: !!! Handle possibly negative budget
        budgetPerMonth: (budgetPerMonth - 650) * chatgptEfficiency, // <- Note: Price for ChatGPT+
        daysToDeadline: daysToDeadline * chatgptEfficiency,
        levelOfControl,
    }).reopen();

    solutionRank.title = 'ChatGPT';
    solutionRank.description = 'Vytvořte svůj pomocí ChatGPT';

    solutionRank.note(
        'Tvořit web pomocí ChatGPT je podobné jako tvořit web zcela sami. AI vám s mnoha úkoli pomůže, ale i tak si vše musíte nastavit, zařídit a napromptovat sami.',
    );
    solutionRank.note('Zkuste se podívat na další alternativy, jako je Microsoft Bing Copilot.');
    solutionRank.note('Zkuste vyzkoušet OpenAI playground, kde máte výrazně více možností.');
    solutionRank.note('Zvažte zakoupení ChatGPT+ pro lepší výsledky.');

    solutionRank.smallCon('Vše si musíte nastavit a napromptovat sami');

    if (productsCount > 0) {
        solutionRank.note('AI chatbot může pomoci zlepšit zákaznický servis na e-shopech.');
    }

    if (webType === 'application') {
        solutionRank.note('Do mnoha funkcí lze integrovat (Chat)GPT hlouběji.');
    }

    

    solutionRank.balance({"fitAverage":-3.8412753524030676,"fitMin":-13.39874213836478,"fitMax":2.106791111111111});

    return solutionRank.calculate();
}
