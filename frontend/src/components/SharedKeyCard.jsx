import React, { useState } from 'react';
import { Card, Accordion, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaRegCopy, FaExternalLinkAlt, FaRegTrashAlt, FaShareAlt } from 'react-icons/fa';
import { useUpdateKeyMutation, useDeleteKeyMutation, useShareKeyMutation } from "../slices/keysSlice";
import { toast } from 'react-toastify';

const SharedKeyCard = ({ keyItem, index }) => {

    /* Local State for form fields */
    const [title, setTitle] = useState(keyItem.title);
    const [apiKey, setApiKey] = useState(keyItem.apiKey);
    const [desc, setDesc] = useState(keyItem.desc);
    const [docs, setDocs] = useState(keyItem.docs);

    const copyToClipboard = (content) => {
        navigator.clipboard.writeText(content).then(() => {
            toast.success("API Key copied to clipboard!");
        }, (err) => {
            toast.error(err?.data?.message || err.message);
        });
    };

    const openDocumentation = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };


    return (
        <Card className="mb-2">
            <Accordion.Item eventKey={`${index}`}>
                <Accordion.Header>
                    {keyItem.title}
                </Accordion.Header>
                <Accordion.Body>
                    <h5>API Key:</h5>
                    <p>{keyItem.apiKey}</p>
                    <h5>Description:</h5>
                    <p>{keyItem.desc}</p>
                    <small>Last updated: {new Date(keyItem.updatedAt).toLocaleString()}<br /></small>
                    <small>Shared By: {keyItem.email}</small>
                    <div className="mt-3 d-flex justify-content-between">
                        <div></div>

                        <div>

                            {keyItem.docs && (
                                <Button
                                    variant="primary"
                                    onClick={() => openDocumentation(keyItem.docs)}
                                    className="mx-2"
                                >
                                    <FaExternalLinkAlt /> Open Docs
                                </Button>
                            )}
                            <Button variant="primary" onClick={() => copyToClipboard(keyItem.apiKey)}><FaRegCopy /> Copy API Key</Button>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Card >
    );
};

export default SharedKeyCard;
