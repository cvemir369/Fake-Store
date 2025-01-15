https://fakestoreapi.com/

Requirements:
Navigation Bar:
Available in all routes (create a layout component for your route 😉)
Include links to Home and Cart.
Home Page:
Show a list of all categories from https://fakestoreapi.com/products/categories. You are free to choose how they are displayed.
Show a list of all products from https://fakestoreapi.com/products as cards.
Each card should display:
title
price
link to the product category
add to cart button
If a product is already in the cart, render buttons to remove and add more to the cart (manage quantity, e.g., never go below zero, remove the item instead).
It should also show the current amount in the cart.
Cart Page:
Render a table with the products, the sum of each line, and a total amount.
It should also be possible to add or remove items.
Bonus:
Implement DaisyUI:
It will make creating tables, navbars, etc. way easier! 😉
Daisy UI has a skeleton utility if you were curious
Store cart in localStorage :
Every time you add or remove an item, save it to localStorage
Don’t forget to pull your cart items from there as the initial state for your cart!
Tips:
Reuse Utilities: The logic to add or remove to and from the cart is the same regardless of whether it’s happening in the Home page, the Cart page or anywhere else. Think of how you can abstract this logic in an utility file in src/utils . Utilities are convenience functions shared by some part of your code 😀
