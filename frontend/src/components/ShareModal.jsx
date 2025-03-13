import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ShareModal = () => {

    const handleShare = async () => {
        try {
            await shareKeyMutation({ keyId: keyItem._id, userIdToShare: recipientUserId }).unwrap();
            alert('Key shared successfully');
            handleCloseShareModal();
        } catch (error) {
            console.error('Failed to share key:', error);
            // Handle the error, possibly by displaying a message to the user
        }
    };


    return (
        <Modal show={showShareModal} onHide={handleCloseShareModal}>
            <Modal.Header closeButton>
                <Modal.Title>Share Key</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="shareWithEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email to share with"
                            value={shareEmail}
                            onChange={(e) => setShareEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseShareModal}>Close</Button>
                <Button variant="primary" onClick={handleShare}>Share</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ShareModal;