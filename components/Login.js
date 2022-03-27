import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet,Text ,Image,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import validateEmail from './Validate.js';
export default function Login(props) {
const isFocused = useIsFocused();
const navigation = useNavigation()
const [ state, setstate ] = React.useState({});
const [authenticated,setauthenticated] = React.useState(false);
const [auth_user,setauthuser]= React.useState({});
const [loader,setloader]= React.useState(false);



const [screenloader,setscreenloader]= React.useState(true);
console.log("navigatin is ",props.route)
React.useEffect(()=>{
console.log("useeffect called==============")
getData()
async function getData(){
try {
let user_data = await AsyncStorage.getItem(
"auth_user"
);
if (user_data !== null) {
user_data=JSON.parse(user_data)
// We have data!!
console.log("value is async ",user_data);
// let user_data=JSON.parse(localStorage.getItem("auth_user"))
// console.log(user_data,"{}{}{}{}{}{}{}")
axios.post('https://nivaapi.herokuapp.com/check/authuser',{token:user_data.token}).then(resp=>{
console.log("response is ",resp.data)
if(resp.data.success == 1 || resp.data.login == true)
{
console.log("auth usre is ",resp.data)
console.log("auth usre is ",resp.data)
console.log("auth usre is ",resp.data)
console.log("auth usre is ",resp.data)
console.log("auth usre is ",resp.data)
console.log("auth usre is ",resp.data)
console.log("auth usre is ",resp.data)
console.log("auth usre is ",resp.data)
console.log("auth usre is navigation",navigation)



setauthenticated(true)
setauthuser(resp.data.data)
// navigation.replace("Dashboard")
props.navigation.replace("Dashboard",{authenticated:true,auth_user:user_data,_id:user_data.id})
return;



}
else
{
console.log("insid eles eblock============")



setauthenticated(false)
// navigation.navigate("Login")
}



setscreenloader(false)
}).catch(err=>{
console.log("error during request",err)
setauthenticated(false)
setscreenloader(false)
})
//----------if ends----
}
else
{
console.log("userdaa is null",user_data)
setscreenloader(false)
}
} catch (error) {
// Error saving data
setscreenloader(false)
console.log("Error occured during saving data",error)
}
}



},[])
// getData();
// async function getData(){
// try {
// let user_data = await AsyncStorage.getItem(
// "auth_user"
// );
// if (user_data !== null) {
// // We have data!!
// console.log("value is async ",user_data);
// // let user_data=JSON.parse(localStorage.getItem("auth_user"))
// // console.log(user_data,"{}{}{}{}{}{}{}")
// axios.post('https://nivaapi.herokuapp.com/check/authuser',{token:JSON.parse(user_data.token)}).then(resp=>{
// console.log("response is ",resp.data)
// if(resp.data.success == 1 || resp.data.login == true)
// {
// console.log("auth usre is ",resp.data)
// setauthenticated(true)
// setauthuser(resp.data.data)
// navigation.navigate("Dashboard")



// }
// else
// {
// console.log("insid eles eblock============")



// setauthenticated(false)
// // navigation.navigate("Login")
// }



// setloader(false)
// }).catch(err=>{
// console.log("error during request",err)
// setauthenticated(false)
// setloader(false)
// })
// //----------if ends----
// }
// else
// {
// setloader(false)
// }
// } catch (error) {
// // Error saving data
// setloader(false)
// console.log("Error occured during saving data")
// }
// }
// function validateEmail(email)
// {
// console.log("validating email.....",email)



// let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
// if (filter.test(email)) {
// // Yay! valid
// return true;
// }
// else
// {return false;}



// }
const onLogin= ()=> {



if(Object.keys(state).length >0 && state.email && state.password)
{
setloader(true)
if(!validateEmail(state.email))
{
Alert.alert("Please enter a valid email id..")
setloader(false)
}
else
{
axios.post('https://nivaapi.herokuapp.com/api/login/user',state).then(async (resp)=>{
if(resp.data.success ==1)
{
try {
await AsyncStorage.setItem(
"auth_user",
JSON.stringify(resp.data.auth_user)
);
console.log("auth user saved during login")
} catch (error) {
// Error saving data
console.log("Error occured during saving data",error)
}
// localStorage.setItem("auth_user",JSON.stringify(resp.data.auth_user))
// console.log("signin success",props)
setauthenticated(true)
props.navigation.replace("Dashboard",{authenticated:true,auth_user:resp.data.auth_user})
return;
}
else
{
console.log("=======login failed======")
console.log(resp.data.message)
Alert.alert("either username or password is incorrect please try again")
}
setloader(false)
}).catch(err=>{
setloader(false)



console.log("error occured ",err)
})



}
}



else
{
Alert.alert("Please fill all the mandatory fields..")
}





// Alert.alert('Credentials', `${username} + ${password}`);
}
const handlechange=(val,key)=>{
let temp=state
temp[key]= val.toLowerCase()

setstate({...temp})
// console.log(state)




}



const handleForgot=()=>{
console.log("clicked==")
props.navigation.navigate("SendMail")



}



return (
<View style={styles.container}>
{screenloader ?<View><ActivityIndicator size="large" color="blue"/></View>:<><Image source={require('../assets/nivalogo.png')} style={{width:120,height:120,marginBottom:10,borderTopRightRadius:20,borderTopLeftRadius:20, borderBottomLeftRadius: 20,
borderBottomRightRadius: 20,}} />
<TextInput
value={state.email?state.email:''}
onChangeText={(username) => handlechange(username,"email")}
placeholder={'Enter email *'}
style={styles.input}
/>
<TextInput
value={state.password?state.password:''}
onChangeText={(password) => handlechange(password,"password")}
placeholder={'Password *'}
secureTextEntry={true}
style={styles.input}
/>




{loader ? <View><ActivityIndicator size="large" color="blue"/></View> :



<Button
title={' Login '}
color="#004080"
onPress={onLogin}
/>
}



<View style={{backgroundColor:"transparent",display:"flex",justifyContent:"center",marginTop:40,padding:5}} >
<Text style={{textDecorationLine:"underline",color:"#004080",fontSize:15}} onPress={handleForgot}>
Forgot password
</Text>
</View></>}

</View>
);
}



const styles = StyleSheet.create({



container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#fff',
},
input: {
width: 200,
height: 44,
padding: 10,
borderWidth: 1,
borderColor: 'black',
marginBottom: 10,
},
});