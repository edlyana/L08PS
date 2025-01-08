import React, {useState} from 'react';
// import {dataSource} from './Data';
import {TextInput, View, Text, Button} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({navigation, route}) => {
    const [name, setName] = useState('');  // letter/name == title/name
    const [isbnNum, setIsbnNum] = useState();   // pokemon number == ISBN
    const [linkURL, setLinkURL] = useState('');   // pokemon type == image URL
    const [copies, setCopies] = useState();   // copies owned of that book

    const [category, setCategory] = useState('');

    const setData = async(value) => {
        AsyncStorage.setItem('alphadata', value);
        navigation.navigate('Home');
    }

    return (
        <View style={{padding: 10}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Title:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setName(text)}/>
            </View>

            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>ISBN:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setIsbnNum(text)}/>
            </View>

            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Image URL:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setLinkURL(text)}/>
            </View>

            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Copies Owned:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setCopies(text)}/>
            </View>

            <View style={{padding: 10}}>
                <RNPickerSelect
                    value={category}
                    onValueChange={(value) => setCategory(value)}
                    items={[
                        {label:"Comics", value:"Comics"},
                        {label:"Action", value:"Action"},
                        {label:"Others", value:"Others"},
                    ]}
                />
            </View>
            <Button title="SUBMIT" onPress={() => {
                let mydata = JSON.parse(route.params.datastring);
                let item = {key: name, num: isbnNum, img: linkURL, numCopies: copies};  // dataSource {key: x, num: x, img: x, numCopies: x}
                let indexNum = 0;
                if(category == "Action") {
                    indexNum = 1;
                }
                if(category == "Others") {
                    indexNum = 2;
                }
                mydata[indexNum].data.push(item);
                let stringdata = JSON.stringify(mydata);  // stringdata contains new data imputed by user
                setData(stringdata);
                // navigation.navigate('Home')
            }
            }
            />
        </View>
    );
};

export default Add;
