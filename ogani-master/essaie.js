function signup() {

    var firstName = document.getElementById("firstName").value;
    var verifFirstName = verifLength(firstName, 5);
    if (verifFirstName) {
        document.getElementById("firstNameError").innerHTML = "";

    }
    else {
        document.getElementById("firstNameError").innerHTML = "First Name must have at least 5 characters";
        document.getElementById("firstNameError").style.color = "red";

    }
    var lastName = document.getElementById("lastName").value;
    var verifLastName = verifLength(lastName, 5);
    if (verifLastName) {
        document.getElementById("lastNameError").innerHTML = "";

    }
    else {
        document.getElementById("lastNameError").innerHTML = "Last Name must have at least 5 characters";
        document.getElementById("lastNameError").style.color = "red";

    }
    var email = document.getElementById("email").value;
    var verifemail = validateEmail(email);
    if (verifemail) {
        document.getElementById("emailError").innerHTML = "";

    }
    else {
        document.getElementById("emailError").innerHTML = "invalid Email";
        document.getElementById("emailError").style.color = "red";

    } var pwd = document.getElementById("pwd").value;
    var verifPwd = verifLength(pwd, 8);
    if (verifPwd) {
        document.getElementById("pwdError").innerHTML = "";

    }
    else {
        document.getElementById("pwdError").innerHTML = "password must have at least 8 number";
        document.getElementById("pwdError").style.color = "red";

    }
    var confirmPwd = document.getElementById("confirmPwd").value;

    if (pwd == confirmPwd) {
        document.getElementById("comfirmPwdError").innerHTML = "";

    }
    else {
        document.getElementById("comfirmPwdError").innerHTML = "invalid pwd";
        document.getElementById("comfirmPwdError").style.color = "red";
    }


    var tel = document.getElementById("tel").value;

    var verifTel = verifLength(tel, 8);
    if (verifTel) {
        document.getElementById("telError").innerHTML = "";

    }
    else {
        document.getElementById("telError").innerHTML = "tele must have at least 8 number";
        document.getElementById("telError").style.color = "red";


    }
    if (verifFirstName && verifLastName && verifemail && verifPwd && (confirmPwd == pwd) && verifTel) {
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        var idUser = JSON.parse(localStorage.getItem("idUser") || "10");
        var user = {
            id: idUser,
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: pwd,
            cofirmPwd: confirmPwd,
            tel: tel,
            role: "user"
        };
       
        

        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("idUser", idUser + 1);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 3000,
        });



    }



}
function addProduct() {
   
    var productName = document.getElementById("productName").value;
    // verification 
    var verifProductName = verifLength(productName, 4);
  
    if (verifProductName) {
        document.getElementById("productNameError").innerHTML = "";

    } else {
        document.getElementById("productNameError").innerHTML = "Product Name must have at least 4 carachters";
        document.getElementById("productNameError").style.color = "red";

    }

    // verif if product exists 

    var verifIFPrExist = searchProduct(productName);
    if (verifIFPrExist) {

        document.getElementById("productNameExistError").innerHTML = "Product already exists";
        document.getElementById("productNameExistError").style.color = "red";


    } else {
        document.getElementById("productNameExistError").innerHTML = "";

    }

    var price = document.getElementById("price").value;


    if (price > 0) {
        document.getElementById("priceError").innerHTML = "";

    } else {
        document.getElementById("priceError").innerHTML = "Invalid Price";
        document.getElementById("priceError").style.color = "red";

    }

    var stock = document.getElementById("stock").value;


    if (stock > 10) {
        document.getElementById("stockError").innerHTML = "";

    } else {
        document.getElementById("stockError").innerHTML = "Invalid Stock";
        document.getElementById("stockError").style.color = "red";

    }

    var category = document.getElementById("category").value;


    if (category.length > 0) {
        document.getElementById("categoryError").innerHTML = "";

    } else {
        document.getElementById("categoryError").innerHTML = "category invide";
        document.getElementById("categoryError").style.color = "red";

    }
    var connectedUser= JSON.parse(localStorage.getItem("connectedUser") || "{}");

    
    

    if (verifProductName && (price > 0) && (stock > 10) && (category.length > 0) && !verifIFPrExist && (connectedUser.role=="admine")) {
        // recuparation des donnes du tableau deja stockeé auparavant
        var products = JSON.parse(localStorage.getItem("products") || "[]");

        // recuperation de l'id du produit
        var idProduct = JSON.parse(localStorage.getItem("idProduct") || "1");
        // regrouper les donnes recuperé de lapart de l' utilisateur dans nommer user
        var product = {
            id: idProduct,
            productName: productName,
            price: price,
            stock: stock,
            category: category,
            idAdmine:connectedUser.id
            

        };

        // ajouter un nouvau utilisateur
        products.push(product);

        localStorage.setItem("products", JSON.stringify(products));
        localStorage.setItem("idProduct", idProduct + 1);


        location.replace("initialPage.html");
    
    }
}
function verifLength(ch, nb) {


    return (ch.length >= nb);

}
function validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}
function searchProduct(name) {
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    var prExist = false;
    for (var i = 0; i < products.length; i++) {
        if (products[i].productName == name) {
            prExist = true;
        }

    }
    return prExist;
}
function searchById(x, T) {
    var objects = JSON.parse(localStorage.getItem(T) || "[]");
    var obj;
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].id == x) {
            obj = objects[i];
        }

    }
    return obj;

}
function deleteObject(pos, T) {
    var objects = JSON.parse(localStorage.getItem(T) || "[]");
    objects.splice(pos, 1);
    localStorage.setItem(T, JSON.stringify(objects));
    location.reload();

}
function login() {

    var emailLogin = document.getElementById("emailLogin").value;

    var pwdLogin = document.getElementById("pwdLogin").value;

    var findedUser;
    var users = JSON.parse(localStorage.getItem("users") || "[]");

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == emailLogin && users[i].pwd == pwdLogin) {
            findedUser = users[i];

           
        }
    }

    switch (findedUser.role) {

        case "superAdmine":

            location.replace('admin.html');
            localStorage.setItem("connectedUser", JSON.stringify(findedUser));

            break;

        case "admine":

            location.replace('admin2.html');
            localStorage.setItem("connectedUser", JSON.stringify(findedUser));

            break;

        case "user":
            location.replace("initialPage.html");
            localStorage.setItem("connectedUser", JSON.stringify(findedUser));

            break;

        default:
            break;


    }




}
function superAdmine() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");

    var superAdmine = {
        id: 1,
        firstName: "zied",
        lastName: "souidi",
        email: "souidi.zied@gmail.com",
        pwd: "superAdmine123",
        tel: "97389513",
        role: "superAdmine"
    };

    users.push(superAdmine);

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("addedSuperAdmine", "true");

    
}

