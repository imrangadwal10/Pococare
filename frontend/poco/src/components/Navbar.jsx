import { Box, ButtonGroup, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
<Flex w="96%" m="auto" mt="10px" alignItems='center' gap='2'>
<Box p='2'>
  <Heading size='md'>Pococare</Heading>
</Box>
<Spacer />
<ButtonGroup gap='2'>
  <Text style={{padding:"7px"}} color="white" backgroundColor="grey"><Link to="/">Home</Link></Text>
  <Text style={{padding:"7px"}} color="white" backgroundColor="grey"><Link to="/login">Login</Link></Text>
  <Text style={{padding:"7px"}} color="white" backgroundColor="grey"><Link to="/signup">Signup</Link></Text>
</ButtonGroup>
</Flex>
  )
}

export default Navbar