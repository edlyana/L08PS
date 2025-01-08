import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SectionList, StatusBar, Button, TextInput} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dataSource} from "./Data";

const styles = StyleSheet.create({
    opacityStyle: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor:'#E25439',
        padding: 20,
        marginLeft: 15,
        marginRight: 15,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#E8E2DB',
    },
    textStyle: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
    },
    headerText:{
        textAlign: 'center',
        fontSize: 22,
        marginLeft: 15,
        marginRight: 15,
        // margin: 5,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor:'#E25439',
    },
    imgCard:{
        width: 159,
        height: 227,
    },
    buttonContainer:{
        borderWidth: 1,
        borderColor:'#E25439',
        margin: 10,
    },
})

const Home = ({navigation}) => {

    const [mydata, setMyData] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem('alphadata');
        if(datastr != null){
            jsondata = JSON.parse(datastr);
            setMyData(jsondata);
        }
        else{
            setMyData(dataSource);
        }
    };

    getData();

    const renderItem = ({item, index, section}) => {
        return(
            <TouchableOpacity style={styles.opacityStyle} onPress={() => {
                let datastr = JSON.stringify(mydata);
                navigation.navigate("Edit", {index: index, type: section.title, key: item.key, num: item.num, img: item.img, numCopies: item.numCopies, datastring:datastr});
            }}>
                <Text style={styles.textStyle}>
                    {item.key} {'\n'}
                    ISBN: {item.num} {'\n'}
                    Copies Owned: {item.numCopies}
                </Text>
                <Image style={styles.imgCard} source={{uri: item.img}} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, { marginBottom: 150, backgroundColor:'#E8E2DB'}]}>
            <StatusBar hidden={true}/>
            <View style={styles.buttonContainer}>
                <Button color='#436B5C' title="New Book" onPress={()=> {
                    let datastr = JSON.stringify(mydata);
                    navigation.navigate('Add', {datastring:datastr});
                }}/>
            </View>
            <View>
                <SectionList sections={mydata} renderItem={renderItem}
                             renderSectionHeader={({section:{title, bkColor, nameIcon}})=>(
                                 <Text style={[styles.headerText, {backgroundColor:bkColor}]}><Icon name={nameIcon} size={25} color={"black"}/>  {title}</Text>
                             )}
                />
            </View>
        </View>
    );
};

export default Home;
