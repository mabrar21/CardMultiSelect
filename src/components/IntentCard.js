import {Component} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'

export default class IntentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    handleClick = () => {
        this.props.onSelectionChange(this.props.intent, !this.props.selected);
    }

    handleSeeMore = (e) => {
        e.stopPropagation();
        this.props.handleSeeMore(this.props.intent);
    }

    render() {
        return (
            <Col xs={3} onClick={this.handleClick}>
                <Col
                    className={"intent-card m-2 p-2 d-flex flex-column justify-content-around " + (this.props.selected ? "selected" : "")}>
                    <Row className="p-1 m-1 justify-content-between">
                        <h5>{this.props.intent.name}</h5>
                        <FontAwesomeIcon className={this.props.selected ? "checked" : "unchecked"}
                                         icon={faCheckCircle}/>
                    </Row>
                    <Row className="p-1 m-1">
                        <p className="font-12">
                            Example: If the user says: <strong
                            className="font-14">{this.props.intent.trainingData.expressions[0].text} </strong><br/>
                            the response will be: <strong
                            className="font-14">{this.props.intent.reply.text}</strong>
                        </p>
                    </Row>
                    <Row className="p-1 m-1">
                        <Button onClick={this.handleSeeMore} variant="outline-info">See More Examples</Button>
                    </Row>
                </Col>
            </Col>
        )
    }
}