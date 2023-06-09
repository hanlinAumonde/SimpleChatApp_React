import React from "react";
import {Container,Row,Col,Button} from "react-bootstrap";

/**
 * Composant de pagination dans la page
 */
export default function Pagination({currentPage, totalPages, handlePrevious, handleNext}){
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg='2'>
                    {
                        currentPage > 0 ?
                            <Button onClick={handlePrevious}>Page précédente</Button>
                            :
                            <Button disabled>Page précédente</Button>
                    }
                </Col>
                <Col md="auto">
                    <span style={{fontStyle:"oblique",fontSize:"20px"}}>Numéro de page {currentPage + 1} / {totalPages} pages</span>
                </Col>
                <Col xs lg='2'>
                    {
                        currentPage < totalPages - 1 ?
                            <Button onClick={handleNext}>Page suivante</Button>
                            :
                            <Button disabled>Page suivante</Button>
                    }
                </Col>
            </Row>
        </Container>
    )
}