function displayUsers() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var usTable = `<table class="table table-hover">
                      <tr> 
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Tel</th>
                    

                     </tr>
                    
     `;
    for (let i = 0; i < users.length; i++) {
        usTable = usTable + ` 
                  <tr> 
                  <td>${users[i].firstName}</td>
                  <td>${users[i].lastName}</td>
                  <td>${users[i].email}</td>
                  <td>${users[i].tel}</td>
                  <td> 
                  <button type="button" class="btn btn-primary" onclick="displayUser(${users[i].id})">Display</button>
                  <button type="button" class="btn btn-warning" onclick="editUser(${users[i].id})">Edit</button>
                  <button type="button" class="btn btn-success" onclick="deleteObject(${i},'users')">Delet</button>
                  </td>
                  </tr>

        `;

    }

    usTable = usTable + `</table>`;
    document.getElementById('usTable').innerHTML = usTable;
}

function displayProducts() {
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    var connectedUser=JSON.parse(localStorage.getItem("connectedUser") || "{}");

    var prTable = `<table class="table table-hover">
                      <tr> 
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Actions</th>

                     </tr>
                    
     `;
    for (let i = 0; i < products.length; i++) {
        if (((connectedUser.id==products[i].idAdmine) && (connectedUser.role=="admine")) || (connectedUser.role=="superAdmine")) {
            
      
        prTable = prTable + ` 
                  <tr> 
                  <td>${products[i].productName}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].stock}</td>
                  <td>${products[i].category}</td>
                  <td> 
                  <button type="button" class="btn btn-primary" onclick="displayProduct(${products[i].id})">Display</button>
                  <button type="button" class="btn btn-warning" onclick="editProduct(${products[i].id})" >Edit</button>
                  <button type="button" class="btn btn-success" onclick="deleteObject(${i},'products')">Delet</button>
                  </td>
                  </tr>

        `;
      }

    }

    prTable = prTable + `</table>`;
    document.getElementById('prTable').innerHTML = prTable;
}

