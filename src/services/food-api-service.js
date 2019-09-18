import config from '../config';
import TokenService from "./token-service";

const FoodApiService={
  getFoods(query,offset=0) {
    return fetch(`${config.API_ENDPOINT}/food/search/${query}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },
  postFood(id,name) {
    return fetch(`${config.API_ENDPOINT}/food/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body:JSON.stringify({
        item:id,
        name
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  }

}

export default FoodApiService;