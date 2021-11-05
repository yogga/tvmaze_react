import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { Carousel } from 'react-responsive-carousel';
import { Header, Image, Card, Button } from 'semantic-ui-react'

class Actor extends Component {

    constructor(){
        super();
        this.state={
            dataActor:[],
            loading: true
        }
    }

    getDataActor = async () =>{
        try{
        await axios.get(`http://api.tvmaze.com/search/people?q=Sarah`, {crossDomain:true})
        .then((res)=>{
            this.setState({
                dataActor: res.data,
                loading: false
            })
        })
    }catch(error){
        alert(JSON.stringify(error.message))
    }
}

componentDidMount = async () => {
    await this.getDataActor()
    
 }
    render(){
        console.log(this.state.dataActor)
    return(
        <>
            <Header style={{marginTop:20}} size='large'>Actor</Header>
            <div>
                <Carousel autoPlay centerMode centerSlidePercentage={20} showStatus="false" >
                {this.state.dataActor.map((data, key)=>{
                    var gambar = {...data.person.image}
                    if(data.person.image===null){
                        gambar = 'https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg'
                    }else{
                        gambar=gambar.original
                    }
                    return(
                        <div>
                            <img style={{height:"auto" , width:"50%"}} src={gambar} alt={data.person.name} />
                            <p className="legend">{data.person.name}</p>
                        </div>
                    )
                })}
               </Carousel>
            </div>
                    <div>
                        <Card.Group>
                        <Card>
                        <Card.Content>
                            <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>Steve Sanders</Card.Header>
                            <Card.Meta>Friends of Elliot</Card.Meta>
                            <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                            <Button basic color='green'>
                                Approve
                            </Button>
                            <Button basic color='red'>
                                Decline
                            </Button>
                            </div>
                        </Card.Content>
                        </Card>
                        <Card>
                        <Card.Content>
                            <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                            />
                            <Card.Header>Molly Thomas</Card.Header>
                            <Card.Meta>New User</Card.Meta>
                            <Card.Description>
                            Molly wants to add you to the group <strong>musicians</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                            <Button basic color='green'>
                                Approve
                            </Button>
                            <Button basic color='red'>
                                Decline
                            </Button>
                            </div>
                        </Card.Content>
                        </Card>
                        <Card>
                        <Card.Content>
                            <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
                            />
                            <Card.Header>Jenny Lawrence</Card.Header>
                            <Card.Meta>New User</Card.Meta>
                            <Card.Description>
                            Jenny requested permission to view your contact details
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                            <Button basic color='green'>
                                Approve
                            </Button>
                            <Button basic color='red'>
                                Decline
                            </Button>
                            </div>
                        </Card.Content>
                        </Card>
                    </Card.Group>
                    </div>
        </>
    )
 }
}

const mapDispatchtoProps = (dispatch)=>{
    return {
      
        type : "ACTIVE_ITEM", ActiveItem: "actor"
       
      }
    }
  

export default connect (null, mapDispatchtoProps)(Actor);