function displayProduct(id) {
    localStorage.setItem("idPr", JSON.stringify(id));
    location.replace('produitUtilisateurDetail.html');
}
function admin2() {
    
}
function displayUserDetails() {
    // var idUs = localStorage.getItem("idUs");
    // var searchedUs = searchById(Number(idUs), "users");
// ajouter var connectetUser
    var idPr = localStorage.getItem('idPr');
    var searchedPr = searchById(idPr, "products");
    console.log(searchedPr);
  
// ajouter une condition
    var searchedPrAdmine = searchById(searchedPr.idAdmine, "users");

    // document.getElementById("productName").innerHTML = searchedPR.productName;
    document.getElementById("userName").innerHTML = searchedPrAdmine.firstName  + "" + searchedPrAdmine.lastName;

    document.getElementById("email").innerHTML = searchedPrAdmine.email;
    document.getElementById("tel").innerHTML = searchedPrAdmine.tel;


}

function displayProductdetails() {
    var idPr = localStorage.getItem('idPr');
    console.log(idPr);
    var searchedPr = searchById(idPr, "products");
    console.log(searchedPr);
  

    var searchedPrAdmine = searchById(searchedPr.idAdmine, "users");

    // document.getElementById("productName").innerHTML = searchedPR.productName;
    document.getElementById('productName').innerHTML = searchedPr.productName;
    document.getElementById('nomAdmine').innerHTML = searchedPrAdmine.firstName ;
    document.getElementById('emailAdmine').innerHTML = searchedPrAdmine.email ;
    document.getElementById("price").innerHTML = searchedPr.price;
    document.getElementById("stock").innerHTML = searchedPr.stock;
    document.getElementById("category").innerHTML = searchedPr.category;


}

function displayUser(id) {
    localStorage.setItem("idUs", JSON.stringify(id));
    location.replace('produitUtilisateurDetail.html');
}

function displayShopProduct() {

    var products = JSON.parse(localStorage.getItem("products") || "[]");
    var shopProducts = ``;

    for (let i = 0; i < products.length; i++) {

        shopProducts = shopProducts + `
        <div class="col-lg-4 col-md-6">
							<div class="single-product">
                            <img src="img/blog/details/details-pic.jpg" alt="">
								<div class="product-details">
									<h2>${products[i].productName}</h2>
									<div class="price">
										<h4>${products[i].price}</h4>
										
									</div>
									<button class="primary-btn" style="margin-left: 50px;" onclick="goToReservation(${products[i].id})">RESERVE</button>
								</div>
							</div>
						</div>
       `

    }

    document.getElementById("shopProducts").innerHTML = shopProducts

}

function goToReservation(id) {
    localStorage.setItem("idPrToReserve", id);

    location.replace("produit reserver.html");

}

function displayProductToReserve() {

    var idPrToReserve = localStorage.getItem("idPrToReserve");
    var searchedPr = searchById(Number(idPrToReserve), "products");


    document.getElementById("productNameToReserve").innerHTML = searchedPr.productName;
    document.getElementById("priceToReserve").innerHTML = searchedPr.price + "DT";
    document.getElementById("stockToReserve").innerHTML = searchedPr.stock;
    document.getElementById("categoryToReserve").innerHTML = searchedPr.category;


}

