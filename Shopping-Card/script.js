// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Get all product cards
    const products = document.querySelectorAll('.card-body');
  
    // Initialize total price
    let totalPrice = 0;
    const totalElement = document.querySelector('.total');
  
    // Update total price on the page
    const updateTotalPrice = () => {
      totalElement.textContent = `${totalPrice} $`;
    };
  
    // Loop over all products and add event listeners
    products.forEach((product) => {
      const plusButton = product.querySelector('.fa-plus-circle');
      const minusButton = product.querySelector('.fa-minus-circle');
      const deleteButton = product.querySelector('.fa-trash-alt');
      const likeButton = product.querySelector('.fa-heart');
      const quantityElement = product.querySelector('.quantity');
      const unitPriceElement = product.querySelector('.unit-price');
      
      // Get unit price of the product
      let unitPrice = parseInt(unitPriceElement.textContent.replace('$', '').trim());
  
      // Set initial quantity to 0
      let quantity = 0;
  
      // Function to update the quantity and total price
      const updateQuantity = () => {
        quantityElement.textContent = quantity;
        totalPrice = Array.from(products).reduce((acc, prod) => {
          const prodQuantity = parseInt(prod.querySelector('.quantity').textContent);
          const prodUnitPrice = parseInt(prod.querySelector('.unit-price').textContent.replace('$', '').trim());
          return acc + (prodQuantity * prodUnitPrice);
        }, 0);
        updateTotalPrice();
      };
  
      // Event listener for plus button
      plusButton.addEventListener('click', () => {
        quantity++;
        updateQuantity();
      });
  
      // Event listener for minus button
      minusButton.addEventListener('click', () => {
        if (quantity > 0) {
          quantity--;
          updateQuantity();
        }
      });
  
      // Event listener for delete button
      deleteButton.addEventListener('click', () => {
        product.remove();
        updateQuantity();
      });
  
      // Event listener for like button (toggle heart color)
      likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('liked');
        if (likeButton.classList.contains('liked')) {
          likeButton.style.color = 'red';
        } else {
          likeButton.style.color = 'black';
        }
      });
    });
  
    // Initialize total price on page load
    updateTotalPrice();
  });
  