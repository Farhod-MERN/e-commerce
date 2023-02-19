

const priceProduct = document.querySelectorAll(".price")

priceProduct.forEach(item =>{
    item.textContent = new Intl.NumberFormat("us-US", 
    {
       currency : "usd",
       style: "currency"
    }
    ).format(item.textContent)
})