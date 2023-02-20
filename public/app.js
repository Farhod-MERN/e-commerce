
// Format Price
const priceProduct = document.querySelectorAll(".price")
priceProduct.forEach(item =>{
    item.textContent = new Intl.NumberFormat("us-US", 
    {
       currency : "usd",
       style: "currency"
    }
    ).format(item.textContent)
})

//  Remove from Basket 

const $card = document.querySelector(".myBasket")

if($card){
    $card.addEventListener("click", (e) =>{
        if(e.target.classList.contains("js-remove")){
            const id = e.target.dataset.id
            console.log(id);

            fetch("/card/remove/" + id, {
                method: "delete"
            }).then(res =>res.json())
            .then(card => console.log(card))
        }        
    })
}