
# Project Features

- __Authentication & save user data:__ In this website I am using the firebase based authentication System where a user can signIn or login through both email and password or google based login. After a successful signIn or login store user data in database.

- __Top popular food:__ Here I am sorting data based on orderCount value. orderCount start from 0 and goes forward. The top 6 most ordered items is take place in top popular food.

- __Checkout:__ For each food item there is a card shows Name, category, origin, price etc and a details button. Click the details button it goes to the details where shows details information and has a order button. After click the order button it confirm some data before purchase and then go to purchase section.

- __Private route:__ Before place a order user should login to the system. If user are not signIn then the page redirect to the signIn page. The order page is private protected.

- __Search all food:__ All food has a search feature. We can filter food based on their name. If the searchbox is empty then all the product is show.

- __Pagination:__ All food also has pagination. I am not showing all the data in a page. A single page contain 9 data. 


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