function validateReservation() {
    var qty = document.getElementById("qtyToReserve").value;
    var idPrToReserve = localStorage.getItem("idPrToReserve");

    var searchedPr = searchById(idPrToReserve, "products");
    console.log(searchedPr);

    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

    if ((Number(qty) > 0) && (Number(qty) < searchedPr.stock)) {

        document.getElementById("qtyError").innerHTML = "";

        var orders = JSON.parse(localStorage.getItem("orders") || "[]");
        var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");

        var order = {
            id: idOrder,
            qty: qty,
            idPr: searchedPr.id,
            idUser: connectedUser.id
        };

        orders.push(order);

        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("idOrder", idOrder + 1);

        var products = JSON.parse(localStorage.getItem("products") || "[]");

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idPrToReserve) {
                products[i].stock = products[i].stock - qty;
            }
        }

        localStorage.setItem("products", JSON.stringify(products));


        location.replace("pannier.html");

    }
    else {

        document.getElementById("qtyError").innerHTML = "Quantity not available";
        document.getElementById("qtyError").style.color = "red";


    }





}

function displayResevations() {
    var orders = JSON.parse(localStorage.getItem("orders") || "[]"); 
    var connectedUser=JSON.parse(localStorage.getItem("connectedUser") || "{}");



    var reservationTable = `<table class="table table-hover">
    <tr> 
      <th>Product Name</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Category</th>
      <th>USER NAME</th>
      <th>EMAIL USER</th>
      <th>USER TEL</th>
      <th>Actions</th>

   </tr>
  
`;
for (let i = 0; i < orders.length; i++) {
    var searchedPr = searchById(orders[i].idPr, "products");
    var searchedUs = searchById(orders[i].idUser, "users");
if (((connectedUser.id==searchedPr.idAdmine) && (connectedUser.role=="admine")) || (connectedUser.role=="superAdmine")) {

//  var searchedPr = searchById(orders[i].idPr, "products");
//  var searchedUs = searchById(orders[i].idUser, "users");
reservationTable = reservationTable + ` 
<tr> 
<td>${searchedPr.productName}</td>
<td>${searchedPr.price}</td>
<td>${orders[i].qty}</td>
<td>${searchedPr.category}</td>
<td>${searchedUs.firstName +' ' + searchedUs.lastName}</td>
<td>${searchedUs.email}</td>
<td>${searchedUs.tel}</td>




<td> 

<button type="button" class="btn btn-success" onclick="deleteObject(${i},'orders')">Delet</button>
</td>
</tr>

`;
}

}

reservationTable = reservationTable + `</table>`;
document.getElementById('reservationTable').innerHTML = reservationTable;


    
}

function pannier() {

    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");

    var myOrders = [];
    //  j = 0 ;
    for (let i = 0; i < orders.length; i++) {

        if (orders[i].idUser == connectedUser.id) {
            myOrders.push(orders[i]);
            //    myOrder[j] = orders[i];
            //    j = j + 1 ;
        }

    }
    console.log(myOrders);
    var cartTable = ` <table class="table">
   <thead>
       <tr>
           <th scope="col">Product Name</th>
           <th scope="col">Price</th>
           <th scope="col">Quantity</th>
           <th scope="col">Total</th>
           <th scope="col">Actions</th>
       </tr>
   </thead>
   <tbody> `;


    var subtotal = 0;
    for (let j = 0; j < myOrders.length; j++) {
        var pr = searchById(Number(myOrders[j].idPr), "products");

        var total = Number(pr.price) * Number(myOrders[j].qty);

        subtotal = subtotal + total;
        cartTable = cartTable + `
        <tr>
        <td class="shoping__cart__item">
            <img src="img/cart/cart-1.jpg" alt="">
            <h5>${pr.productName}</h5>
        </td>
        <td class="shoping__cart__price">
        <h5>${pr.price} DT</h5>
        </td>
        <td class="shoping__cart__quantity">
        <h5>${myOrders[j].qty} pieces</h5>
            </div>
        </td>
        <td class="shoping__cart__total">
           <h5>${total}</h5>
        </td>
        <td class="shoping__cart__item__close">
            
      
           <button class="btn btn-danger" onclick="deleteOrder(${searchObjectPosition(myOrders[j].id, 'orders')},${myOrders[j].id})">Delete</button>
           <button class="btn btn-warning" onclick="editOrder(${myOrders[j].id})">Edite</button>

       </td>
       </tr>
       `;
    }


    cartTable = cartTable + ` <tr>
       <td>

       </td>
       <td>

       </td>
       <td>
           <h5>Subtotal</h5>
       </td>
       <td>
           <h5>${subtotal}</h5>
       </td>
       </tr>

       </tbody>
       </table> `;
    document.getElementById("cartTable").innerHTML = cartTable;
}

