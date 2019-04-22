import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";
import DesignCard from "../../components/DesignCard";
import designAPI from "../../utils/designAPI";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import DifficultyForm from "../../components/DifficultyForm/DifficultyForm";
import RatingForm from "../../components/RatingForm/RatingForm";
import SortBy from "../../components/SortByForm/SortBy";

class Browse extends Component {
    constructor(props){
        super(props)

        this.state = {
            publishedDesigns: [],
            sort: "",
            category: "",
            difficulty: "",
            rating: ""
        }
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

    // We will also need an unfavorite event. The cards will eventually dynamically pass in either the favorite or unfavorite event based on whether or not the design is already in the user's favorites.
    favoriteEvent = (event, designId, userId) => {
        event.preventDefault();
        alert("Favorite feature coming soon!");
    }

    editEvent = (event, id) => {
        event.preventDefault();
        alert("Edit feature coming soon!");
    }

    // Change handlers for Browse forms

    handleSortChange = (event) => {
        event.preventDefault();
        this.setState({
            sort: event.target.value
        }, () => {
            console.log(`Sorting results by ${this.state.sort}`);
        })
    }

    handleCategoryChange = (event) => {
        event.preventDefault();
        this.setState({
            category: event.target.value
        }, () => {
            console.log(`Filtering results by ${this.state.category}`);
        })
    }

    handleDifficultyChange = (event) => {
        event.preventDefault();
        this.setState({
            difficulty: event.target.value
        }, () =>{
            // Verify state change with console.log()
            console.log(`Filtering results by ${this.state.difficulty}`);
        })
    }

    handleRatingChange = (event) => {
        event.preventDefault();
        this.setState({
            rating: event.target.value
        }, () =>{
            // Verify state change with console.log()
            console.log(`Filtering results by ${this.state.rating}`);
        })
    }

    render (){
        return(
            <Container styles="well p-3">
                <h1 className="text-center">Browse</h1>
                <Row styles="p-3">
                <div className="col-xl-3">
                    <SortBy onChange={this.handleSortChange}></SortBy>
                    <CategoryForm onChange={this.handleCategoryChange}></CategoryForm>
                    <DifficultyForm onChange={this.handleDifficultyChange}></DifficultyForm>
                    <RatingForm onChange={this.handleRatingChange}></RatingForm>
                </div>
                <div className="col-xl-9">
                <Row>
                {!this.state.publishedDesigns.length > 0 
                ? (
                    <Col size="12">No published designs to display</Col>
                ) : (
                    
                    this.state.publishedDesigns.map(design => {
                        console.log(this.state.publishedDesigns);
                        return (
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12" key={design._id + 1}>
                                <DesignCard 
                                    key={design._id}
                                    id={design._id}
                                    img={design.canvasImage}
                                    title={design.title}
                                    description={design.description}
                                    favorite={this.favoriteEvent}
                                    edit={this.editEvent}
                                    page={"browse"}
                                />
                            </div>
                        );
                    })
                    
                )}
                </Row>
                </div>
            </Row>
            </Container>
        )
    }


};

export default Browse;