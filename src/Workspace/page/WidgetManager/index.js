import React, { useState } from "react";
import { Modal, Button } from 'antd';
import uuid from 'react-uuid';
import WidgetComponent from "../../sharedComponents/WidgetComponent";
import WidgetListComponent  from "../../sharedComponents/WidgetListComponent";
import AddorEditWidgetComponent from "../../sharedComponents/AddorEditWidget";
import "./styles.css";

export default function WidgetManager() {
  const defaultKeyValuePairs = [{
      key: 'CreatedBy',
      value: 'Sander'
    },{
      key: 'Team',
      value: 'Front End'
    },{
      key: 'Using',
      value: 'React'
    },{
      key: 'Language',
      value: 'English'
    },{
      key: 'Information',
      value: 'None'
    }];
  const [widgetsData, setWidgetsData] = useState([
    { id: uuid(), name: "Statistics", magicNumber: 16, data: defaultKeyValuePairs },
    { id: uuid(), name: "Tasks", magicNumber: 52, data: defaultKeyValuePairs },
    { id: uuid(), name: "Files", magicNumber: 8, data: defaultKeyValuePairs }]);

    const [visible,setVisible]=useState(false);

    const [selectedItem,setSelectedItem]=useState(widgetsData[0]);    
    const showModal = () => {
      setVisible(true);
    };
    const handleCancel = e => {
      setVisible(false)
    };
    
  return (
    <div className="pageContainer">
      <h1>Widgets View</h1>
      <div className="widgets-view">
        <WidgetListComponent data={widgetsData} deleteWidget={handleDelete} selectedItem={handleSelectedItem}/>
        <Button className="add-a-widget-button" type="primary" onClick={showModal}>
         Add Widget
        </Button>
        <Modal
          className="add-or-edit-modal"
          title="Add a Widget"
          visible={visible}
          onCancel={handleCancel}
          okButtonProps={{ disabled: true, hidden:true }}
          cancelButtonProps={{ disabled: true , hidden:true }}
        >
         <AddorEditWidgetComponent keyVal={selectedItem? selectedItem.data:defaultKeyValuePairs} handleAddEditWidget={handleAddEditWidget} handleCancel={handleCancel} />
        </Modal>
        {selectedItem && <WidgetComponent id={selectedItem.id} name={selectedItem.name} magicNumber={selectedItem.magicNumber} data={selectedItem.data} />}
      </div>
    </div>
  );

    //handle add or edit widget
    function handleAddEditWidget(widget){
      let widgetTempData=widgetsData;
      widgetTempData.push({id:widget.id,name:widget.name,magicNumber:widget.magicNumber,data:widget.data});
      setWidgetsData(widgetTempData);
    }

    //handle selected Item
    function handleSelectedItem(item){
      setSelectedItem(item);
   }

    //handle the deletion of a widget 
    function handleDelete(item){
      let availableItems = widgetsData.filter(function(element){
        return element.id!==item.id
      });
      setWidgetsData(availableItems);
     
      if(selectedItem.id===item.id)
        availableItems.length>0 ? setSelectedItem(availableItems[0]) : setSelectedItem(undefined);      
    }

}