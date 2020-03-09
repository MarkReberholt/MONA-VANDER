/* [A] PRODUCTS DATA */
var products = {
  1 : {
    name : "Strikke skål",
    desc : "Keramisk unik strikke skål i hvid. Perfekt til de kreative dage.",
    img : "img/ansigtskrus/strikkeskol2.jpg",
    price : 600
  },
  2 : {
    name : "Brun kop",
    desc : "Keramisk kop i brun. Perfekt til at peppe te-selskabet op.",
    img : "img/ansigtskrus/krusbrun2.jpg",
    price : 400
  },
  3 : {
    name : "Hvidt krus",
    desc : "Keramisk krus i rustik hvid. Giver et unikt præg til hverdagen.",
    img : "img/ansigtskrus/handshvidcloseup2.jpg",
    price : 450
  },
  4 : {
    name : "Hvid kop",
    desc : "Keramisk kop i hvid. Ansigt placeret på indersiden.",
    img : "img/ansigtskrus/storhvid2.jpg",
    price : 400
  }
};

/* [B] PRODUCTS HTML GRID GENERATOR */
window.addEventListener("load", function(){
  var container = document.getElementById("cart-products"),
      item = null, part = null;
  for (let i in products) {
    item = document.createElement("div");
    item.classList.add("p-item");

    // Product Image
    part = document.createElement("img");
    part.src = products[i]['img'];
    part.classList.add("p-img");
    item.appendChild(part);

    // Product Name
    part = document.createElement("div");
    part.innerHTML = products[i]['name'];
    part.classList.add("p-name");
    item.appendChild(part);

    // Product Price
    part = document.createElement("div");
    part.innerHTML = "kr." + products[i]['price'];
    part.classList.add("p-price");
    item.appendChild(part);

    // Product Description
    part = document.createElement("div");
    part.innerHTML = products[i]['desc'];
    part.classList.add("p-desc");
    item.appendChild(part);

    // Add to cart
    part = document.createElement("input");
    part.type = "button";
    part.value = "Tilføj til kurv";
    part.classList.add("p-add");
    part.onclick = cart.add;
    part.dataset.id = i;
    item.appendChild(part);

    container.appendChild(item);
  }
});

/* [C] SHOPPING CART */
var cart = {
  data : null, // current shopping cart

  /* [C1] LOCALSTORAGE */
  load : function(){
  // load() : load previous shopping cart

    cart.data = localStorage.getItem("cart");
    if (cart.data == null) { cart.data = {}; }
    else { cart.data = JSON.parse(cart.data); }
  },

  save : function(){
  // save() : save current cart

    localStorage.setItem("cart", JSON.stringify(cart.data));
  },

  /* [C2] CART ACTIONS */
  add : function(){
  // add() : add selected item to cart

    // Update current cart
    if (cart.data[this.dataset.id] == undefined) {
      var product = products[this.dataset.id];
      cart.data[this.dataset.id] = {
        name : product['name'],
        desc : product['desc'],
        img : product['img'],
        price : product['price'],
        qty : 1
      };
    } else {
      cart.data[this.dataset.id]['qty']++;
    }

    // Save local storage + HTML update
    cart.save();
    cart.list();
  },

  list : function(){
  // list() : update HTML

    var container = document.getElementById("cart-list"),
        item = null, part = null, product = null;
    container.innerHTML = "";

    // Empty cart
    // Credits : https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty
    var isempty = function(obj){
      for (var key in obj) {
        if(obj.hasOwnProperty(key)) { return false; }
      }
      return true;
    };
    if (isempty(cart.data)) {
      item = document.createElement("div");
      item.innerHTML = "Din kurv er tom";
      container.appendChild(item);
    }

    // Not empty
    else {
      // List items
      var total = 0, subtotal = 0;
      for (var i in cart.data) {
        item = document.createElement("div");
        item.classList.add("c-item");
        product = cart.data[i];

        // Quantity
        part = document.createElement("input");
        part.type = "number";
        part.value = product['qty'];
        part.dataset.id = i;
        part.classList.add("c-qty");
        part.addEventListener("change", cart.change);
        item.appendChild(part);

        // Name
        part = document.createElement("span");
        part.innerHTML = product['name'];
        part.classList.add("c-name");
        item.appendChild(part);

        // Subtotal
        subtotal = product['qty'] * product['price'];
        total += subtotal;

        container.appendChild(item);
      }

      // EMPTY BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Tøm kurv";
      item.addEventListener("click", cart.reset);
      item.classList.add("c-empty");
      container.appendChild(item);

      // CHECKOUT BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Kurv - " + "kr." + total;
      item.addEventListener("click", cart.checkout);
      item.classList.add("c-checkout");
      container.appendChild(item);
    }
  },

  change : function(){
  // change() : change quantity

    if (this.value == 0) {
      delete cart.data[this.dataset.id];
    } else {
      cart.data[this.dataset.id]['qty'] = this.value;
    }
    cart.save();
    cart.list();
  },

  reset : function(){
  // reset() : empty cart

    if (confirm("Vil du tømme din kurv?")) {
      cart.data = {};
      cart.save();
      cart.list();
    }
  },

  checkout : function(){
  // checkout() : checkout the cart

    alert("Er du færdig med at handle og klar til at betale? Klik OK.");
    // Forward to confirmation page or directly add name, tel, email fields in the cart list.
    // Send cart.data to the server and do further processing - email or save to database.
  }
};

// Load previous cart and update HTML on load
window.addEventListener("load", function(){
  cart.load();
  cart.list();
});
