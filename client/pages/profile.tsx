import { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import useProfile from '../hooks/useProfile'
import { Doughnut, Line } from 'react-chartjs-2'
import YouTube from "react-yt";
import Navbar from '../components/Navbar'

interface props{

}

const Profile:React.FC<props> = () =>{

    const router = useRouter();
    const { data, isError, isLoading} = useProfile(
        typeof router.query.userId==='object' ? router.query.userId[0] : router.query.userId || '',
    );

    return(
        <Container>
            <Head>
                <title>Zupa - user profile</title>
            </Head>
            <Navbar/>
            <Content>
               
                <div className="imageBox">

                </div>
   
                <h1>{data?.name}</h1>
                <div className="description">{data?.description}</div>
               
               <YTWrapper>
                    {data?.music&&<YouTube
                        videoId={data?.music}
                        autoplay={1}
                        controls={0}
                        showinfo={0}
                    />}{data?.music}
                </YTWrapper>

            <div className="charts">
               <div className="chart">
                    <Doughnut data={chart0Data(data)} height={300} width={300} />
               </div>
               <div className="chart">
                   <Line data={chart1Data(data)} options={chart1Options} height={300} width={300} />
               </div>
            </div>

            </Content>
        </Container>
    )
}

const YTWrapper = styled.div`
    display: none;
`

const Container = styled.div`
    background-color: #090a0c; 
    min-height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    

    &  button{
        width: 100%;
        color: white;
        background-color: rgba(255, 0, 0, 0);
        font-size: 20px;
        font-weight: 800;
        padding: 5px;
        border: 2px solid white;
        grid-column: 1 / 4;
        cursor: pointer;
    }

`

const Content = styled.div`
    background-color: #0f1316; 
    flex: 1;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 5vh;

    .imageBox{
        background-color: #4e4e4e;
        height: 300px;
        width: 300px;
        
    }

    h1{
        margin: 10px 0;
        font-size: 40px;
    }

    .description{
        margin: 0;
    }

    .charts{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .chart{
        height: 300px;
        width: 300px;
        margin: 100px;
    }

`

export default Profile;

function chart0Data(data){
    if(!data) return data;
    const gameTypes:{t: string, count: number}[] = [];
    data.history.forEach(game => {
        const index = gameTypes.findIndex(e=> e.t === game.t);
        if(index >= 0){
            gameTypes[index].count++;
        }
        else{
            gameTypes.push({t: game.t, count: 1});
        }
    });

    return{
        labels: gameTypes.map(e=> e.t),
        datasets:[{
            label: 'g',
            data: gameTypes.map(e=> e.count),
                  backgroundColor: [
                'rgba(255, 99, 133, 0.445)',
                'rgba(54, 162, 235, 0.445)',
                'rgba(255, 206, 86, 0.445)',
                'rgba(75, 192, 192, 0.445)',
                'rgba(153, 102, 255, 0.445)',
                'rgba(255, 159, 64, 0.445)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        }],
    }
}

function chart1Data(data){
    if(!data) return data;
    const gameTypes:{date: string, score: number, total: number, d: Date}[] = [];

    data.history.forEach(game => {
        const getDate = (ds: string) => `${new Date(ds).getDate()+1}.${(new Date(ds).getMonth()+1)}`
        
        let index = gameTypes.findIndex(e=>{
            return e.date === getDate(game.date);
        });
        if(index===-1){
            gameTypes.push({date: getDate(game.date), score: 0, total: 0, d: new Date(game.date)});
            index = gameTypes.length-1;
        }
        gameTypes[index].total++;
        if( data.name  === game.winner ) gameTypes[index].score++;
        else gameTypes[index].score--;
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return{
        labels: gameTypes.sort((a, b)=>a.d.getTime()-b.d.getTime()).map(e=> `${e.d.getDate()+1} ${months[e.d.getMonth()]}`),
        datasets:[{
            label: 'win/lose % ratio',
            data: gameTypes.map(e=> Math.round(100*e.score/e.total)),
            fill: true,    
            backgroundColor: 'rgba(64, 99, 255, 0.445)',
            borderColor: '#1425bd',
            borderWidth: 1,
        }],
    }
}

const chart1Options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes:[{

    }]
  },
}