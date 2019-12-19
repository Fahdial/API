import React, {Component} from 'react';
import {SafeAreaView,Text,TextInput,View,TouchableOpacity,StatusBar,ScrollView, Alert,ActivityIndicator,StyleSheet} from 'react-native';
import axios from 'axios'

import {h} from '../dimension'
import { Button } from 'native-base';

class Api extends Component{
  state={
    data : null,
    title : '',
    body : '',
    userId : null,
    Loading : true
  }

  getPost = () => {
    axios({
      method : "GET",
      url : 'https://jsonplaceholder.typicode.com/posts'
    })
    .then(({data}) => {
      this.setState({
        data,
        Loading : false
      })
    })
    .catch(error => {
      console.warn(error)
    })
  }

  postData = () => {
    const {title, body, userId} = this.state
    if(title && body){
      this.setState({
        Loading : true
      },() => {
        axios({
          method : "POST",
          url : 'https://jsonplaceholder.typicode.com/posts',
          body: JSON.stringify({
            title,
            body,
            userId
          })
        })
        .then(response => {
          this.setState({
            title : "",
            body : "",
            Loading : false
          }, () => Alert.alert(`ID : ${JSON.stringify(response.data.id)}; Status : ${JSON.stringify(response.status)} `))
        })
        .catch(error => {
          this.setState({
            Loading : false
          }, () => console.warn(error))
        })
      })
    } else {
      Alert.alert('Please fill out the form!')
    }
  }

  componentDidMount(){
    this.getPost()
  }


  render(){
    const { data, title, body, Loading } = this.state
    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor="transparent"/>
        <View
          style={{
            height : h/6,
            backgroundColor : "#bed3eb",
            padding : '2%'
          }}
        >
          <Text style={{marginTop:10, textAlign : 'center', color : "#000000"}}>API</Text>
          <View
            style={{
              height : '100%',
              justifyContent : 'space-between'
            }}
          >
            <TextInput 
              style={styles.inputText}
              placeholder="Title"
              value={title}
              onChangeText={value => this.setState({title : value})}
            />
            <TextInput 
              style={styles.inputText}
              placeholder="Body"
              value={body}
              onChangeText={value => this.setState({body : value})}
            />
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={this.postData}
            >
              <Text style={{color : '#ffff'}}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            height : h/1.3,
            marginTop:40,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height : '110%',
            }}
          >
            {
              Loading
              ? <ActivityIndicator />
              : (
                data && data.map(({title, body}, index) => (
                  <View 
                    key={index}
                    style={{
                      backgroundColor : '#bed3eb',
                      padding : 10,
                      marginBottom : 10,
                      borderRadius : 5
                    }}
                  >
                    <Text style={{textAlign : 'left', color : '#000000', marginBottom : 10}}>{title}</Text>
                    <Text style={{textAlign : 'left', color : '#000000'}}>{body}</Text>
                  </View>
                ))
              )
            }
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  buttonAdd : {
    height : 30,
    backgroundColor : '#0984e3',
    borderRadius : 5,
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom:50
  },
  inputText: {
    height : 30,
    backgroundColor : '#ffffff',
    paddingHorizontal : 10,
    paddingVertical : 0,
    color : '#636e72',
    marginBottom:5
  }
})

export default Api