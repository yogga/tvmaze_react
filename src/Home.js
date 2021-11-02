import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios'
import {connect} from 'react-redux'
import { Card, Icon, Image, Grid } from 'semantic-ui-react'

 class Home extends Component {

    constructor(){
        super();
        this.state ={
            dataCarousel:[],
            loading:true,
            dataSchedule:[]
        }
    }

    // ambil data top film untuk carousel
    getDataCarousel = async ()=>{
        try{
            await axios.get(`https://api.tvmaze.com/shows`, {crossDomain: true})
            .then ((res) => {

                let sorted = res.data.sort(function (a,b){  // melakukan sorting berdasarkang rating 
                    return a.rating.average < b.rating.average ? 1 :
                    b.rating.average < a.rating.average ? -1 : 0
                })

                let dataRes = sorted.slice(0,50) // diambil hanya 20 data saja dari total 240
                this.setState({
                  dataCarousel:dataRes
                  
                })   
            })
        }
        catch(error){
            alert(JSON.stringify(error.message))
        }
    }

    // ambil data schedule film
    getDataSchedule = async ()=>{
        try{
            await axios.get(`https://api.tvmaze.com/schedule`, {crossDomain: true})
            .then ((res) => {

              console.log(res.data)

                let dataRes = res.data
                this.setState({
                  dataSchedule:dataRes,
                  loading:false
                })   
            })
        }
        catch(error){
            alert(JSON.stringify(error.message))
        }
    }


    componentDidMount = async () => {
       await this.getDataCarousel()
       await this.getDataSchedule()
    }

  render(){
      return(
          <>
          {this.state.loading ? (<h1>Loading .......</h1>) :(
              <div>
              <Carousel autoPlay centerMode centerSlidePercentage={40} showStatus="false" >
                  {this.state.dataCarousel.map((data, key) =>{
                      return(
                        <div>
                        <img style={{height:"auto" , width:"80%"}} alt={data.name} src={data.image.medium}/>
                        {/* <p className="legend">{data.name}</p> */}
                        <p className="legend">{data.rating.average}</p>
                    </div>
                      )
                  }
                  )}
          </Carousel>

                <Grid columns={3} divided>
                {this.state.dataSchedule.map((data, key) =>{
                     var gambar = {...data.show.image}

                     if(data.show.image === null){
                         gambar = ' https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg'
                     }else{
                         gambar = gambar.medium
                     }
                     
                     return(
                
                <Grid.Column key={key}>
                <Card>
                    <Image src={gambar} wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>{data.show.name}</Card.Header>
                    <Card.Meta>
                       Episode : {data.name}
                       Status : {data.show.status}
                    </Card.Meta>
                    <Card.Description>
                        Schedule Air Time : {data.show.schedule.time}
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        22 Friends
                    </a>
                    </Card.Content>
                </Card>
                </Grid.Column>
                )
                })}
            </Grid>

       

          </div>
          )}
          </>
      )
  }

}    


const mapDispatchtoProps = (dispatch)=>{
    return {
      
        type : "ACTIVE_ITEM", ActiveItem: "home"
       
      }
    }
  

export default connect (null, mapDispatchtoProps)(Home);