function searchObjectPosition(id, clé) {
    var objects = JSON.parse(localStorage.getItem(clé) || "[]");

    var index;
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].id == id) {
            index = i
        }

    }
    return index;
}

function deleteOrder(pos, id) {
    var order = searchById(id, "orders");
    var qty = order.qty;

    //   la mise a jour du stock dans le tableau products 

    var products = JSON.parse(localStorage.getItem("products") || "[]");

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == order.idPr) {
            products[i].stock = Number(products[i].stock) + Number(qty);
        }

    }

    localStorage.setItem("products", JSON.stringify(products));

    // suppression du ordre dans le tableau

    deleteObject(pos, "orders");
}

function editOrder(id) {

    var order = searchById(id, "orders");
    var editOrder = `
    <div class="col-md-12 form-group">
								<input type="number" class="form-control" id="editQtyOrder" value=${order.qty}>
								<span id="editOrderError"></span>
    </div> 
    <div class="col-md-12 form-group" style="margin-left: 40%">
								<button  class="primary-btn" style="margin-top:50px" onclick="validateEditOrder(${order.id})">Validate</button>
								
	</div>                           
    `;

    document.getElementById("editOrder").innerHTML = editOrder

}

function validateEditOrder(id) {

    var newQty = document.getElementById("editQtyOrder").value;

    var order = searchById(id, "orders");

    var product = searchById(order.idPr, "products");

    var diff = Number(newQty) - Number(order.qty);

    if (product.stock < diff) {

        document.getElementById("editOrderError").innerHTML = "Qty not available";

        document.getElementById("editOrderError").style.color = "red";

    }
    else if (newQty < 0) {
        document.getElementById("editOrderError").innerHTML = "Invalid Qty";

        document.getElementById("editOrderError").style.color = "red";

    }

    else if (newQty == 0) {
        deleteOrder(searchObjectPosition(order.id, 'orders'), order.id);

    }


    else {
        // mise a jour ordre
        var orders = JSON.parse(localStorage.getItem("orders") || "[]");

        for (let i = 0; i < orders.length; i++) {
            if (orders[i].id == order.id) {
                orders[i].qty = Number(orders[i].qty) + Number(diff);

            }

        }

        localStorage.setItem("orders", JSON.stringify(orders));

        //  mise a jour du stock

        var products = JSON.parse(localStorage.getItem("products") || "[]");

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == order.idPr) {
                products[i].stock = Number(products[i].stock) - Number(diff);

            }

        }

        localStorage.setItem("products", JSON.stringify(products));

        location.reload();

    }

}


function sendMessage() {
    var name = document.getElementById("name").value;
    console.log(name);

    var verifName = verifLength(name, 5);
    if (verifName) {
        document.getElementById("nameError").innerHTML = "";

    } else {
        document.getElementById("nameError").innerHTML = "Name must have at least 5 characters";
        document.getElementById("nameError").style.color = "red";

    }
    var email = document.getElementById("email").value;

    var verifEmail = validateEmail(email);
    if (verifEmail) {
        document.getElementById("emailError").innerHTML = "";

    } else {
        document.getElementById("emailError").innerHTML = "Invalid email";
        document.getElementById("emailError").style.color = "red";

    }

    var msg = document.getElementById("msg").value;

    if (msg.length != 0) {
        document.getElementById("msgError").innerHTML = "";

    } else {
        document.getElementById("msgError").innerHTML = "message is required ";
        document.getElementById("msgError").style.color = "red";

    }

   
    if (verifName && verifEmail && (msg.length != 0)) {


        var messages = JSON.parse(localStorage.getItem("messages") || "[]");


        var idMessage = JSON.parse(localStorage.getItem("idMessage") || "1");

        var users = JSON.parse(localStorage.getItem("users") || "[]");
        var idUser = 0;

        for (let i = 0; i < users.length; i++) {
            if (users[i].email == email) {
                idUser = users[i].id;
            }

        }
        var message = {
            id: idMessage,
            idUser: idUser,
            emailEmet: email,
            emailRec: "souidi.zied@gmail.com",
            message: msg,
            name: name

        };


        messages.push(message);

        localStorage.setItem("messages", JSON.stringify(messages));
        localStorage.setItem("idMessage", idMessage + 1);




        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 3000,
        });

    }


}

