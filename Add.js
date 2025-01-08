import React, {useState} from 'react';
import {dataSource} from './Data';
import {TextInput, View, Text, Button} from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const Add = ({navigation}) => {
    const [name, setName] = useState('');  // letter/name == title/name
    const [isbnNum, setIsbnNum] = useState();   // pokemon number == ISBN
    const [linkURL, setLinkURL] = useState('');   // pokemon type == image URL
    const [copies, setCopies] = useState();   // copies owned of that book

    const [category, setCategory] = useState('');

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
                let item = {key: name, num: isbnNum, img: linkURL, numCopies: copies};  // dataSource {key: x, num: x, img: x, numCopies: x}
                let indexNum = 0;
                if(category == "Action") {
                    indexNum = 1;
                }
                if(category == "Others") {
                    indexNum = 2;
                }
                dataSource[indexNum].data.push(item);
                navigation.navigate('Home')
            }
            }
            />
        </View>
    );
};

export default Add;
