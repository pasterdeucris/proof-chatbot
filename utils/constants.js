
let tool1 = {
    type: "function",
    function: {
      name: "getCurrentMenu",
      description: "Get the current Menu for the restaurant, With ingredients, prices and images. Use this so you don't recommend items we don't have on the menu, Use it to show personalized recommendations",
      parameters: {
        type: "object",
        properties: {
          restaurantName: {
            type: "string",
            description: "Name of the restaurant, e.g., LIRA Beirut Eatery Restaurant",
          },
        },
        required: ["restaurantName"],
      },
    },
  };
  
let tool2 = {
    type: "function",
    function: {
      name: "showInteractiveMenu",
      description: "Shows a interactive menu in the interface for the user to pick the items and order [View catalog]",
      parameters: {
        type: "object",
        properties: {
          messageC: {
            type: "string",
            description: "Message for the user, e.g., Great! You can view our full menu by clicking *View catalog*. Let me know what you'd like to order or if you have any questions!",
          },
        },
        required: ["messageC"],
      },
    },
  };
  
let tool3 = {
    type: "function",
    function: {
      name: "showInteractiveReservation",
      description: "Shows a Reservation App in the interface for the user to pick the date, people and details. Always Use for reservations",
      parameters: {
        type: "object",
        properties: {
          messageR: {
            type: "string",
            description: "Message for the user, e.g., Discover our modern Lebanese flavors with contemporary twists, offering a unique dining experience",
          },
        },
        required: ["messageR"],
      },
    },
  }
  
let tool4 = {
    type: "function",
    function: {
      name: "getUserData",
      description: "Get the user data: Name, Phone. Use his name and phone when you need it!",
      parameters: {
        type: "object",
        properties: {
          messageU: {
            type: "string",
            description: "Message for the user, e.g., Please provide your name and phone number to proceed with the order",
          },
        },
        required: ["messageU"],
      },
    },
  };
  
let tool5 = {
    type: "function",
    function: {
      name: "getPaymentLink",
      description: "Get the pay link for the user to pay the order. if delivery add 5 usd to the total price, unless the total order is 50 USD the delivery Free.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of the client e.g., John Doe",
          },
          amount: {
            type: "number",
            description: "price of the order e.g., 102",
          },
          type: {
            type: "string",
            enum: ["Delivery", "Pickup"],
            description:
              "if the client wanted a delivery or a pickup e.g., Delivery",
          },
        },
        required: ["name", "amount", "type"],
      },
    },
  };
  
 let tool6 = {
    type: "function",
    function: {
      name: "sendOrdertoKitchen",
      description: "Send the order to the kitchen to begin cooking the food",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of the client e.g., John Doe",
          },
          phone: {
            type: "number",
            description: "phone number of client e.g., 3102749826",
          },
          items: {
            type: "string",
            description: "Menu Items e.g., 2 BEETROOT HUMMUS, 1 CHICKEN TAWOUK, 2 COKE",
          },
          payment: {
            type: "string",
            description: "Link of the payment e.g., https://checkout.wompi.co/l/test_6BwKt4",
          },
          type: {
            type: "string",
            enum: ["Delivery", "Pickup"],
            description:
              "if the client wanted a delivery or a pickup e.g., Delivery",
          },
          street: {
            type: "string",
            description:
              "the address for the delivery of the client e.g., 123 Ocean Drive, Miami Beach",
          },
          amount: {
            type: "number",
            description: "Total price of the order e.g., 81",
          },
          status: {
            type: "string",
            enum: ["completed", "Completed"],
            description: "Status of the payment e.g., Completed",
          },
        },
        required: ["name", "phone", "items", "payment", "type", "amount", "street", "status"],
      },
    },
  };
  
let tool7 = {
    type: "function",
    function: {
      name: "convertTimestampToDate",
      description: "Convert milliseconds to a Date",
      parameters: {
        type: "object",
        properties: {
          date: {
            type: "number",
            description: "date in milliseconds, e.g., 1724302800000",
          },
        },
        required: ["date"],
      },
    },
  };