function displayMessages() {

    var messages = JSON.parse(localStorage.getItem("messages") || "[]");
    console.log("messages", messages);
    var msgTable = `<table class="table table-hover">
                     <tr> 
                       <th>Name</th>
                       <th>Messages</th>
                       <th>Actions</th>
                   

                    </tr>
                   
    `;
    for (let i = 0; i < messages.length; i++) {
        msgTable = msgTable + ` 
                 <tr> 
                 <td>${messages[i].name}</td>
                 <td>${messages[i].message}</td>
               
                 <td> 
                 <button type="button" class="btn btn-primary" onclick="answerMsg(${messages[i].id})">Answer</button>
              
                
                 </td>
                 </tr>

       `;

    };

    msgTable = msgTable + `</table>`;

    document.getElementById('msgTable').innerHTML = msgTable;



}

function answerMsg(id) {

    var searchedMsg = searchById(id, "messages");

    var answerMsg = ` 
  

    <div class="col-md-12 form-group">
    <input type="emal" class="form-control" id="emailRec" name="email" placeholder="Email" value="${searchedMsg.emailEmet}" disabled="true">
    </div>

    <div class="col-md-12 form-group">
    <textarea class="form-control" name="message" id="newMsg" rows="1" placeholder="Enter Message" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'"></textarea>
    <span id="newMsgError"></span>
    </div>

    <button type="button" class="btn btn-warning" onclick = "validateAnswerMgs(${searchedMsg.id})">Send</button>
    
    `;

    document.getElementById("answerMsg").innerHTML = answerMsg;



}

function validateAnswerMgs(id) {

    var searchedMsg = searchById(id, "messages");


    var newMsg = document.getElementById("newMsg").value;

    if (newMsg.length != 0) {
        document.getElementById("newMsgError").innerHTML = "";

    } else {
        document.getElementById("newMsgError").innerHTML = "message is required ";
        document.getElementById("newMsgError").style.color = "red";

    }


    if (newMsg.length != 0) {
        var messages = JSON.parse(localStorage.getItem("messages") || "[]");

        var idMessage = JSON.parse(localStorage.getItem("idMessage") || "1");

        var message = {

            id: idMessage,
            name: "zied",
            subject: searchedMsg.subject,
            idUser: 1,
            emailEmet: "souidi.zied@gmail.com",
            emailRec: searchedMsg.emailEmet,
            message: newMsg
        };
        messages.push(message);

        localStorage.setItem("messages", JSON.stringify(messages));
        localStorage.setItem("idMessage", idMessage + 1);

        location.reload();
    }

}

