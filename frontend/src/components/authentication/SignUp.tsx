import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useToast } from '@chakra-ui/react' 
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

interface picState{
    pic:null|string|undefined
}

const SignUp = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("");
    const [pic,setPic]=useState<string|null|undefined>(null)
    const [show,setShow]=useState(false)
    const [picLoading, setPicLoading] = useState(false);
    const imageRef=useRef<HTMLInputElement>(null)

const navigate=useNavigate()

const toast=useToast()

    const handleClick=()=>{
setShow(!show)
    }
 

    const postDetails =async () => {
        const imageFile: any = imageRef.current?.files
        ? imageRef.current?.files[0]
        : null;
        console.log(imageFile)
        setPicLoading(true);
        if (imageFile === undefined) {
          toast({
            title: "Please Select an Image!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
        console.log(pic);
       
try {
    if (imageFile.type === "image/jpeg" || imageFile.type === "image/png") {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "chat-app");
        const responseData = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
            method: "POST",
            body: formData,
          });
  console.log(responseData)
          const data = await responseData.json();
      if(data){
        setPic(data.url);
        console.log(data.url);
        setPicLoading(false);
      } 
}else {
    toast({
      title: "Please Select an Image!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setPicLoading(false);
    return;
  }
} catch (error) {
    console.log(error);
    setPicLoading(false);
           
        } 
      };

    //   const handleImage = (e: any) => {
    //     const file = e.target.files[0];
    //     console.log(file)
    //     setPic(URL.createObjectURL(file));
    //     postDetails()
    //   };

  
    const submitHandler = async () => {
        setPicLoading(true);
        if (!name || !email || !password || !confirmPassword) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          toast({
            title: "Passwords Do Not Match",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }

        console.log(name, email, password, pic);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}api/user`,
            {
              name,
              email,
              password,
              pic,
            },
            config
          );

          console.log("data",data);
          toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          setPicLoading(false);
          navigate("/chats")
                } catch (error:any) {
          toast({
            title: "Error Occured!",
            description: error?.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
        }
      };

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

    <FormControl id='confirmPassword'>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
        <Input placeholder='Confirm Your Password' type={show?"text":"password"}  onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <InputRightElement width={"4.5rem"}>
        <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
        {show?"Hide":"Show"}
        </Button>
        </InputRightElement>
        </InputGroup>

    </FormControl>

    <FormControl id='pic'>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input type='file' p={1.5} accept='image/*' ref={imageRef} onChange={postDetails}/>
    </FormControl>

    <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>

    </VStack>
  )
}

export default SignUp