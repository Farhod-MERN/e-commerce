
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
            }).then(res => res.json())
            .then(card => {
                 if(card.products.length){
                    const dinamicHtml = card.products.map((c)=>{
                        return `
                        <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img
                              src="${c.image}"
                              alt=""
                              style="width: 45px; height: 45px"
                              class="rounded"
                            />
                            <div class="ms-3">
                              <p class="fw-bold mb-1"><a href="/products/${c.id}" class="text-decoration-none"/>${c.name}</a></p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="fw-normal mb-1">${c.count}</p>
                        </td>
                        <td>
                          <p class="fw-normal mb-1">${c.price}</p>
                        </td>
                        <td>
                            <button type="button" class="btn btn-link btn-sm btn-rounded text-decoration-none">
                            +
                          </button> 
                        </td>
                        <td><button type="button" data-id="${c.id}" class="js-remove btn btn-link btn-sm btn-rounded text-decoration-none">
                            -
                          </button>
                        </td>
                      </tr>
                        `
                    }).join("")
                    $card.querySelector("tbody").innerHTML = dinamicHtml
                    $card.querySelector(".price").textContent = card.price
                }else{
                    $card.innerHTML = `
                    <div class="myBasket text-center">
                        <div class="container-fluid  mt-100">
                            <div class="row">	 
                                <div class="col-md-12">
                                    <div class="card mt-md-5 mt-lg-5">
                                            <div class="card-body cart">
                                                    <div class="col-sm-12 empty-cart-cls text-center">
                                                        <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" class="img-fluid mb-4 mr-3">
                                                        <h3><strong>Your Cart is Empty</strong></h3>
                                                        <h4>Add something to make me happy :)</h4>
                                                        <a href="/products" class="btn btn-primary cart-btn-transform m-3" data-abc="true">continue shopping</a>
                                                    </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                    </div>
                    `
                 }
            })
        }        
    })
}