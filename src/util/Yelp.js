const apiKey = 'ZM7IDzjZSzJ91Tsrk59gbGjhs0AhpJrsrfMDoBLs8UwB4nALm__9h9D9ldf9t3N9xutambUFiA9AckgYLONS71p5MLJZmPzY2tM0V2RV-VE-4ou2z-qBUNA7pmNLW3Yx';

const Yelp = {

  search (term, location, sortBy){
    const url = 'https://api.yelp.com/v3/businesses/search';
    const TERM = '?term='+term;
    const LOCATION = '&location='+location;
    const SORT_BY = '&sort_by='+sortBy;
    const endpoint = url+TERM+LOCATION+SORT_BY;
    // cors_url is for the CORS Anywhere api
    const cors_url = 'https://cors-anywhere.herokuapp.com/';
    const whole_url = cors_url+endpoint;
    // the browsr header for request to Yelp
    const headers = {headers: {Authorization: `Bearer ${apiKey}`}};

    return fetch(whole_url, headers).then(response => {
      return response.json();
    }).then(jsonResponse =>{
      if(jsonResponse.businesses){ // valid response?
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count
        }));
      }
    });
  }
};

export default Yelp;
