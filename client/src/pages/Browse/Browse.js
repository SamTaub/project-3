import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";
import DesignCard from "../../components/DesignCard";
import designAPI from "../../utils/designAPI";

class Browse extends Component {

    state = {
        publishedDesigns: []
    }

    componentDidMount(){
        this.getAllPublishedDesigns();
    }

    getAllPublishedDesigns = () => {
        designAPI.getAllPublishedDesigns()
        .then(res =>{
            this.setState({
                publishedDesigns: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }


    render (){
        return(
            <Container styles="well p-3">
                <h1 className="text-center">Browse</h1>
                <Row styles="p-3">
                {!this.state.publishedDesigns.length > 0 
                ? (
                    <Col size="12">No published designs to display</Col>
                ) : (
                    this.state.publishedDesigns.map(design => {
                        console.log(this.state.publishedDesigns);
                        return (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <DesignCard 
                                    key={design._id}
                                    id={design._id}
                                    img={design.canvasImage}
                                    title={design.title}
                                    description={design.description}
                                />
                            </div>
                        );
                    })
                )}
            </Row>
            </Container>
        )
    }


};

export default Browse;