import axios from '../utils/ajax/index.js'
import Global from '../utils/global.js'


let service = {};
service.article = () => {
  return axios.ajax(Global.getMockUrl() + '../assets/mock/articleList.json', 'get', null)
};
export default service
