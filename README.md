# Description
Food palace is a restaurant management website Where a user can order his /her food. All the food shows in All food section using card. User can find his/her food by serching by category or manually by changing page. There is a details food page for more information about that food. After that, in order page a user has to put information and place an order. I have also implemented a user dashboard page here user can add foods, view his/her added foods in the website and his/her ordered food.

# Project Features

- __Authentication & save user data:__ In this website I am using the firebase based authentication System where a user can signIn or login through both email and password or google based login. After a successful signIn or login store user data in database.

- __Top popular food:__ Here I am sorting data based on orderCount value. orderCount start from 0 and goes forward. The top 6 most ordered items is take place in top popular food.

- __Checkout:__ For each food item there is a card shows Name, category, origin, price etc and a details button. Click the details button it goes to the details where shows details information and has a order button. After click the order button it confirm some data before purchase and then go to purchase section.

- __Private route:__ Before place a order user should login to the system. If user are not signIn then the page redirect to the signIn page. The order page is private protected.

- __Search all food:__ All food has a search feature. We can filter food based on their name. If the searchbox is empty then all the product is show.

- __Pagination:__ All food also has pagination. I am not showing all the data in a page. A single page contain 9 data.


  # Technology
  - React
  - Tailwind CSS
  - daisyUI
  - Mongodb
  - Express js
  - Node js
  - React router


# Site links
Live site link: https://food-palace-client.web.app/
