import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useCallback, useEffect } from 'react';
// import { GiftedChat } from 'react-native-gifted-chat'
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
import CommonFunction from '../../Utilises/CommonFunction';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
const Chats = () => {

  const navigation = useNavigation()
  // const [messages, setMessages] = useState([]);


  // const usersCollection = firestore()
  // .collection('User_details')
  // .get()
  // .then(collectionSnapshot => {
  //     console.log('Total users: ', collectionSnapshot.size);
  //     collectionSnapshot
  //         .forEach(documentSnapshot => {
  //             console.log('User ID: ', documentSnapshot.id,
  //                 documentSnapshot.data());
  //         });
  // })

  // .collection('User_details')
  // .doc('AfZE3GpMiBMWxumgMuTQ')
  // .set({
  //   name:'vasu', age:22
  // })
  // console.log('ALL DATA', usersCollection);

  // useEffect(() => {
  //   setMessages([
  //     { 
  //       _id: 1,
  //       text: 'Hello ojha',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  // }, [])

const logOut=()=>{
  console.log('logout hua');
  CommonFunction.logoutWithFirebase((res)=>{
    navigation.navigate('LogIn')
    console.log("DetailsLoggedOut", res);
  },error=>{console.log('error',error)})
}
  return (
    // <GiftedChat
    //   messages={messages}
    //   onSend={messages => onSend(messages)}
    //   user={{
    //     _id: 1,
    //   }}
    // />
    <View>
        <TouchableOpacity onPress={logOut}
          >
           <Text style={{fontSize:40,fontWeight:'bold'}}>Logout</Text>

        </TouchableOpacity>
    </View>
  )
}

export default Chats