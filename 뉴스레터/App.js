// do something!
import NaviHtml from './components/Nav.js';
import NewsHtml from './components/NewsList.js';

window.addEventListener('DOMContentLoaded', () => {
  NaviHtml();
  NewsHtml();

  const NaviList = document.querySelectorAll('.category-list li'); // querySelectorAll은 배열을 받는다
  for(let i = 0; i < NaviList.length; i++){
    NaviList[i].addEventListener('click', (e) =>{
      e.preventDefault;
      for(let j = 0; j < NaviList.length; j++){
        NaviList[j].classList.remove('active'); // class에 j가 있으면 제거
      }
      NaviList[i].classList.add('active');
      switch(NaviList[i].innerText){
        case '전체보기' :
          NewsHtml('all');
          break;
        case '비즈니스' :
          NewsHtml('business');
          break;
        case '엔터테인먼트' :
          NewsHtml('entertainment');
          break;
        case '건강' :
          NewsHtml('health');
          break;
        case '과학' :
          NewsHtml('science');
          break;
        case '스포츠' :
          NewsHtml('sports');
          break;
        case '기술' :
          NewsHtml('technology');
          break;
        default :
          break;
      }
    });
  };
})



