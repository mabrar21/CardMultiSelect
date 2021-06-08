import {Component} from "react";
import IntentCard from "../components/IntentCard";
import {Badge, Button, Col, Modal, Row} from "react-bootstrap";

export default class IntentSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            seeMoreIntent: null,
            selectedIntents: [],
        }
    }

    handleSeeMore = (intent) => {
        this.setState({
            showModal: true,
            seeMoreIntent: intent
        });
    }
    handleCloseModal = () => {
        this.setState({
            showModal: false,
            seeMoreIntent: null
        });
    }
    handleIntentCardSelection = (intent, selected) => {
        let selectedIntents = selected ?
            [...this.state.selectedIntents, intent]
            : this.state.selectedIntents.filter(x => x.id != intent.id);
        this.setState({
            selectedIntents
        });
    }

    handleSelectAll = () => {
        this.setState({
            selectedIntents: this.props.intents
        })
    }

    handleDeselectAll = () => {
        this.setState({
            selectedIntents: []
        })
    }

    render() {
        return (
            <div className="intent-card-container p-2">
                <Row className="pl-4 pr-2 pt-2 pb-2">
                    <Col xs="12" className="intent-card-container-title">

                        <Row className="d-flex align-content-center justify-content-center">
                            <Col>
                                <h5 className="p-3">Select The Intents You Would Like To Use</h5>
                            </Col>
                            <Col className="d-flex flex-column justify-content-center">
                                <Row className="justify-content-end  p-2">
                                    <Button variant="outline-success" className="m-1" size="sm"
                                            onClick={this.handleSelectAll}>Select All</Button>
                                    <Button variant="outline-danger" className="m-1" size="sm"
                                            onClick={this.handleDeselectAll}>Deselect All</Button>
                                </Row>
                            </Col>
                        </Row>
                        {
                            this.state.selectedIntents.length > 0 ?
                                <Row className="m-2">
                                    {
                                        this.state.selectedIntents.map(intent =>
                                            <Badge className="m-1" variant="success" key={intent.id}>{intent.name}</Badge>)
                                    }
                                </Row>
                                : ""
                        }
                    </Col>
                </Row>
                <Row>
                    {
                        this.props.intents.map(intent =>
                            <IntentCard
                                key={intent.id}
                                intent={intent}
                                handleSeeMore={this.handleSeeMore}
                                onSelectionChange={this.handleIntentCardSelection}
                                selected={this.state.selectedIntents.some(x => x.id == intent.id)}
                            ></IntentCard>)
                    }
                </Row>
                <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.seeMoreIntent?.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Example: If the user says &nbsp;
                            <ul>
                                {
                                    this.state.seeMoreIntent?.trainingData?.expressions?.map(expression =>
                                        <li key={expression.id}><strong>{expression.text}</strong></li>)
                                }
                            </ul>
                            The response will be <strong>{this.state.seeMoreIntent?.reply.text}</strong>
                        </p>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}