import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateKey from './CreateKey';
import YourKeyCardContainer from "./YourKeyCardContainer";
import SharedKeyCardContainer from "./SharedKeyCardContainer";
import Loader from './Loader';
import { useSelector } from 'react-redux';
import { useGetSharedKeysQuery, useGetKeysQuery } from "../slices/keysSlice";

function TabsComponent() {
    const [key, setKey] = useState('create-key');
    const { userInfo } = useSelector((state) => state.auth);
    const {
        data: userKeys,
        isLoading: isLoadingUserKeys
    } = useGetKeysQuery(undefined, { skip: key !== 'your-keys' });
    const {
        data: sharedKeys,
        isLoading: isLoadingSharedKeys
    } = useGetSharedKeysQuery(undefined, { skip: key !== 'shared-keys' });

    const handleSelect = (k) => {
        setKey(k);
    };

    return (
        <Tabs
            activeKey={key}
            onSelect={handleSelect}
            className="mb-4 mt-4"
            justify
            transition={true}
        >
            <Tab eventKey="create-key" title="Create a Key">
                <CreateKey setActiveKey={setKey} />
            </Tab>
            <Tab eventKey="your-keys" title="Your Keys">
                {isLoadingUserKeys ? <Loader /> : <YourKeyCardContainer keys={userKeys} tabName={"your-keys"} />}
            </Tab>
            <Tab eventKey="shared-keys" title="Shared Keys">
                {isLoadingSharedKeys ? <Loader /> : <SharedKeyCardContainer keys={sharedKeys} tabName={"shared-keys"} />}
            </Tab>
        </Tabs>
    );
}

export default TabsComponent;
