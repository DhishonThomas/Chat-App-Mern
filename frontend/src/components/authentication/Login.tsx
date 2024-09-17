import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
//   const { setUser } = ChatState();

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
    
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const { data } = await axios.post(
            "/api/user/login",
            { email, password },
            config
          );
    
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        //   setUser(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          navigate("/chats");
        } catch (error:any) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
      };



  return (
<VStack spacing={'5px'}>
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

<Button colorScheme='blue' width={"100%"} style={{marginTop:15}} isLoading={loading} onClick={submitHandler}>
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

export default Login


