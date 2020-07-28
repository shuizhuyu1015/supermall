import {request} from './request';

export class HomeRequest {
  static getHomeMultidata() {
    return request({
      url: '/home/multidata'
    })
  }

  static getHomeGoods(type, page) {
    return request({
      url: '/home/data',
      params: {
        type,
        page
      }
    })
  }
}
