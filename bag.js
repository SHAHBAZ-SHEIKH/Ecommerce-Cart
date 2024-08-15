let bagItemObject;
console.log(bagItems)
// const itemValue = JSON.parse(localStorage.getItem("bagItem"));
// const disAfterRemoveItem = JSON.parse(localStorage.getItem("removeItem")) || []

let displayBagItemObject = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const productDetails = await response.json();
        //console.log(productDetails);
        bagItemObject = bagItems.map(bagValue => {
            for (let i = 0; i < productDetails.length; i++) {
                if (bagValue.itemId === productDetails[i].id) {
                    return productDetails[i];
                }
            }
        });
        
    
        generteCartItem();
        bagSummary()

    } catch (error) {
        console.log(error);
    }

    //console.log(bagItemObject);
};

function onload() {
    displayBagItemObject();
    
}

onload();


function bagSummary(){
    let bagSummary = document.querySelector(".bag-summary")

    let totalItem = bagItemObject.length;
    let totalMRP =0;
    let totalDiscount = 0;
    let finalPayment = 0;
    const CONVIENCEFES = 30;

    bagItemObject.forEach(bagTotalPrice =>{
        totalMRP +=bagTotalPrice.price
        totalDiscount +=bagTotalPrice.price * 0.2
        console.log(totalDiscount)
    })

    finalPayment +=totalMRP - totalDiscount + CONVIENCEFES

    bagSummary.innerHTML = `
    <div class="bag-details-container">
                    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
                    <div class="price-item">
                        <span class="price-item-tag">Total MRP</span>
                        <span class="price-item-value">Rs ${Math.floor(totalMRP)}</span>
                    </div>
                    <div class="price-item">
                        <span class="price-item-tag">Discount on MRP</span>
                        <span class="price-item-value priceDetail-base-discount">Rs ${Math.ceil(totalDiscount)}</span>
                    </div>
                    <div class="price-item">
                        <span class="price-item-tag">Convenience Fee</span>
                        <span class="price-item-value">Rs ${CONVIENCEFES}</span>
                    </div>
                    <hr>
                    <div class="price-footer">
                        <span class="price-item-tag">Total Amount</span>
                        <span class="price-item-value">Rs ${Math.ceil(finalPayment)}</span>
                    </div>
                </div>
                <button class="btn-place-order">
                    <div class="css-xjhrni">PLACE ORDER</div>
                </button>
    `
}


function removeBag(removeItemId){
    console.log(removeItemId)

    bagItems = bagItems.filter(bagItemId => bagItemId.itemId !=removeItemId)
    localStorage.setItem("bagItem",JSON.stringify(bagItems))
    console.log(bagItems)
    // displayBagItemObject()
    displayBagIcon()
    generteCartItem()
    displayBagItemObject()
    bagSummary()

}

function generteCartItem() {
    let bagItemsContainer = document.querySelector(".bag-items-container");
    bagItemsContainer.innerHTML = ""; 

    bagItemObject.forEach(cartValue => {
        const descriptionValue = cartValue.description.slice(1, 25);

        bagItemsContainer.innerHTML += `
        <div class="bag-item-container">
            <div class="item-left-part">
                <img class="bag-item-img" src="${cartValue.image}" alt="${cartValue.title}">
            </div>
            <div class="item-right-part">
                <div class="company">${cartValue.category}</div>
                <div class="item-name">${cartValue.title}</div>
                <div class="price-container">
                    <span class="current-price">${descriptionValue}...</span>
                </div>
                <div class="return-period">
                    <span class="return-period-days">Rs ${cartValue.price}</span>
                </div>
            </div>
            <div class="remove-from-cart" onclick="removeBag(${cartValue.id})">X</div>
        </div>
        `;
    });
}
