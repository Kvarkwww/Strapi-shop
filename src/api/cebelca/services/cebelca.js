const axios = require('axios');

const cebelcaApi = axios.create({
  baseURL: 'https://app.cebelca.biz/API/',
  headers: {
    'Content-Type': 'application/json',
    'X-App-Key': 'Vc3UGOepMtlecmxzafcsof71atvsvrNKAJd9qdhETs',
  }
});

module.exports = {
  async fetchInventory() {
    try {
      const response = await cebelcaApi.get('item-list');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addItem(itemData) {
    try {
      const response = await cebelcaApi.post('item-insert', itemData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
