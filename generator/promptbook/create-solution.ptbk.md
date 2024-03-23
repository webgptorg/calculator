# Web Ranking Function

-   INPUT PARAM {solutionName} Name for the system which we can build the web in
-   OUTPUT PARAM {functionName} Name of the ranking function for the system
-   OUTPUT PARAM {functionSourceCode} Source code of the ranking function for the system

## Function name

-   EXACUTE SCRIPT

```javascript
const functionName = `rank${capitalize(solutionName.split(/\W/g).join('').toLowerCase())}Solution`;
```

`-> {functionName}`

## Write ranking function for {solutionName}

-   MODEL VARIANT Chat
-   MODEL NAME `chatgpt-4-turbo`

```

You are an expert in web design and systems and solutions to build the client's web, write new ranking function, for **{solutionName}**.

## Rules

-   Write just the ranking function, not then explanation
-   The function should be named `{functionName}`
-   Include all pros and cons of the solution
-   ranking function works for Czech clients, so the texts are in Czech and the prices are in CZK (czech crowns)

## Sample

Here is a sample of the ranking function for **Wordpress**:

\`\`\`\javascript
/**
 * Rank the suitability of the WordPress solution based on user preferences.
 */
export function rankWordpressSolution(prefecences) {
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
        'Self-hosted WordPress',
        'Využijte nejrozšířenější open-source CMS na světě pro vytvoření svých webových stránek.',
    );

    solutionRank.pro('Nejrozšířenější open-source CMS na světě.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application', 'eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1000,
            possible: 10000,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 1000, // <- With some plugins like WooCommerce
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'Existují pluginy jako [WooCommerce](https://wordpress.org/plugins/woocommerce/), které umožňují vytvořit eshop na WordPressu.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 30,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 30000 /* CZK */,
            possible: 7000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 1000 /* CZK */,
            possible: 100 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 90 /* days */,
            possible: 7 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 40 /* % */ / 100,
            possible: 60 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}
\`\`\`


```

`-> {functionSourceCode}`
