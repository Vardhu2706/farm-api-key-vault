import React from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import SharedKeyCard from "./SharedKeyCard";

const SharedKeyCardContainer = ({ keys, tabName }) => {

    // Check if keys is undefined or an empty array and handle accordingly
    if (typeof keys === 'undefined' || keys.length === 0) {
        return (
            <Container>
                <Card className="m-2 p-2">No keys to display.</Card>
            </Container>
        );
    }

    // Create a copy of the keys array and sort that copy
    const sortedKeys = [...keys].sort((a, b) => new Date(b.updatedAt) - new Date(a.createdAt));

    return (
        <Container>
            <Accordion>
                {sortedKeys.map((key, index) => (
                    <SharedKeyCard key={key.id || index} keyItem={key} index={index} tabName />
                ))}
            </Accordion>
        </Container>
    );
};

export default SharedKeyCardContainer;
