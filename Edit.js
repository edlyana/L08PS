import React, {useState} from 'react';
import {dataSource} from './Data';
import {TextInput, View, Text, Button, Alert} from "react-native";

const Edit = ({navigation, route}) => {
    const [name, setName] = useState(route.params.key); // .key is being called here by Home.js   // letter = name
    const [isbnNum, setIsbnNum] = useState(route.params.num.toString());
    const [linkURL, setLinkURL] = useState(route.params.img);
    const [copies, setCopies] = useState(route.params.numCopies.toString());   // copies owned of that book

    const [category, setCategory] = useState(route.params.category);  // type == category

    return (
        <View style={{padding: 10}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Title:</Text>
                <TextInput value={name} style={{borderWidth: 1}} onChangeText={(text) => setName(text)}/>
            </View>

            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>ISBN:</Text>
                <TextInput value={isbnNum} style={{borderWidth: 1}} onChangeText={(text) => setIsbnNum(text)}/>
            </View>

            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Image URL:</Text>
                <TextInput value={linkURL} style={{borderWidth: 1}} onChangeText={(text) => setLinkURL(text)}/>
            </View>

            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Copies Owned:</Text>
                <TextInput value={copies} style={{borderWidth: 1}} onChangeText={(text) => setCopies(text)}/>
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={{margin:10, flex:1}}>
                    {/*<Button title="SAVE" onPress={() => {*/}
                    {/*    let indexNum = 0;*/}
                    {/*    if (route.params.type === "Grass") {*/}
                    {/*        indexNum = 1;*/}
                    {/*    }*/}
                    {/*    if (route.params.type === "Psychic") {*/}
                    {/*        indexNum = 2;*/}
                    {/*    }*/}
                    {/*    dataSource[indexNum].data[route.params.index] = {key: name, num: parseInt(pokeNum)};*/}
                    {/*    navigation.navigate("Home");*/}
                    {/*}}/>*/}

                    <Button
                        title="SAVE"
                        onPress={() => {
                            let sectionIndex = dataSource.findIndex((section) => section.title === route.params.category);
                            dataSource[sectionIndex].data[route.params.index] = { key: name, num: parseInt(isbnNum), img: linkURL, numCopies: parseInt(copies), };
                            navigation.navigate("Home");
                        }}
                    />
                </View>

                <View style={{margin:10, flex:1}}>
                    <Button title="DELETE" onPress={() => {
                        let sectionIndex = dataSource.findIndex(
                            (section) => section.title === route.params.category
                        );
                        // let indexNum = 0;
                        // if (route.params.type == "Grass") {
                        //     indexNum = 1;
                        // }
                        // if (route.params.type == "Psychic") {
                        //     indexNum = 2;
                        // }
                        Alert.alert("Are you sure?", '',
                            [{text:"Yes", onPress: () => {
                                dataSource[sectionIndex].data.splice(route.params.index, 1);
                                navigation.navigate("Home");
                            }},
                                {text:"No"}
                            ])
                    }}/>
                </View>
            </View>
        </View>
    );
};

export default Edit;
