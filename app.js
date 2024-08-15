const categoriesList = document.getElementById('categories');
const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cart-count');




let allCategoryElemetName =[]

let dataFecth = async (allcats=[])=>{
    if(!productContainer){
        return
    }

    productContainer.innerHTML =''
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const productDetails = await response.json()

        
    

    productDetails.forEach(categoryElement =>{
        if(!allCategoryElemetName.includes(categoryElement.category)){
            categoriesList.innerHTML +=`<li onclick="filterProducts(\`${categoryElement.category}\`)">${categoryElement.category}</li>`
        }

        allCategoryElemetName.push(categoryElement.category)
        

        if(allcats.length==0){
            allcats = allCategoryElemetName
        }

        //console.log(productDetails)

        const sliceElemeent = categoryElement.title.slice(0,20)

        if(allcats.includes(categoryElement.category)){
            productContainer.innerHTML += `
            <div class="col-12 col-sm-12 col-md-3 col-lg-3">
                <div class="itemContainer">
                    <img src="${categoryElement.image}" alt="">
                    <div class="categoryElement">${categoryElement.category}</div>
                    <div class="line"></div>
                    <div class="categoryTitle">${sliceElemeent}...</div>
                    <div class="ratingAndPrice">
                        <div class="rating">
                            ⭐${categoryElement.rating.rate} | ${categoryElement.rating.count}K
                        </div>
                        <div class="price">
                            Rs ${categoryElement.price}
                        </div>

                    </div>
                    
                    

                    <div class="btn" onclick="addtoCart(${categoryElement.id},${categoryElement.price})"><button>Add to Cart</button></div>

                </div>

            </div>
    
            
            `
        }
    
    })
    

    
    


    } catch (error) {
        console.log("Error",error)
        
    }
}



let bagItems;
onload()
function onload(){
    bagItems = JSON.parse(localStorage.getItem("bagItem")) || []
    dataFecth()
    displayBagIcon()
}


function filterProducts(filterItem){
    dataFecth(filterItem)
    
}


searchInput.addEventListener("input",()=>{
    const searcValue = searchInput.value.toLowerCase()
    dataFecth(searcValue)
})


function addtoCart(itemId,itemPrice){
    console.log(itemId,itemPrice)
    const itemDetail = {
        itemId,
        itemPrice
    }
    bagItems.push(itemDetail)

    localStorage.setItem("bagItem",JSON.stringify(bagItems))
    displayBagIcon()

    console.log(bagItems)
    
   
}


function displayBagIcon(){
    if(bagItems.length>0){
        cartCount.style.visibility = "visible"
        cartCount.innerText = bagItems.length
    }
    else{
        cartCount.style.visibility = "hidden"
    }
}

