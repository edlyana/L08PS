import React, {useState} from 'react';
import {TextInput, View, Text, Button, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({navigation, route}) => {

    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;

    const [name, setName] = useState(route.params.key); // .key is being called here by Home.js   // letter = name
    const [isbnNum, setIsbnNum] = useState(route.params.num.toString());
    const [linkURL, setLinkURL] = useState(route.params.img);
    const [copies, setCopies] = useState(route.params.numCopies.toString());   // ERROR: undefined toString()

    const [category, setCategory] = useState(route.params.category);

    const setData = async(value) => {
        AsyncStorage.setItem('alphadata', value);
        navigation.navigate('Home');
    }

    return (
        <View style={{padding: 10, backgroundColor:'#E8E2DB'}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold', fontSize:17}}>Title:</Text>
                <TextInput value={name} style={{borderWidth: 1, borderStyle:'dotted', borderColor:'#E25439', borderRadius:5}} onChangeText={(text) => setName(text)}/>
            </View>

            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold', fontSize:17}}>ISBN:</Text>
                <TextInput value={isbnNum} style={{borderWidth: 1, borderStyle:'dotted', borderColor:'#E25439', borderRadius:5}} onChangeText={(text) => setIsbnNum(text)}/>
            </View>

            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold', fontSize:17}}>Image URL:</Text>
                <TextInput value={linkURL} style={{borderWidth: 1, borderStyle:'dotted', borderColor:'#E25439', borderRadius:5}} onChangeText={(text) => setLinkURL(text)}/>
            </View>

            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold', fontSize:17}}>Copies Owned:</Text>
                <TextInput value={copies} style={{borderWidth: 1, borderStyle:'dotted', borderColor:'#E25439', borderRadius:5}} onChangeText={(text) => setCopies(text)}/>
            </View>

            <View style={{flexDirection:"row"}}>
                <View style={{margin:10,flex:1}}>
                    <Button color='#436B5C' title='Save'
                            onPress={()=>{
                                let indexnum = 1
                                if(route.params.type=="Comics") {
                                    indexnum = 0;
                                }
                                if(route.params.type=="Others") {
                                    indexnum = 2;
                                }
                                mydata[indexnum].data[myindex].key = name;
                                mydata[indexnum].data[myindex].num = parseInt(isbnNum);
                                mydata[indexnum].data[myindex].img = linkURL;
                                mydata[indexnum].data[myindex].numCopies = parseInt(copies);
                                let stringdata = JSON.stringify(mydata);
                                setData(stringdata);
                            }
                            }
                    />
                </View>

                <View style={{margin:10,flex:1}}>
                    <Button color='#436B5C' title='Delete'
                            onPress={()=>{
                                let indexnum = 1
                                if(route.params.type=="Comics") {
                                    indexnum = 0;
                                }
                                if(route.params.type=="Others") {
                                    indexnum = 2;
                                }
                                Alert.alert("Are you sure?",'',
                                    [{text:'Yes', onPress:()=>{
                                            mydata[indexnum].data.splice(myindex,1);
                                            let stringdata = JSON.stringify(mydata);
                                            setData(stringdata);
                                            // navigation.navigate("Home")
                                        }},
                                        {text:'No'}])
                            }
                            }
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;
