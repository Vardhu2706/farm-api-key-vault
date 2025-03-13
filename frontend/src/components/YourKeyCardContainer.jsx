import React from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import YourKeyCard from './YourKeyCard';

const YourKeyCardContainer = ({ keys, tabName }) => {

    if (typeof keys === 'undefined' || keys.length === 0) {
        return (
            <Container>
                <Card className="m-2 p-2">No keys to display.</Card>
            </Container>
        );
    }

    const sortedKeys = [...keys].sort((a, b) => new Date(b.updatedAt) - new Date(a.createdAt));

    return (
        <Container>
            <Accordion>
                {sortedKeys.map((key, index) => (
                    < YourKeyCard key={key.id || index} keyItem={key} index={index} />
                ))}
            </Accordion>
        </Container>
    );
};

export default YourKeyCardContainer;
