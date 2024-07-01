const axios = require('axios');

async function fetchWordPressData() {
    const productsUrl = 'http://shop.kvarkdev.eu.com/wp-json/wp/v2/products'; // Adjust for actual URL and endpoint
    const categoriesUrl = 'http://shop.kvarkdev.eu/wp-json/wp/v2/categories'; // Adjust for actual URL and endpoint
  
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        axios.get(productsUrl),
        axios.get(categoriesUrl)
      ]);
  
      const products = productsResponse.data;
      const categories = categoriesResponse.data;
  
      return { products, categories };
    } catch (error) {
      console.error('Failed to fetch data from WordPress:', error);
      throw error;
    }
  };

  const STRAPI_BASE_URL = 'http://strapishop.kvarkdev.eu'; // Your Strapi base URL

  async function createStrapiEntry(data, type) {
    try {
      const response = await axios.post(`${STRAPI_BASE_URL}/api/${type}`, {
        data
      }, {
        headers: {
          'Authorization': '8f8cca97e7eecd0f4b50e6f3d2e99d1ebf88e41997426c231462415684ec98fc3ccdd420260b344273ecdc5e05a536c344f5e379826dc4aba4ce985d51b6bd37b53b9a04c1c492d519cd5c84b678943bbea9a933ef55eb16c3e33344d0a9f6cde0ac19a646076e52252733f9008a88038fe80dbb5f0b5347ec990153cb8bace4', // Securely store and use your Strapi API token
          'Content-Type': 'application/json'
        }
      });
  
      return response.data;
    } catch (error) {
      console.error(`Failed to create ${type} in Strapi:`, error);
      throw error;
    }
  }
  
  async function importDataToStrapi(products, categories) {
    for (const product of products) {
      await createStrapiEntry(product, 'products');
    }
    for (const category of categories) {
      await createStrapiEntry(category, 'categories');
    }
  };

module.exports = {
  fetchWordPressData,
  saveDataToStrapi
};
