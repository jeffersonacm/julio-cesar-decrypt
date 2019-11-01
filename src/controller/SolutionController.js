const fs =  require('fs')
const axios = require('axios');
const FormData = require('form-data')
const varibles = require('../../bin/variables')
const _solutionService = require('../service/SolutionService');
const solutionService = new _solutionService();
const url = varibles.Codenation.api;

module.exports = {
  async receive(req, res) {
      const response = await axios.get(url+varibles.Codenation.token);

      await solutionService.writeFile(response.data);
      await solutionService.decripty();
      return res.json(response.data);
  },

  async send() {
      const form_data = new FormData();
      form_data.append("answer", fs.createReadStream('../../bin/answer.json'));

      const request_config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: form_data
      };

      return axios.post(url, form_data, request_config);
  }
}