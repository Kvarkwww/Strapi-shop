module.exports = {
    // Every hour
    '*/10 * * * *': async () => {
      const { fetchWordPressData, saveDataToStrapi } = require('../../src/api/wordpress/services/wordpress');
      try {
        const { products, categories } = await fetchWordPressData();
        await saveDataToStrapi(products, 'products');
        await saveDataToStrapi(categories, 'categories');
      } catch (err) {
        console.error('Error running cron job for WordPress data sync:', err);
      }
    }
  };
  