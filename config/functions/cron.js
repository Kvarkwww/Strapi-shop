module.exports = {
    // Every hour
    '*/30 * * * *': async () => {
      const { fetchWordPressData, saveDataToStrapi } = require('../../api/synchronization/services/wordpress');
      try {
        const { products, categories } = await fetchWordPressData();
        await saveDataToStrapi(products, 'products');
        await saveDataToStrapi(categories, 'categories');
      } catch (err) {
        console.error('Error running cron job for WordPress data sync:', err);
      }
    }
  };
  