import "antd/dist/antd.css";
import React from "react";
import PropTypes from "prop-types";
import { Button, List } from "antd";
import {EditTwoTone,DeleteFilled} from '@ant-design/icons';
import "./styles.css";

export default function WidgetListComponent({
    data,
    deleteWidget,
    selectedItem
}) {
   
    return (
    <div className="widget-list">
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                       title={ <span onClick={()=>selectedItem(item)} className="widget-name">{item.name}</span>}
                    />
                    <Button><EditTwoTone /></Button>
                    <Button className="delete-btn" onClick={()=>deleteWidget(item)} type="danger"><DeleteFilled /></Button>
                </List.Item>
            )}
        />
    </div>);

}



WidgetListComponent.propTypes = {
    data: PropTypes.array.isRequired,
    deleteWidget: PropTypes.func.isRequired,
    selectedItem: PropTypes.func.isRequired
};