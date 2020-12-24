
import "antd/dist/antd.css";
import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import "./styles.css";
import uuid from 'react-uuid';

export default function WidgetComponent({
    id,
    name,
    magicNumber,
    data
}) {
    const converter = require('number-to-words');

    // list of all key values as a <p> tag
    const keyValuePairs = data ? data.map((item) =>
        <p key={uuid()}><span>{item.key}:</span> {item.value} </p>) : '';

    return (
        <div  className="widget-component">
            <Card  className="card">
                <p key={uuid()}><span>ID:</span> {id}</p>
                <p key={uuid()}><span>Name:</span> {name}</p>
                <p key={uuid()}><span>Magic Number:</span> {converter.toWords(magicNumber)}</p>
                {keyValuePairs}
            </Card>
        </div>);
}

WidgetComponent.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    magicNumber: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired
};