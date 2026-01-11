export const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state: any) => {
    // Calculate items price as a number first
    const itemsPriceNum = state.cartItems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);
    state.itemsPrice = addDecimals(itemsPriceNum);

    // Calculate shipping price - convert itemsPrice to number for comparison
    const itemsPriceForCalc = Number(state.itemsPrice);
    const shippingPriceNum = itemsPriceForCalc >= 100 ? 0 : 10;
    state.shippingPrice = addDecimals(shippingPriceNum);

    // Calculate tax price - use the numeric items price
    const taxPriceNum = itemsPriceForCalc * 0.15;
    state.taxPrice = addDecimals(taxPriceNum);

    // Calculate total price
    state.totalPrice = (
        itemsPriceForCalc + Number(state.shippingPrice) + Number(state.taxPrice)
    ).toFixed(2);
    
    localStorage.setItem('cart', JSON.stringify(state));
    return state;
}