let tool8 = {
    type: "function",
    function: {
      name: "getPaymentstatus",
      description: "get the payment status of the link",
      parameters: {
        type: "object",
        properties: {
          payment: {
            type: "string",
            description: "Link of the payment e.g., https://checkout.wompi.co/l/test_6BwKt4",
          },
        },
        required: ["payment"],
      },
    },
  };


let prompt = `You are Sofia, a professional assistant at LIRA Beirut Eatery, a modern Lebanese restaurant at 2000 NW 2nd Ave, Miami. Your role includes taking orders, recommend items on the menu, answering questions, and making reservations. Our hours are Sunday-Saturday, 12 PM to 10 PM.
------------------------------------------------------------------------------------------------------------------------
Assist customers with orders, reservations, and inquiries.
Confirm details for accuracy and send orders to the kitchen promptly.
Ensure all interactions are friendly and professional.


Use the customer's name frequently and remember previous orders for a personalized experience.
Use phrases like: "Would you like to add the Vegetable Skewer again?" or "Your favorite dessert is Assorted Baklava. Would you like to add it to your order?"

Make proactive recommendations based on the menu. Frequently suggest new or popular items.
Use phrases like: "Our new Lamb Shawarma is a must-try. Would you like to add it to your order?" or "Many customers love our Beetroot Hummus. Would you like to try it today?"

Recommend wine pairings to enhance the meal.
Use phrases like: "Our La Tâche Grand Cru 1995 pairs well with the beef Kebabs. Would you like to add a bottle?" or "We have a selection of Lebanese wines. Would you like to hear more?"

Upsell by suggesting premium items or additional sides.
Use phrases like: "Would you like to try our premium Lebanese wine selection?"
Cross-sell by recommending complementary products.
Example: "How about our special Beetroot Hummus platter?"

Delivery/Pickup:
Get name and address, send the menu link, and take their order.
Calculate the total and send a payment link.
Confirm the order and inform them of the delivery cost ($5 unless over $50, then free) and delivery time (30 minutes).

Reservations:
Send the interactive app link.
------------------------------------------------------------------------------------------------------------------------

Keep responses short and clear.
Confirm all important details.
Ask one question at a time.
Always check the menu before responding and base recommendations on it.

Sound human, empathetic, and caring.
Treat each interaction as an opportunity to make customers feel valued.
Personalize suggestions and observe trends for timely recommendations.
`;

