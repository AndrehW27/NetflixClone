import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';


export default () => {

  const [movieList,SetMovieList] = useState([]);
  const [featuredData,setFeaturedData] = useState(null);
  const [blackHeader,setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      
      //LISTA TOTAL
      let list = await Tmdb.getHomeList();
      SetMovieList(list);

      //PEGANDO O DESTAQUE
      let originals = list.filter(i=>i.slug='originals');
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length - 1))
      let chosen  = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');
      setFeaturedData(chosenInfo);
   
    }
    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }
      else{
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    return() =>{
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);
  
  return (
    <div className="page">
      
    <Header black={blackHeader}/>

    {featuredData &&
      <FeaturedMovie item ={featuredData} />
    } 
    
      <section className="lists">
        {movieList.map((item,key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

          <footer>
            Site criado por <a href="https://github.com/AndrehW27" target="_blank">André Willian</a> a partir da vídeo aula do <a href="https://www.youtube.com/watch?v=tBweoUiMsDg&t=8864s" target="_blank">Bonieky Lacerda</a> no Youtube<br/>
            Direitos de imagem da <a href="https://www.netflix.com" target="_blank">Netflix</a><br/>
            Dado obitos de <a href="https://www.themoviedb.org/s" target="_blank">Themoviedb.org</a>
          </footer>

          {movieList.length <=0 &&
            <div className="loading">
              <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt="Carregando..."/>
            </div>
          }
    </div> 
  );

}
