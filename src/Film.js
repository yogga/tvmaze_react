import React, { Component } from 'react'
import { Grid, Image, Header, Card, Icon, Input } from 'semantic-ui-react'
import {connect} from 'react-redux'
import axios from 'axios'



 class Film extends Component {


    constructor(){
        super();
        this.state ={
            dataFilm:[],
            loading:true,
            
            
        }
    }
    
    // get data film marvel dari tvmaze
    getDataFilm = async ()=>{
        try{
            await axios.get(`https://api.tvmaze.com/search/shows?q=marvel`, {crossDomain: true})
            .then ((res) => {

              console.log(res.data)

                let dataRes = res.data
                this.setState({
                  dataFilm:dataRes,
                  loading:false
                })   
            })
        }
        catch(error){
            alert(JSON.stringify(error.message))
        }
    }

    // get data search film 
    getDataSearch = async (e)=>{
        if (e.target.value === ""){
            this.getDataFilm()
        }else{
            try{
                await axios.get(`https://api.tvmaze.com/search/shows?q=${e.target.value}`, {crossDomain: true})
                .then ((res) => {

                    console.log(res.data)

                    let dataRes = res.data
                    this.setState({
                    dataFilm:dataRes,
                  
                    })   
                })
            }
            catch(error){
                alert(JSON.stringify(error.message))
            }
        }
    }

    componentDidMount = async () => { // component didmount adalah component yg dijalankan sebelum kita merender halaman kita 
        await this.getDataFilm()
      }

    render(){
    return(
        <>
        <div>
        <Header style={{marginTop:20}} size='large'>Databases Films</Header>
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <Image src='https://cdn.pixabay.com/photo/2015/03/26/09/43/lenses-690179__480.jpg' />
                            <Image style={{marginTop:20}} src='https://cdn.pixabay.com/photo/2015/03/26/09/43/lenses-690179__480.jpg' />
                            <Image style={{marginTop:20}} src='https://cdn.pixabay.com/photo/2015/03/26/09/43/lenses-690179__480.jpg' />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <div style={{marginBottom:"20px"}}>
                                <Input action icon='search' placeholder='Search Films...'
                                onChange={(e)=>{this.getDataSearch(e)}}
                                />  
                           </div>

                                    {/* Card data Film */}
                                        <Grid  columns={3} divided>
                                        {this.state.dataFilm.map((data, key) =>{
                                            var gambar = {...data.show.image}
                                            var rating = {...data.show.rating}
                                            if(data.show.image === null){
                                                gambar = ' https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg'
                                            }else{
                                                gambar = gambar.medium
                                            }
                                            
                                            if(rating.average === null){
                                                rating = 0
                                            }else{
                                                rating = rating.average
                                            }
                                            return(
                                        
                                        <Grid.Column key={key}>
                                        <Card>
                                            <Image src={gambar} wrapped ui={false} />
                                            <Card.Content>
                                            <Card.Header>{data.show.name}</Card.Header>
                                            <Card.Meta>
                                            Episode : {data.name}
                                            </Card.Meta>
                                            <Card.Meta>   
                                            Status : {data.show.status}
                                            </Card.Meta>
                                            <Card.Meta>   
                                            Language : {data.show.language}
                                            </Card.Meta>
                                            <Card.Description>
                                            Summary : <div dangerouslySetInnerHTML={{__html:data.show.summary}}></div>
                                            </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                            <h2> 
                                                <Icon name='star' />
                                                {rating}
                                            </h2>
                                            </Card.Content>
                                        </Card>
                                        </Grid.Column>
                                        )
                                        })}
                                    </Grid>
                        
                        </Grid.Column>
                        <Grid.Column width={3}>
                        <Image src='https://cdn.pixabay.com/photo/2015/03/26/09/43/lenses-690179__480.jpg' />
                        </Grid.Column>
                    </Grid.Row>   
                </Grid>
        </div>
        </>
        )
    }
 }

const mapDispatchtoProps = (dispatch)=>{
    return {
      
        type : "ACTIVE_ITEM", ActiveItem: "film"
       
      }
    }
  

export default connect (null, mapDispatchtoProps)(Film);