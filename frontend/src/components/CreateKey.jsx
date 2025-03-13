import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import FormContainer from './FormContainer';
import { useCreateKeyMutation } from '../slices/keysSlice';
import Loader from "./Loader";

const CreateKey = ({ setActiveKey }) => {

  const { userInfo } = useSelector((state) => state.auth);

  const [createKey, { isLoading }] = useCreateKeyMutation();
  const [title, setTitle] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [desc, setDesc] = useState('');
  const [docs, setDocs] = useState('');

  const createKeyHandler = async (e) => {
    e.preventDefault();
    try {
      await createKey({ title, apiKey, desc, docs }).unwrap();

      setActiveKey('your-keys');
      clear();
    } catch (err) {
      // Handle error (e.g., show notification)
    }
  };

  const clear = () => {
    setTitle('');
    setApiKey('');
    setDesc('');
    setDocs('');
  };

  // Show a loader while the request is in progress
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="py-2">
      <FormContainer>
        <h6>Create a key to securely store and share.</h6>
        <Form onSubmit={createKeyHandler}>
          <Form.Group className="my-2" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="apiKey">
            <Form.Label>Key</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="docs">
            <Form.Label>Documentation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Docs Link"
              value={docs}
              onChange={(e) => setDocs(e.target.value)}
            />
          </Form.Group>

          <div className="mt-3 d-flex justify-content-between">
            <Button type="button" variant="secondary" className="mt-3" onClick={clear}>
              Clear
            </Button>
            <Button type="submit" variant="primary" className="mt-3 ms-3">
              Create Key
            </Button>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
};

export default CreateKey;
