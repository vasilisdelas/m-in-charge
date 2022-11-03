import * as React from 'react';
import '../css/news.css'

import NewsImg from '../media/news.avif'
import {BsNewspaper} from 'react-icons/bs';

function News() {
    const [apiRes, setApiRes] = React.useState();
    React.useEffect(() => {
        fetch(`https://gnews.io/api/v4/search?q=electric%20cars&token=c352ae09e6481cfa29876d8bc800d964&lang=en`, {
            method: "get"
        }).then(res => res.json()).then(data => { setApiRes(data) } )
    }, [])

    
    if (apiRes !== undefined) {
        let data = [];
        const max = apiRes.articles.length > 3 ? 3 : apiRes.articles.length;
        for (let i = 0; i < max; i++ ){
            data.push(
                <div>
                    <BsNewspaper/>
                    <span className="article-title">"{apiRes.articles[i]['title']}" via <span className="source"> {apiRes.articles[i]['source']['name']}</span> </span>
                    <a className="btn-redirect" href={apiRes.articles[i]['url']}><button className="more-btn">More</button></a>
                </div>
            )
        }
    
        return (
            <div className="news-container">
                <div className="news-background">
                    <img src={NewsImg}/>
                </div>
                
                <div className="news-content">
                    {data}
                </div>
            </div>
        
        )
    } 
}
export default News;