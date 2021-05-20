import React from 'react';
import { StyleSheet, Text, View , Button, Platform , Alert} from 'react-native';
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"

export default class PickImage extends React.Component(){
    state = {image:null}
    render(){
        let{image}=this.state;
        return(
          <View>
              <Button title = "Pick a image" onPress={this.imagePick}></Button>
          </View>
        )
    }

    ComponentDidMount(){
    this.getPermission()
    }

    getPermission=async()=>{
    if (Platform.OS !== "web"){
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(status !== "granted"){
        alert("Sorry , We need camera permission to do the work")
        }
    }}

    imagePick=async()=>{
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes : ImagePicker.MediaTypeOptions.All , 
                allowsEditing: true , 
                aspect : [4 , 3] , 
                quality : 1
            })
            if(!result.cancelled){
                this.setState({
                    image : result.data
                })
                console.log(result.uri)
                this.uploadImage(result.uri)
            }
        }
        catch(E){
            console.log(E)
        }      
    }

    uploadImage=async(uri)=>{
      const data = new FormData()
      let fileName = uri.split("/")[uri.split("/").length-1]
      let type = `image/${uri.split(".")[uri.split(".").length-1]}`
      const fileToUpload = {
          uri : uri , Name : fileName , type : tpe
      }
      data.append("digit", fileToUpload); 
      fetch("http://98093c095560.ngrok.io/predict-digit", {
           method: "POST", 
           body: data, 
           headers: { "content-type": "multipart/form-data", }, }) 
           .then((response) => response.json()) 
           .then((result) => { 
               console.log("Success:", result); 
            }) 
           .catch((error) => {
                console.error("Error:", error); 
            });
    }
}