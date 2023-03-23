import React, { useContext, useState } from 'react'
import { Box, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { context } from '../context/AuthContext';

const initialState={
    email:"",
    password:""
}

const Login = () => {
    const [data,setData]=useState(initialState)
    const  {setIsAuth,value} = useContext(context);
    const Toast=useToast()
    const navigate=useNavigate()

    
    function handleClick(){
      axios.post("http://localhost:8080/user/login",data).then((res) => {
        if(res.data.desc==="Logged inn successfully"){
          setIsAuth({...res.data,login:true})  
         Toast({
             title: 'Login successfull.',
             description:  "You have logged inn successfully.",
             status: 'success',
             duration: 3000,
             isClosable: true,
             position:"top"
           })
              navigate("/")
             
        }else{
          Toast({
            title: 'Login Failed.',
            description:  "Login Failed.",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position:"top"
          })
        }
      }).catch((e) => {
       Toast({
         title: e.message,
         description: e.message,
         status: 'success',
         duration: 3000,
         isClosable: true,
         position:"top"
       }) 
      console.log(e)
      })
 
   }

     const handleChange=(e)=>{
          e.preventDefault()
          const {name,value}=e.target;
          setData({...data,[name]:value})
     }
    return (
        <Box>
          <FormControl pl={"30px"} pr="30px"  pb="60px" boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} width="30%" margin="auto" mt="100px">
            <Text mt={"20px"} pt={"50px"} fontSize="30px">LogIn</Text>
          <FormLabel mt="20px" >Email</FormLabel>
          <Input onChange={(e)=>handleChange(e)} name='email' placeholder='enter email'/>
          <FormLabel mt="20px">Password</FormLabel>
          <Input onChange={(e)=>handleChange(e)} name='password' type="password" placeholder='enter password'/>
          <Input  _hover={{cursor:"Pointer"}} onClick={(e)=>handleClick(e)} mt="20px"  backgroundColor="grey" color="white" type="submit"/>
          <Text  mt="10px">Don't have an account <Link to="/Signup"><Text color={"blue"}>Signup</Text></Link></Text>
          </FormControl>
        </Box>
      )
}

export default Login;