const menuItems = `[
  {
    "product_retailer_id": 0,
    "title": "CHICKEN TAWOUK",
    "description": "House marinated chicken skewer",
    "price": "33.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/7/item-600000007553121317_1676326694.jpg"
  },
  {
    "product_retailer_id": 1,
    "title": "HUMMUS BILAHME",
    "description": "Chick pea dip, tahini, grilled lamb, roasted pine nuts",
    "price": "21.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/1/item-600000009895030111_1676326637.jpg"
  },
  {
    "product_retailer_id": 2,
    "title": "FATTOUSH",
    "description": "Lettuce, mix greens, tomato, cucumbers, radish, red onion, green bell pepper, crispy pita, pomegranate molasses vinaigrette",
    "price": "16.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/4/item-600000007553321104_1676326395.jpg"
  },
  {
    "product_retailer_id": 3,
    "title": "TABBOULEH",
    "description": "Pasley, tomato, bughul, spring onion, mint",
    "price": "14.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/2/item-600000007553321102_1676326421.jpg"
  },
  {
    "product_retailer_id": 4,
    "title": "HUMMUS",
    "description": "Chickpea dip, tahini",
    "price": "15.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/2/item-600000007552927432_1676326257.jpg"
  },
  {
    "product_retailer_id": 5,
    "title": "BEETROOT HUMMUS",
    "description": "Beets and chickpea dip, tahini",
    "price": "15.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/4/item-600000007552927434_1676326282.jpg"
  },
  {
    "product_retailer_id": 6,
    "title": "BATATA HARRA",
    "description": "Fried baby potato, Aleppo pepper, garlic, cilantro",
    "price": "16.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/4/item-600000007553054264_1707376412.jpg"
  },
  {
    "product_retailer_id": 7,
    "title": "BEEF SAMBOUSEK",
    "description": "Minced beef pie, onion",
    "price": "16.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/7/item-600000009828561387_1676326555.jpg"
  },
  {
    "product_retailer_id": 8,
    "title": "CHEESE ROLLS",
    "description": "Feta and mozzarella fried rolls",
    "price": "14.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/4/item-600000007553220004_1676326448.jpg"
  },
  {
    "product_retailer_id": 9,
    "title": "BEEF KEBAB",
    "description": "House marinated, filet mignon skewer",
    "price": "42.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/5/item-600000007553121315_1676326675.jpg"
  },
  {
    "product_retailer_id": 10,
    "title": "CHICKEN TAWOUK",
    "description": "House marinated chicken skewer",
    "price": "33.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/7/item-600000007553121317_1676326694.jpg"
  },
  {
    "product_retailer_id": 11,
    "title": "GRILLED OCTOPUS",
    "description": "Chargrilled octopus with garlic, lemon, dill and herb oil",
    "price": "38.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/6/item-600000007553121326_1680724366.jpg"
  },
  {
    "product_retailer_id": 12,
    "title": "KAFTA",
    "description": "Minced beef and lamb, onion and parsley skewer",
    "price": "36.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/9/item-600000007553121319_1676326716.jpg"
  },
  {
    "product_retailer_id": 13,
    "title": "LAMB CHOPS",
    "description": "House-marinated lamb chops, baby potatoes, pearl onions, rosemary",
    "price": "45.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/2/item-600000007553121322_1676326739.jpg"
  },
  {
    "product_retailer_id": 14,
    "title": "VEGETABLE SKEWER",
    "description": "VEGETABLE SKEWER",
    "price": "28.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/7/item-600000015466759547_1702703833.jpg"
  },
  {
    "product_retailer_id": 15,
    "title": "SHRIMP PROVINCAL",
    "description": "Sautéed large shrimps, parsley, Aleppo pepper, butter, lemon",
    "price": "32.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/3/item-600000010000698553_1676326781.jpg"
  },
  {
    "product_retailer_id": 16,
    "title": "LEBANESE RICE",
    "description": "LEBANESE RICE",
    "price": "7.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/1/item-600000009828786641_1703090254.jpg"
  },
  {
    "product_retailer_id": 17,
    "title": "TOOM",
    "description": "TOOM",
    "price": "5.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/3/item-600000009828786643_1702703928.jpg"
  },
  {
    "product_retailer_id": 18,
    "title": "FRENCH FRIES",
    "description": "FRENCH FRIES",
    "price": "9.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/9/item-600000009828786649_1702703999.jpg"
  },
  {
    "product_retailer_id": 19,
    "title": "KNAFEH BITES",
    "description": "Mild white cheese and shredded wheat surface, which is covered by sugar syrup",
    "price": "15.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/7/item-600000001953081167_1680724538.jpg"
  },
  {
    "product_retailer_id": 20,
    "title": "COKE",
    "description": "Traditional Coke",
    "price": "4.00 USD",
    "image_url": "https://www.beveragedaily.com/var/wrbm_gb_food_pharma/storage/images/_aliases/wrbm_large/publications/food-beverage-nutrition/beveragedaily.com/article/2019/07/12/diet-coke-helps-boost-coca-cola-s-brand-value-brand-finance-rankings/9912727-1-eng-GB/Diet-Coke-helps-boost-Coca-Cola-s-brand-value-Brand-Finance-rankings.jpg"
  },
  {
    "product_retailer_id": 21,
    "title": "COKE ZERO",
    "description": "COKE ZERO",
    "price": "4.00 USD",
    "image_url": "https://www.coca-cola.com/content/dam/onexp/us/en/brands/coca-cola-zero/en_coca-cola_prod_zero%20sugar%20_750x750_v1.jpg/width3840.jpg"
  },
  {
    "product_retailer_id": 22,
    "title": "SPRITE",
    "description": "SPRITE",
    "price": "4.00 USD",
    "image_url": "https://thekmp.com/cdn/shop/products/Sprite_b806bbfe-a332-46ea-bc09-7909c9ae6495_800x.jpg"
  },
  {
    "product_retailer_id": 23,
    "title": "ASSORTED BAKLAVA",
    "description": "Selection of different types of middle eastern baklava",
    "price": "15.00 USD",
    "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/menu/items/2/item-600000001953081162_1719178582.jpg"
  },
  {
    "product_retailer_id": 24,
    "title": "Mark West Pinot Noir. La Tâche Grand Cru 1995",
    "description": "Our 2022 Mark West Pinot Noir is an approachable, medium-bodied red wine grown on California’s Central Coast. Aromas of strawberry and violet lead to bright layers of ripe raspberry, cherry and warm pastry. This wine offers a silky mouthfeel and finishes with a touch of ground clove. Also available in a 1.5L size.",
    "price": "40.00 USD",
    "image_url": "https://www.markwestwines.com/dw/image/v2/BFWT_PRD/on/demandware.static/-/Sites-gallo-master-catalog/default/dwead5fa9c/images/000000000210080523/000000000210080523.png"
  },
  {
    "product_retailer_id": 25,
    "title": "Domaine De La Romanée-Conti.  La Tâche Grand Cru 1995",
    "description": "The Domaine de la Romanée-Conti is renowned globally for its exceptional Burgundy wines, with the La Tâche Grand Cru 1995 being one of its legendary offerings. Sourced from the prestigious La Tâche vineyard in Burgundy, France, this wine benefits from unique soil, microclimate, and expert viticulture, leading to extraordinary quality. In the glass, it reveals a deep ruby color indicative of its maturity. Its complex bouquet includes aromas of red and dark berries, spices, floral notes, underbrush, and a subtle mineral presence. On the palate, it is full and concentrated with rich fruitiness, silky tannins, and a perfect balance of fruit, acidity, and tannins, culminating in a long-lasting finish. This wine exemplifies the pinnacle of winemaking and offers an unforgettable experience for Burgundy enthusiasts, showing remarkable complexity, depth, and elegance.",
    "price": "5800.00 USD",
    "image_url": "https://vintage-grapes.com/cdn/shop/files/La-Tache-1995-Fullview-Vintage-Grapes-GmbH.jpg"
  },
  {
    "product_retailer_id": 26,
    "title": "BEAUJOLAIS-VILLAGES",
    "description": "An easy-drinking wine made with high quality grapes grown in the southern part of Beaujolais. Soils are light, and allow a light, fresh expression of Gamay. The grapes are handpicked in whole bunches and cold soaking is longer than usual for Beaujolais.",
    "price": "35.00 USD",
    "image_url": "https://lovejadot.com/wp-content/uploads/2020/10/ljj_beaujolais_village_btlHR-1-190x563.jpg"
  },
  {
    "product_retailer_id": 27,
    "title": "DOMAINE JEAN FOILLARD",
    "description": "Domaine Jean Foillard is a leader in natural wines and uses only small amounts of S0₂. 'These are wines with presence and weight matiere packed to the rafters with fistfuls of fruit without excessive or obvious effort ' says Neal Martin. This includes keeping whole clusters of grapes in vats for 2 to 3 weeks at a low temperature before fermentation using only natural yeast no pumping no fining and no filtration. Furthermore Jean Foillard ages his wine in barrels brought from the Domaine de la Romanée-Conti; the results are sublime. He is a cult wine hero amongst the many young free-spirited vignerons in France who are now looking back to nature to make fine wine.",
    "price": "150.00 USD",
    "image_url": "https://d13qsmwwvi72rl.cloudfront.net/eyJidWNrZXQiOiJwMmdyb3VwIiwia2V5IjoiaXRlbUltYWdlcy82Mzg0YTE2YWIxYTI4NTAwMTk4NTk2ZDYvMTY2OTYzNjY3NDY0OC0xNjY5NjM2NjczMzExLURvbWFpbmUtSmVhbi1Gb2lsbGFyZC1Nb3Jnb24tQ290ZS1kdS1QeS5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsiaGVpZ2h0Ijo2MDAsImZpdCI6ImNvbnRhaW4ifX19"
  },
  {
    "product_retailer_id": 28,
    "title": "Penfolds Grange Shiraz 2018",
    "description": "The most powerful expression of Penfolds multi-vineyard, multi-district blending philosophy, Grange is arguably Australia’s most celebrated wine and is officially listed as a Heritage Icon of South Australia. Crafted utilising fully-ripe, intensely-flavoured and structured shiraz grapes, the result is a unique Australian style that is now recognised as one of the most consistent of the world’s great wines. With an unbroken line of vintages from the experimental 1951, Grange clearly demonstrates the synergy between shiraz and the soils and climates of South Australia.",
    "price": "950.00 USD",
    "image_url": "https://www.penfolds.com/dw/image/v2/BDBC_PRD/on/demandware.static/-/Sites-tweus-master-catalog/default/dw7c8f1e01/images/hi-res/Penfolds/2022%20Collection/_0011_PEN+2018+AUSCOLL+Grange+Shz+FL750+Cork.png"
  },
  {
    "product_retailer_id": 29,
    "title": "Vega Sicilia Único",
    "description": "The flagship of Vega Sicilia, this wine is a testament to exceptional craftsmanship and time-honored tradition. Forged over time, it combines the robust qualities of Tempranillo and Cabernet Sauvignon, grown in uniquely situated plots with a diverse soil composition. The meticulous process includes controlled fermentation with native yeast in wooden tanks, followed by what is likely the longest aging period for any red wine—nearly 10 years in both wood and bottle. The aging stages use a variety of barrels and vats, fine-tuning the wine to perfection. The result is a wine with unparalleled elegance, complexity, and an inimitable style, offering a silky palate and remarkable aging potential. Único's distinctive character has secured its place among the world's most revered classic wines, revealing new layers of complexity with every sip.",
    "price": "500.00 USD",
    "image_url": "https://www.temposvegasicilia.com/image/vin/234/unico-bouteille-vinfiche.png"
  },
  {
    "product_retailer_id": 30,
    "title": "Chateau Petrus 1997",
    "description": "The 1997 vintage has been lauded by professional reviewers for its exceptional qualities and aging potential. Robert Parker awarded it a score of 91, noting its dense plum/ruby/purple color and a bouquet of mocha, dried tomato skin, and black fruits. He described it as one of the most muscular wines of its vintage, with outstanding concentration, length, intensity, depth, and copious tannins, recommending cellaring until at least 2006 to 2025. Wine Spectator gave it a score of 92, praising its dark color, plum and light raspberry aromas, and full-bodied nature with silky tannins and a fresh, fruity finish. This wine is seen as a \"forgotten Pétrus,\" improving with age and retaining its beauty and freshness.",
    "price": "4200.00 USD",
    "image_url": "https://bestofwines.com/wine-images/7207-2_big.jpg"
  },
  {
    "product_retailer_id": 31,
    "title": "19 Crimes Shiraz",
    "description": "The wine is characterized by a full and round body with a subtle sweetness that provides a rich and round mouth feel. Its vanilla aromatics enhance flavors of raspberries, dark plums, and chocolate, contributing to its complexity and depth. Concurrently, the historical figure James Keley, known for his involvement in the ill-fated \"Catalpa Rescue,\" faced conviction and was sentenced to life imprisonment in Western Australia. However, his fate took a positive turn when he received a pardon from the King in 1905, marking a significant shift in his life journey.",
    "price": "40.00 USD",
    "image_url": "https://19crimes.com/cdn/shop/files/2000X2000_19C_Shiraz_800x.png"
  }
]
`;

module.exports = {
  menuItems,
  prompt,
  tool1,
  tool2,
  tool3,
  tool4,
  tool5,
  tool6,
  tool7,
  tool8,
};