// do something!
export default function NewsHtml(cate){

  const get = (target) => {
    return document.querySelector('target');
  };

  if(cate != '' || cate != undefined){ // 클릭을 하기 전에는 cate에 빈값이 들어간다
    if(document.querySelectorAll('.news-list-container').length > 0){
      document.querySelector('.news-list-container').remove();
      let page = 1;
    }
  }

  const $postContainer = document.createElement('div');
  $postContainer.classList.add('news-list-container');
  const $postContent = document.createElement('article');
  $postContent.classList.add('news-list');
  $postContainer.appendChild($postContent);
  document.querySelector('#root').appendChild($postContainer);

  let page = 1;
  let pageSize = 5;
  let totalLimit = 5
  //const apiKey = '84a3afa0a6054c9a8b22977a62763653';
  const apiKey = '8449c79926564444acca04ac7156023b';
  
  const API_URL = `https://newsapi.org/v2/top-headlines?country=us${cate === "all" || cate === undefined ? "&category=" : "&category="+cate}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
  const $posts = document.querySelector('.news-list-container .news-list');

  const getPost = async() =>{
    const response = await fetch(API_URL);
    if(!response.ok){
      throw new Error('에러가 발생했습니다.');
    }
    return await response.json();
  };

  const showPosts = (posts) => {
    console.log(posts);
    posts.articles.forEach((post) => {
      const $post = document.createElement('section');
      $post.classList.add('news-item');
      $post.innerHTML = `
            <div class="thumbnail">
              <a href="${post.url}" target="_blank" rel="noopener noreferrer">
                <img
                  src="${post.urlToImage}"
                  alt="thumbnail" />
              </a>
            </div>
            <div class="contents">
              <h2>
                <a href="${post.url}" target="_blank" rel="noopener noreferrer">
                ${post.title}
                </a>
              </h2>
              <p>
              ${post.content}
              </p>
            </div>    
      `;
      $posts.appendChild($post);
    });
  };
  
  const hdScroll = async() =>{
      const response = await getPost();
      const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
      if (response.totalResults <= totalLimit) {
        window.removeEventListener('scroll', hdScroll);
        return
      }
      if(scrollTop + clientHeight >= scrollHeight - 5){
        totalLimit += 5;
        page++;
        loadPost();
      }
  }
  
  const loadPost = async() => {
    try{
      //로딩 엘레멘트 보여줌
      const loadingTemp = document.createElement('div');
      loadingTemp.classList.add('scroll-observer');
      const target = document.querySelector('.news-list-container');
      const loadingImg = document.createElement('img');
      loadingImg.setAttribute('src','img/ball-triangle.svg'); // src="img/ball-triangle.svg"
      loadingTemp.appendChild(loadingImg);
      target.append(loadingTemp);

      const response = await getPost();
      showPosts(response);
    } catch(error) {
      console.log(error);
    } finally {
      //로딩 엘레먼트를 지움
      if(document.querySelector('.scroll-observer') != null){
        document.querySelector('.scroll-observer').remove();
      }
    }
  };



  loadPost();
  window.addEventListener('scroll', hdScroll);
};