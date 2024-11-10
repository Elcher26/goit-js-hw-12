import axios from 'axios';

export async function getImages(page, searchRequest) {
  const params = {
    key: '44327397-ede54b0a70b202831c7c411c5',
    q: searchRequest,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  const res = await axios.get('https://pixabay.com/api/', { params });

  return res.data;
}