function setHeader() {

    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

    var header = ``;

    var cartSearch = ``;

    if (connectedUser) {

        //  Super Admine

        if (connectedUser.role == "superAdmine") {

            header = ` 
            <li class="active"><a href="./initialPage.html">Home</a></li>
            <li><a href="./commercePage.html">Shop</a></li>
            <li><a href="./admin.html">Dashboard</a>
            <li><a href="./blog.html">${connectedUser.firstName + '' + connectedUser.lastName}</a></li>
            <li class="nav-item "><a class="nav-link" onclick="logout()">Logout</a></li>  
             
            `;

        }

        //  Admin 

        else if (connectedUser.role == "admine") {

            header = ` 
            <li class="active"><a href="./initialPage.html">Home</a></li>
            <li><a href="./commercePage.html">Shop</a></li>
            <li><a href="./admin2.html">Dashboard</a>
            <li><a href="./blog.html">${connectedUser.firstName + '' + connectedUser.lastName}</a></li>
            <li class="nav-item "><a class="nav-link" onclick="logout()">Logout</a></li>
          
            `;


        }
        //  User  

        else {

            header = ` 
            <li class="active"><a href="./initialPage.html">Home</a></li>
            <li><a href="./commercePage.html">Shop</a></li>
            <li><a href="./contactezmoi.html">Contact</a>
            <li><a href="./blog.html">${connectedUser.firstName + '' + connectedUser.lastName}</a></li>
            <li class="nav-item "><a class="nav-link" onclick="logout()">Logout</a></li>
           
            `;


            cartSearch = `
            <li><a href="#"><i class="fa fa-shopping-bag"></i> <span></span id="nbOrder></a></li>
							<li class="nav-item">
			<button class="search"><span class="lnr lnr-magnifier" id="search"></span></button>
							</li>
            `;


        }

    } else {

        //  visiteur

        header = ` 
        <li class="active"><a href="./initialPage.html">Home</a></li>
        <li><a href="./commercePage.html">Shop</a></li>
        <li><a href="./contactezmoi.html">Contact</a>
        <li><a href="./enregistrer.html">registre</a></li>
        <li class="nav-item "><a class="nav-link" onclick="logout()">Logout</a></li>
        
        `;

        cartSearch = `
        <li>
        <button class="search"><span class="lnr lnr-magnifier" id="categoryToSearch"></span></button>
         </li>
        `;

    }

    document.getElementById("headerId").innerHTML = header;

    document.getElementById("cartSearch").innerHTML = cartSearch;

}

function logout() {

    localStorage.removeItem("connectedUser");

    location.reload();

}

function nbOrders() {

    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

    var orders = JSON.parse(localStorage.getItem("orders") || "[]");

    for (let i = 0; i < orders.length; i++) {

        var nb = 0;

        if (connectedUser.id == orders[i].idUser) {

            nb += 1;
            //  nb= nb + 1;
            //  nb++; 

        }

    }

    document.getElementById("nbOrder").innerHTML = "(" + nb + ")";

}

function searchPr(event) {

    var key = event.keyCode;

    if (key == 13) {
        var category = document.getElementById("categoryToSearch").value;

        localStorage.setItem("categoryToSearch", category);

        location.replace("recherchePage.html");

    }

}
function editProduct(id) {
    var searchedPr = searchById(id, "products");

    var editPr = ` 

     <div class="col-md-12 form-group">
							<input type="text" class="form-control" id="newPrice" name="price" placeholder="Price" value=${searchedPr.price}>
                            </div>

							<span id="newPriceError"></span>
							
							<div class="col-md-12 form-group">
								<input type="number" class="form-control" id="newStock" name="stock" placeholder="Stock" min="0" value=${searchedPr.stock} >
								<span id="newStockError"></span>
							</div>

                            <div class="col-md-12 form-group">
								<button  class="primary-btn" style="border-radius: 30px; width: 200px; height: 50px; margin-left: 87px;" onclick="validateEditProduct(${searchedPr.id})">validate</button>
								
							</div>
     `;

    document.getElementById("editPr").innerHTML = editPr;

}

function editUser(id) {
    var searchedUs = searchById(id, "users");
    var editUs = ``;
     editUs = ` 
    <div class="col-md-12 form-group">
    <input type="password" class="form-control" id="newPwd" name="pwd" placeholder="Password" value="${searchedUs.pwd}">
    <span id="newPwdError"></span>
    </div>

    <div class="col-md-12 form-group">
    <input type="tel" class="form-control" id="newTel" name="tel" placeholder="Tel" value="${searchedUs.tel}">
    <span id="newTelError"></span>
    
    </div>



    <div class="col-md-12 form-group">
    <input type="email" class="form-control" id="newEmail" name="email" placeholder="email" value="${searchedUs.email}">
    <span id="newEmailError"></span>
    </div>

    <button type="button" class="btn btn-warning" onclick="validateEditUser(${searchedUs.id})">Validate</button>


    
    `;

    document.getElementById("editUs").innerHTML = editUs;

}

