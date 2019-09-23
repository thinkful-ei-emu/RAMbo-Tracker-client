import config from '../config';
import TokenService from "./token-service";

const FoodApiService={
  getFoods(query,page=1) {
    return fetch(`${config.API_ENDPOINT}/food/search/${query}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
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
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body:JSON.stringify({
        ndbno:id,
        name
      })
    })/* 
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      ) */
  }

}

export default FoodApiService;