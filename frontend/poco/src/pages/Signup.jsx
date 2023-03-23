import React, { useState } from 'react'
import { Box, FormControl, FormLabel, Input, Text, useToast} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const initialState={
    name:"",
    email:"",
    password:""
 }

const Signup = () => {
    const [data,setData]=useState(initialState)
    const Toast=useToast()
    const navigate=useNavigate()


  function handleClick(){
     axios.post("http://localhost:8080/user/signup",data).then((res) => {
       if(res.data.desc==="User created successfully"){
        Toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position:"top"
          })
          navigate("/login")
       }else if(res.data.desc==="User already exists"){
        Toast({
          title: 'User already exists',
          description: "User already exists",
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
             <Text mt={"20px"} pt={"50px"} fontSize="30px">SignUp</Text>
        <FormLabel mt="20px"  >Name</FormLabel>
          <Input onChange={(e)=>handleChange(e)} name='name' placeholder='Full Name'/>
          <FormLabel mt="20px" >Email</FormLabel>
          <Input onChange={(e)=>handleChange(e)} name='email' placeholder='enter email'/>
          <FormLabel mt="20px"  >Password</FormLabel>
          <Input onChange={(e)=>handleChange(e)} name='password'  type={"password"} placeholder='enter password'/>
          <Input _hover={{cursor:"Pointer"}} onClick={(e)=>handleClick(e)} mt="20px"  backgroundColor="grey" color="white" type="submit"/>
          <Text mt="10px">Already have an account <Link to="/login"><Text color={"blue"}>Login</Text></Link></Text>
          </FormControl>
        </Box>
      )
}

export default Signup