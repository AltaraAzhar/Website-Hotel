document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Deluxe Room", img: "1.jpg", price: 800000, rating: 3 },
      { id: 2, name: "Executive Room", img: "2.jpg", price: 1800000, rating: 4 },
      { id: 3, name: "President Room", img: "3.jpg", price: 3000000, rating: 5 },
    
      // { name: 'Produk 4', img: '1.jpg', price: 55000, rating: 4 },
      // { name: 'Produk 5', img: '2.jpg', price: 70000, rating: 5 },
      // { name: 'Produk 6', img: '3.jpg', price: 80000, rating: 2 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
        //cek apakah ada barang yang sama di cart
        const cartItem = this.items.find((item) => item.id === newItem.id);


        
        // jika belum ada / cart masih kosong
        if(!cartItem) {
            
            this.items.push({...newItem, quantity: 1, total: newItem.price });
            this.quantity++;
            this.total += newItem.price;
        } else{
            //jika sudah ada,cek apakah barang beda atau sama dengan yang ada di cart 
            this.items = this.items.map((item) => {
                // jika barang berbeda
                if(item.id !== newItem.id) {
                    return item;
                } else {
                    //jika barang sudah ada, tambah quantity dan totalnya
                    item.quantity++;
                    item.total = item.price * item.quantity;
                    this.quantity++;
                    this.total += item.price;
                    return item;
                }
            });
        }
    },
    remove(id) {
        //ambil item yang mau diremove bedasarkan id nya
        const cartItem = this.items.find((item) => item.id === id);

        //jika item lebih dari satu
        if(cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
            //jika bukan barang yang diklik
            if (item.id !== id) {
                return item;
            } else {
                item.quantity--;
                item.total = item.price * item.quantity;
                this.quantity--;
                this.total -= item.price;
                return item;
            }
        })
          
        } else if (cartItem.quantity === 1) {
            //jika barangnya sisa 1
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price
        }
    }
  });
});

// form validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function() {
  for(let i = 0; i < form.elements.length; i++) {
    if(form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove('disabled');
      checkoutButton.classList.add('disabled');
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove('disabled');
});


//kirim data ketika tombole checkout diklik 
checkoutButton.addEventListener('click', async function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  console.log(objData);

  try {
    const response = await fetch('php/placeOrder.php', {
      method: 'POST',
      body: data,
    })
    const token = await response.text();
    //console.log(token);
    window.snap.pay(token);
  } catch (err) {
    console.log(err.mesaage);
  }

});


/* format pesan whatsapp
const formatMessage = (obj) => {
  return `Data Customer

  Nama: ${obj.name}
  Email: ${obj.email}
  No HP: ${obj.phone}

  Data Pesanan

  ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity}) x ${rupiah(item.total)}`).join('\n')}

  TOTAL: ${rupiah(obj.total)}

  Terima kasih.`;
};
*/



//konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