function validateEditProduct(id) {
    var newPrice = document.getElementById("newPrice").value;
    var verifPrice = newPrice > 0;


    if (verifPrice > 0) {
        document.getElementById("newPriceError").innerHTML = "";

    } else {
        document.getElementById("newPriceError").innerHTML = "Invalid Price";
        document.getElementById("newPriceError").style.color = "red";

    }

    var newStock = document.getElementById("newStock").value;
    var verifStock = newStock > 10;


    if (verifStock) {
        document.getElementById("newStockError").innerHTML = "";

    } else {
        document.getElementById("newStockError").innerHTML = "Invalid Stock";
        document.getElementById("newStockError").style.color = "red";

    }
    if (verifPrice && verifStock) {
        var products = JSON.parse(localStorage.getItem("products") || "[]");

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i].price = newPrice;
                products[i].stock = newStock;

            }


        }

        localStorage.setItem("products", JSON.stringify(products));

        location.reload();
    }

}

function validateEditUser(id) {
    var newPwd = document.getElementById("newPwd").value;
    var verifPwd = verifLength(newPwd, 8);


    if (verifPwd) {
        document.getElementById("newPwdError").innerHTML = "";

    } else {
        document.getElementById("newPwdError").innerHTML = "Invalid Pwd";
        document.getElementById("newPwdError").style.color = "red";

    }

    var newTel = document.getElementById("newTel").value;
    var verifTel = newTel.length == 8;
    if (verifTel) {
        document.getElementById("newTelError").innerHTML = "";
    } else {

        document.getElementById("newTelError").innerHTML = "Telephone number must contain 8 characters";
        document.getElementById("newTelError").style.color = "red";



    }


    var newEmail = document.getElementById("newEmail").value;
    var verifPwd = verifLength(newEmail, 8);

    var verifEmail = validateEmail(newEmail);
    if (verifEmail) {
        document.getElementById("newEmailError").innerHTML = "";

    } else {
        document.getElementById("newEmailError").innerHTML = "Invalid Pwd";
        document.getElementById("newEmailError").style.color = "red";

    }




    if (verifPwd && verifTel && verifEmail) {
        var users = JSON.parse(localStorage.getItem("users") || "[]");

        for (let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].pwd = newPwd;
                users[i].cofirmPwd = newPwd;
                users[i].tel = newTel;
                users[i].email = newEmail;


            }


        }

        localStorage.setItem("users", JSON.stringify(users));

        location.reload();
    }

}

function addAdmine() {

    var firstNameAdmine = document.getElementById("firstNameAdmine").value;
    var lastNameAdmine = document.getElementById("lastNameAdmine").value;
    var emailAdmine = document.getElementById("emailAdmine").value;
    var pwdAdmine = document.getElementById("pwdAdmine").value;
    var telAdmine = document.getElementById("telAdmine").value;

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    var idAdmine = JSON.parse(localStorage.getItem("idAdmine") || "3");
    var admine = {
        id: idAdmine,
        firstName: firstNameAdmine,
        lastName: lastNameAdmine,
        email: emailAdmine,
        pwd: pwdAdmine,
        tel: telAdmine,
        role: "admine"
    };

    users.push(admine);

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("idAdmine", idAdmine + 1);

    location.reload();


}

function displaySearchedProducts() {

    var category = localStorage.getItem("categoryToSearch");

    var products = JSON.parse(localStorage.getItem("products") || "[]");

    var searchedProducts = [];

    for (let i = 0; i < products.length; i++) {
        if (products[i].category == category) {
            searchedProducts.push(products[i]);

        }

    }

    var result = ``;

    for (let i = 0; i < searchedProducts.length; i++) {

        result = result + `
        <div class="col-lg-4 col-md-6">
							<div class="single-product">
                            <img src="img/blog/details/details-pic.jpg" alt="">
								<div class="product-details">
									<h6>${searchedProducts[i].productName}</h6>
									<div class="price">
										<h6>${searchedProducts[i].price}</h6>
										
									</div>
									<button class="primary-btn" style="margin-left: 50px;" onclick="goToReservation(${searchedProducts[i].id})">RESERVE</button>
								</div>
							</div>
						</div>

       ` ;

    }

    document.getElementById("result").innerHTML = result;




}
