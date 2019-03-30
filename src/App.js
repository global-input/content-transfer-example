import React, { useState } from 'react';

import ClipboardCopyButton from './components/clipboard-copy-button';
import {GlobalInputConnect} from 'global-input-react';
import {styles} from "./styles";

/**********************Mobile Integration Logic****************/
  let mobile={
        globalInputConnect:null, //this is used when application needs to send message to the mobile app
        _config:null,            //configuration for specifying the mobile user interface etc.
        _setContent:null,        //The function can set the content of the text field displayed on the computer screen.
        _setConnected:null,      //This function will be called with true/fase when a mobile is connected/disconnected
        buildConfig:function(props, setContent, setConnected){ //build configuration for mobile user interface etc
            this._setContent=setContent;                       //this function will be called when user input content on mobileConfig
            this._setConnected=setConnected;                   //this function will be called when a mobile is connected/disconnected
            if(this.config){                                   //build config only once.
              return this.config;
            }
            this._config={
                          url:props.url,                      //optional websocket server url is different from the default
                          apikey:props.apikey,                //optional  the websocket server apikey is different from the default
                          securityGroup:props.securityGroup,  //optional if the application want restrict GLobal Input App users to those who have prepared with the application
                          initData:{
                              action:"input",                 //for action transfering data.
                              dataType:"form",                //the data type is form data
                              form:{
                                title:"Content Transfer",     // the tile of the form displayed on the mobile
                                fields:[{
                                  label:"Content",            //The label of the field displayed on the mobile
                                  value:"",                   //initial value of the  field
                                  nLines:10,                  //text field if nLines === 1; textarea if nLines>1
                                  operations:{
                                      onInput:value=>this._setContent(value)    //will be called when user input text on mobile
                                  }
                                }]
                              }
                          },
                          onSenderConnected:()=>{
                            this._setConnected(true);   //will be called when a mobile is connected.
                          },
                          onSenderDisconnected:()=>{
                            this._setConnected(false);  //will be disconnected when a mobile is disconnected
                          }
             };
             return this._config;
        },
        setContent:function(content){  //set the content on the mobile
          if(this.globalInputConnect){
                this.globalInputConnect.sendInputMessage(content,0);    //this will set the content of the first field on the form on the mobile
          }
        }
  };

export default props=>{
          const [content, setContent]=useState("");
          const [connsected, setConnected]=useState(false);
          let mobileConfig=mobile.buildConfig(props,setContent,setConnected);
          return(
            <div style={styles.container}>

              <div style={styles.title}>
                  Content Transfer Example
              </div>
              <div style={styles.topControl}>
                    <span style={styles.githuburl}>
                        <a href="https://github.com/global-input/content-transfer-example" target="_blank">
                            https://github.com/global-input/content-transfer-example
                        </a>
                    </span>
                    <ClipboardCopyButton copyFieldId="contentField"/>

              </div>
              <div style={styles.areaContainer}>
                <textarea  id="contentField" style={styles.textArea}
                  onChange={(evt) => {
                      setContent(evt.target.value);
                     mobile.setContent(evt.target.value);  //this will send the content to the mobile

                }} value={content}/>
                <div style={styles.globalConnect}>
                      <GlobalInputConnect mobileConfig={mobileConfig}
                        ref={globalInputConnect =>mobile.globalInputConnect=globalInputConnect}
                        connectingMessage="Connecting...."
                        connectedMessage="Scan with Global Input App">
                        </GlobalInputConnect>
                </div>
              </div>
            </div>
          );

}
