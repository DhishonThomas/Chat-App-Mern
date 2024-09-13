import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SignUp = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [show,setShow]=useState(false)

    const handleClick=()=>{
setShow(!show)
    }
   

    const submitHandler=()=>{

    }



  return (
    <VStack spacing={'5px'}>
        <FormControl id='first-name'>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)}/>
        </FormControl>
        <FormControl id='email'>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>
        </FormControl>
        <FormControl id='password'>
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input placeholder='Enter Your Password' type={show?"text":"password"}  onChange={(e)=>setPassword(e.target.value)}/>
            <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
            {show?"Hide":"Show"}
            </Button>
            </InputRightElement>
            </InputGroup>

        </FormControl>

        <Button colorScheme='blue' width={"100%"} style={{marginTop:15}} onClick={submitHandler}>
        Login
        </Button>
        <Button
        variant={"solid"}
        colorScheme='red'
        width={"100%"}
        onClick={()=>{
            setEmail("guestEamilkfjkdsj")
            setPassword("1234")
        }}
        >
Get Guest User Credinials
        </Button>
        </VStack>
  )
}

export default SignUp