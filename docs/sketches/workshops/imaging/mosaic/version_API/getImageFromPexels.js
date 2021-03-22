var myHeaders = new Headers();
myHeaders.append("Authorization", "563492ad6f91700001000001bd64a312d8644ce39cae53cbcb094646");
myHeaders.append("Cookie", "__cf_bm=b460b10ceff23050d446c88f4e2e3381324efa56-1616432363-1800-AQOUyH6Tgm8qEutpYFfeDXay4qQMNCyzZQDvcKVeKTSXyA/JE/facXIPu/w85v6Sb5Rp61demeaXyaf8MjLdlr0=; __cfduid=d71ffeeaaaf2adfcdbdf755b2ae9c1bb31616422134");

var file = "<file contents here>";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: file,
  redirect: 'follow'
};

fetch("https://api.pexels.com/v1/search?color=%2368FF00&per_page=1&query=bird&page=1", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));