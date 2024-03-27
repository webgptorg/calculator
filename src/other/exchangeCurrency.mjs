export async function exchangeCurrency({ from, to, ammount }) {
    if (from === to) {
        return ammount;
    } else if (from === 'USD' && to === 'CZK') {
        // TODO: Fetch this data from some API
        return ammount * 23;
    } else {
        throw new Error(`Can not exchange ${from} -> ${to}`);
    }
}


/**
 * TODO: Use or remove
 */