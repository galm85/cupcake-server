
const getTotalPrice = (items)=>{
    let total = 0;
    items.forEach(element => {
        total += (element.price + element.amount);
    });
    total = total.toFixed(2);
    return total;
}




module.exports = {
getTotalPrice,
}